import cn from 'classnames'
import { useState } from 'react'
import { Field } from 'react-final-form'
import { OnChange } from 'react-final-form-listeners'
import { useText } from 'hooks/useText'
import { Dropzone } from './Dropzone'
import { ImageInputProps } from './ImageInput.types'

export const ImageInput = ({
	className,
	onClick,
	testId = 'ImageInput',
	name,
	onChange
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
						<div className={cn('flex flex-col', className)}>
							<Dropzone
								className={cn(isError && 'border-red-500')}
								onClick={onClick}
								testId={testId}
								{...input}
								onChange={handleChange}
							/>
							{isError && (
								<div className='flex flex-col gap-2 mt-2'>
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
