import { CommonProps } from 'types/CommonProps'
import { InputProps } from 'common/Input/Input.types'

export interface ImageInputProps extends InputProps {
	value?: string
}

export type ImagePreview = File & {
	preview: string
}
export interface DropZoneProps extends CommonProps {
	onChange?: (file: File | Error) => void
	value?: string
}
