import { CommonProps } from 'types/CommonProps'
import { InputProps } from 'common/Input/Input.types'

export interface ImageInputProps extends InputProps {
	value?: string
	dropzoneClassName?: string
	editIconClassName?: string
	errorClassName?: string
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
