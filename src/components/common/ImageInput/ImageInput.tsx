import { Field } from 'react-final-form'
import { OnChange } from 'react-final-form-listeners'
import { Dropzone } from './Dropzone'
import { ImageInputProps } from './ImageInput.types'

export const ImageInput = ({
	className,
	onClick,
	testId = 'ImageInput',
	name,
	onChange
}: ImageInputProps) => {
	return (
		<>
			<Field name={name}>
				{({ input }) => (
					<Dropzone className={className} onClick={onClick} testId={testId} {...input} />
				)}
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
