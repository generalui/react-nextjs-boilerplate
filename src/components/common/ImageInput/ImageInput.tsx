import { PencilAltIcon } from '@heroicons/react/solid'
import cn from 'classnames'
import { useEffect, useRef, useState } from 'react'
import { Field, FieldInputProps } from 'react-final-form'
import { OnChange } from 'react-final-form-listeners'
import { Dropzone } from 'common/Dropzone'
import { InputError } from 'common/InputError'
import { ImageInputProps, ImagePreview } from './ImageInput.types'

const acceptedFileTypes = { 'image/png': ['.jpeg', '.jpg', '.png', '.gif'] }

const getImagePreview = (imageFile: ImagePreview | string | undefined, placeholder: string) => {
	return typeof imageFile === 'string'
		? imageFile.length > 0
			? imageFile
			: placeholder
		: imageFile?.preview || placeholder
}
export const ImageInput = ({
	className,
	dropzoneClassName,
	editIconClassName,
	onClick,
	testId = 'ImageInput',
	name,
	onChange,
	initialValue,
	placeholder = '/images/image_placeholder.jpg'
}: ImageInputProps) => {
	const [dropzoneErrors, setDropzoneErrors] = useState<string[]>([])
	const [imageFile, setImageFile] = useState<ImagePreview | string | undefined>(initialValue)
	const [imagePreview, setImagePreview] = useState<string>(placeholder)
	const inputRef = useRef<FieldInputProps<File, HTMLElement>>()

	useEffect(() => {
		setImagePreview(getImagePreview(imageFile, placeholder))
	}, [imageFile, placeholder])

	const handleChange = (acceptedFiles: File[] | Error, imagePreview: ImagePreview) => {
		if ('preview' in imagePreview && Array.isArray(acceptedFiles)) {
			setImageFile(imagePreview)
			inputRef.current?.onChange(acceptedFiles[0])
		}
	}

	return (
		<>
			<Field name={name}>
				{({ input, meta }) => {
					inputRef.current = input
					const isError = (meta.error && meta.touched) || dropzoneErrors.length > 0

					return (
						<div className={cn('flex flex-col relative', className)}>
							<Dropzone
								className={cn(isError && 'border-red-500 border-none', dropzoneClassName)}
								onClick={onClick}
								accept={acceptedFileTypes}
								testId={testId}
								{...input}
								placeholder={placeholder}
								editIconClassName={editIconClassName}
								onChange={(file: File[] | Error, imagePreview?: ImagePreview) => {
									setDropzoneErrors([])
									if (imagePreview && Array.isArray(file)) {
										handleChange(file, imagePreview)
									}
								}}
								imageDropzone
							>
								<div className='relative rounded-lg border border-gray-400 focus:border-2 focus:border-blue-600 focus:outline-2  focus:outline-gray-400 overflow-hidden flex flex-col items-center grow-0 w-full h-full h-40 w-40 lg:h-[200px] lg:w-[200px]'>
									<div
										style={{ backgroundImage: `url(${imagePreview})` }}
										className='block w-full h-full bg-cover bg-center'
									/>
									<PencilAltIcon
										className={cn('h-5 w-5 absolute bottom-3.5 right-3.5', editIconClassName)}
									/>
								</div>
							</Dropzone>

							{isError && (
								<InputError
									className='mt-5 absolute bottom-[-1.5rem] left-0'
									errors={[...dropzoneErrors, meta.error]}
								/>
							)}
						</div>
					)
				}}
			</Field>
			{onChange && (
				<OnChange name={name}>
					{(newValue, previous) => {
						onChange(newValue, previous)
					}}
				</OnChange>
			)}
		</>
	)
}
