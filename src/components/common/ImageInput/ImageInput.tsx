import { PencilAltIcon } from '@heroicons/react/solid'
import cn from 'classnames'
import { useEffect, useState } from 'react'
import { Field } from 'react-final-form'
import { OnChange } from 'react-final-form-listeners'
import { Dropzone } from 'common/Dropzone'
import { InputError } from 'common/InputError'
import { ImageInputProps, ImagePreview } from './ImageInput.types'

const acceptedFiles = { 'image/png': ['.jpeg', '.jpg', '.png', '.gif'] }

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
	placeholder = '/images/image_placeholder.jpg'
}: ImageInputProps) => {
	const [dropzoneErrors, setDropzoneErrors] = useState<string[]>([])
	const [imageFile, setImageFile] = useState<ImagePreview | string | undefined>(placeholder)
	const [imagePreview, setImagePreview] = useState<string>(placeholder)

	useEffect(() => {
		setImagePreview(getImagePreview(imageFile, placeholder))
		console.log('useEffect')
	}, [imageFile, placeholder])

	const handleChange = (acceptedFile: ImagePreview | File[] | Error) => {
		if ('preview' in acceptedFile) {
			setImageFile(acceptedFile)
		}
	}

	return (
		<>
			<Field name={name}>
				{({ input, meta }) => {
					const isError = (meta.error && meta.touched) || dropzoneErrors.length > 0
					// const handleChange = (file: File | File[] | Error) => {
					// 	if (file instanceof Error) {
					// 		setDropzoneErrors([t(file.message, '5mb')])
					// 	} else {
					// 		setDropzoneErrors([])
					// 		input.onChange?.(file)
					// 	}
					// }

					return (
						<div className={cn('flex flex-col relative', className)}>
							<Dropzone
								className={cn(isError && 'border-red-500 border-none', dropzoneClassName)}
								onClick={onClick}
								accept={acceptedFiles}
								testId={testId}
								{...input}
								placeholder={placeholder}
								editIconClassName={editIconClassName}
								onChange={(file: File[] | ImagePreview | Error) => {
									setDropzoneErrors([])
									if ('preview' in file) handleChange(file)
								}}
								imageDropzone
							>
								<div className='dropzone relative rounded-lg border border-gray-400 focus:border-2 focus:border-blue-600 focus:outline-2  focus:outline-gray-400 overflow-hidden flex flex-col items-center grow-0 w-full h-full h-40 w-40 lg:h-[198px] lg:w-[198px]'>
									<div
										style={{ backgroundImage: `url(${imagePreview})` }}
										className='block w-full h-full bg-cover bg-center'
									/>
									<PencilAltIcon
										className={cn('h-5 w-5 absolute bottom-3.5 right-3.5', editIconClassName)}
									/>
								</div>
							</Dropzone>

							{/* {isError && (
								<div
									className={cn(
										'flex flex-col gap-2 mt-5 absolute bottom-[-1.5rem] left-0',
										errorClassName
									)}
								>
									{dropzoneErrors.length > 0 &&
										dropzoneErrors.map((error) => (
											<span key={error} className='text-xs text-red-500'>
												{'*'} {error}
											</span>
										))}
									{meta.error && (
										<span className='text-xs text-red-500'>
											{'*'} {meta.error}
										</span>
									)}
								</div>
							)} */}
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
