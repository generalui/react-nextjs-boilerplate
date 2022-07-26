import cn from 'classnames'
import { useState } from 'react'
import { Field } from 'react-final-form'
import { OnChange } from 'react-final-form-listeners'
import { useText } from 'hooks/useText'
import { InputError } from 'common/InputError'
import { Dropzone } from './Dropzone'
import { ImageInputProps } from './ImageInput.types'

export const ImageInput = ({
	className,
	dropzoneClassName,
	editIconClassName,
	onClick,
	testId = 'ImageInput',
	name,
	onChange,
	placeholder
}: ImageInputProps) => {
	const [dropzoneErrors, setDropzoneErrors] = useState<string[]>([])
	const { t } = useText('common.errors')

	return (
		<>
			<Field name={name}>
				{({ input, meta }) => {
					const isError = (meta.error && meta.touched) || dropzoneErrors.length > 0
					const handleChange = (file: File | Error) => {
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
								className={cn(isError && 'border-red-500', dropzoneClassName)}
								onClick={onClick}
								testId={testId}
								{...input}
								placeholder={placeholder}
								editIconClassName={editIconClassName}
								onChange={handleChange}
							/>
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
