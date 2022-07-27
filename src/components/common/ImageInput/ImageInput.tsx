import { PencilAltIcon } from '@heroicons/react/solid'
import cn from 'classnames'
import { useState } from 'react'
import { Field } from 'react-final-form'
import { OnChange } from 'react-final-form-listeners'
import { useText } from 'hooks/useText'
import { Dropzone } from 'common/Dropzone'
import { InputError } from 'common/InputError'
// import { Dropzone } from './Dropzone'
import { ImageInputProps, ImagePreview } from './ImageInput.types'

const getImagePreview = (imageFile: ImagePreview | string | undefined, placeholder: string) =>
	typeof imageFile === 'string'
		? imageFile.length > 0
			? imageFile
			: placeholder
		: imageFile?.preview || placeholder

export const ImageInput = ({
	className,
	dropzoneClassName,
	editIconClassName,
	errorClassName,
	onClick,
	testId = 'ImageInput',
	name,
	onChange,
	placeholder = '/images/image_placeholder.jpg'
}: ImageInputProps) => {
	const [dropzoneErrors, setDropzoneErrors] = useState<string[]>([])
	const [imageFile, setImageFile] = useState<ImagePreview | string | undefined>(placeholder)
	const { t } = useText('common.errors')

	const imagePreview = getImagePreview(imageFile, placeholder)

	return (
		<>
			<Field name={name}>
				{({ input, meta }) => {
					const isError = (meta.error && meta.touched) || dropzoneErrors.length > 0
					const handleChange = (file: File | File[] | Error) => {
						if (file instanceof Error) {
							setDropzoneErrors([t(file.message, '5mb')])
						} else {
							setDropzoneErrors([])
							input.onChange?.(file)
						}
					}

					return (
						<div className={cn('flex flex-col relative', className)}>
							<Dropzone
								className={cn(isError && 'border-red-500 border-none', dropzoneClassName)}
								onClick={onClick}
								testId={testId}
								{...input}
								placeholder={placeholder}
								editIconClassName={editIconClassName}
								onChange={handleChange}
								// imageDropzone
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
							{isError && <InputError errors={[...dropzoneErrors, meta.error]} />}

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
