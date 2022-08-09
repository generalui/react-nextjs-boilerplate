import { Accept } from 'react-dropzone'
import { CommonProps } from 'types/CommonProps'

export interface DocumentsInputProps extends CommonProps {
	name: string
	label?: string
	labelClassName?: string
	errorClassName?: string
	showAcceptedFileTypes?: boolean
	acceptedFiles?: Accept
	maxFiles?: number
	onChange?: (files: File[] | Error) => void
	image?: DocumentsInputImage
	filesSelectLabel?: string
	filesDragLabel?: string
	localizationScope?: string
}

export type DocumentPreview = {
	type: string
	name: string
	preview?: string
}

export type DocumentsInputImage = { src: string; width: string; height: string }
