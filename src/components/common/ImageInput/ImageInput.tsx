import { PencilAltIcon } from '@heroicons/react/solid'
import cn from 'classnames'
import { KeyboardEventHandler, useCallback, useEffect, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Field } from 'react-final-form'
import { OnChange } from 'react-final-form-listeners'
import { CommonProps } from 'types/CommonProps'
import { ImageInputProps } from './ImageInput.types'

const getBase64 = async (file: Blob): Promise<string | undefined> => {
	const reader = new FileReader()
	reader.readAsDataURL(file as Blob)

	return new Promise((reslove, reject) => {
		reader.onload = () => reslove(reader.result as string)
		reader.onerror = (error) => reject(error)
	})
}

interface DropZoneProps extends CommonProps {
	onChange?: (file: string) => void
}
const Dropzone = ({ onChange, className, testId }: DropZoneProps) => {
	const [imageFile, setImageFile] = useState<any>()

	const { getRootProps, getInputProps } = useDropzone({
		maxSize: 5 * 1000000, // 5 MB file limit
		maxFiles: 1, // 1 file limit
		accept: { 'image/png': ['.jpeg', '.jpg', '.png', '.gif'] }, // Accept only images
		onDrop: async (acceptedFiles) => {
			const file: any = {
				...acceptedFiles[0],
				preview: URL.createObjectURL(acceptedFiles[0])
			}
			console.log('~ acceptedFiles[0]', acceptedFiles[0])

			setImageFile(file)
			onChange?.(await getBase64(acceptedFiles[0]))
		}
	})

	useEffect(
		() => () => {
			// Make sure to revoke the data uris to avoid memory leaks
			URL.revokeObjectURL(imageFile?.preview)
		},
		[imageFile]
	)

	return (
		<div
			{...getRootProps({
				className: cn(
					'row-span-3 dropzone relative rounded-lg border border-gray-400 focus:border-2 focus:border-blue-600 focus:outline-2 focus:outline-offset-2 focus:outline-gray-400 overflow-hidden',
					className
				)
			})}
			data-testid={testId}
			tabIndex={0}
			role='button'
		>
			<img src={imageFile?.preview || '/images/image_placeholder.jpg'} alt='PCR' />
			<input {...getInputProps()} />
			<PencilAltIcon className='h-5 w-5 absolute bottom-3.5 right-3.5' />
		</div>
	)
}

export const ImageInput = ({
	className,
	onClick,
	testId = 'ImageInput',
	name,
	onChange
}: ImageInputProps) => {
	// const imageInput = useRef<HTMLInputElement>()
	// const [imageFile, setImageFile] = useState<any>()

	// const onDrop = useCallback((acceptedFiles) => {
	// 	setImageFile({
	// 		...acceptedFiles[0],
	// 		preview: URL.createObjectURL(acceptedFiles[0])
	// 	})
	// }, [])

	// const { getRootProps, getInputProps } = useDropzone({
	// 	onDrop,
	// 	maxSize: 5 * 1000000, // 5 MB file limit
	// 	maxFiles: 1, // 1 file limit
	// 	accept: { 'image/png': ['.jpeg', '.jpg', '.png', '.gif'] } // Accept only images
	// })
	// const handleOnClickImage = () => {
	// 	imageInput.current?.click()
	// 	onClick?.()
	// }

	// const handleKeyPress: KeyboardEventHandler<HTMLDivElement> = (e) => {
	// 	if (e.key === 'Enter') {
	// 		handleOnClickImage()
	// 	}
	// }

	return (
		<>
			<Field name={name}>
				{({ input }) => (
					<Dropzone className={className} onClick={onClick} testId={testId} {...input} />
				)}
			</Field>
			{onChange && (
				<OnChange name={name}>
					{(value, previous) => {
						console.log('~ OnChange value', value)
						onChange(value, previous)
					}}
				</OnChange>
			)}
		</>
	)
}
