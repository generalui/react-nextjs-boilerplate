import { PencilAltIcon } from '@heroicons/react/solid'
import cn from 'classnames'
import { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { DropZoneProps, ImagePreview } from 'common/ImageInput/ImageInput.types'

const MAX_FILE_SIZE = 5 * 1000000 // 5 mb

const getImagePreview = (imageFile: ImagePreview | string | undefined) =>
	typeof imageFile === 'string'
		? imageFile.length > 0
			? imageFile
			: '/images/image_placeholder.jpg'
		: imageFile?.preview || '/images/image_placeholder.jpg'

export const Dropzone = ({ onChange, className, testId, value }: DropZoneProps) => {
	const [imageFile, setImageFile] = useState<ImagePreview | string | undefined>(value)

	const imagePreview = getImagePreview(imageFile)

	const { getRootProps, getInputProps } = useDropzone({
		maxFiles: 1, // 1 file limit
		accept: { 'image/png': ['.jpeg', '.jpg', '.png', '.gif'] }, // Accept only images
		onDrop: async (acceptedFiles: File[]) => {
			if (!acceptedFiles || !acceptedFiles.length) return

			const file = acceptedFiles[0]

			if (file.size > MAX_FILE_SIZE) {
				onChange?.(new Error('maxFileSizeExceeded'))
			} else {
				const imageFile: ImagePreview = {
					...file,
					preview: URL.createObjectURL(file)
				}

				setImageFile(imageFile)
				onChange?.(file)
			}
		}
	})

	useEffect(
		() => () => {
			// Make sure to revoke the data uris to avoid memory leaks
			if (typeof imageFile === 'object' && imageFile.preview) {
				URL.revokeObjectURL(imageFile.preview)
			}
		},
		[imageFile]
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
			<img src={imagePreview} alt='PCR' className='w-full h-auto' />
			<input {...getInputProps()} />
			<PencilAltIcon className='h-5 w-5 absolute bottom-3.5 right-3.5' />
		</div>
	)
}
