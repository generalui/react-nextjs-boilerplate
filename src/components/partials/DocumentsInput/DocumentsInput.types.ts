import { CommonProps } from 'types/CommonProps'

export interface DocumentsInputProps extends CommonProps {
	name: string
	errorClassName?: string
	onChange?: (file: File | Error) => void
}

export type DocumentPreview = File & {
	preview: string
}
