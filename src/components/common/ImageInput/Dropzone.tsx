import { PencilAltIcon } from '@heroicons/react/solid'
import cn from 'classnames'
import { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { getBase64 } from 'utils/files'
import { DropZoneProps, ImagePreview } from 'common/ImageInput/ImageInput.types'

export const Dropzone = ({ onChange, className, testId, value }: DropZoneProps) => {
	const [imageFile, setImageFile] = useState<ImagePreview | string | undefined>(value)

	const imagePreview =
		typeof imageFile === 'string'
			? imageFile
			: imageFile?.preview || '/images/image_placeholder.jpg'

	const { getRootProps, getInputProps } = useDropzone({
		maxSize: 5 * 1000000, // 5 MB file limit
		maxFiles: 1, // 1 file limit
		accept: { 'image/png': ['.jpeg', '.jpg', '.png', '.gif'] }, // Accept only images
		onDrop: async (acceptedFiles: File[]) => {
			const file: ImagePreview = {
				...acceptedFiles[0],
				preview: URL.createObjectURL(acceptedFiles[0])
			}

			setImageFile(file)
			onChange?.(await getBase64(acceptedFiles[0]))
		}
	})

	useEffect(
		() => () => {
			// Make sure to revoke the data uris to avoid memory leaks
			if (imagePreview) URL.revokeObjectURL(imagePreview)
		},
		[imagePreview]
	)

	return (
		<div
			{...getRootProps({
				className: cn(
					'dropzone relative rounded-lg border border-gray-400 focus:border-2 focus:border-blue-600 focus:outline-2 focus:outline-offset-2 focus:outline-gray-400 overflow-hidden flex items-center justify-center',
					className
				)
			})}
			data-testid={testId}
			tabIndex={0}
			role='button'
		>
			<img src={imagePreview} alt='PCR' />
			<input {...getInputProps()} />
			<PencilAltIcon className='h-5 w-5 absolute bottom-3.5 right-3.5' />
		</div>
	)
}
