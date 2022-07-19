import { CommonProps } from 'types/CommonProps'

export interface DocumentsInputProps extends CommonProps {
	name: string
	label?: string
	labelClassName?: string
	errorClassName?: string
	showAcceptedFileTypes?: boolean
	onChange?: (files: File[] | Error) => void
}

export type DocumentPreview = {
	type: string
	name: string
	preview?: string
}
