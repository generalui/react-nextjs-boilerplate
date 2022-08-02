import { CommonProps } from 'types/CommonProps'
import { InputProps } from 'common/Input/Input.types'
import { imageInputVariants } from './variants'

export interface ImageInputProps extends InputProps {
	initialValue?: string
	dropzoneClassName?: string
	editIconClassName?: string
	errorClassName?: string
	v?: keyof typeof imageInputVariants
}

export type ImagePreview = File & {
	preview: string
}
export interface DropZoneProps extends CommonProps {
	onChange?: (file: File | Error) => void
	value?: string
	placeholder?: string
	editIconClassName?: string
}
