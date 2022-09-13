import { Accept } from 'react-dropzone'
import { CommonProps } from 'types/CommonProps'
import { IconProps } from 'common/Icon/Icon.types'

export interface DocumentsInputProps extends CommonProps {
	name: string
	label?: string
	labelClassName?: string
	errorClassName?: string
	showAcceptedFileTypes?: boolean
	acceptedFileTypes?: Accept
	maxFiles?: number
	onChange?: (files: File[] | Error) => void
	image?: DocumentsInputImage | DocumentsInputIcon
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

export type DocumentsInputIcon = { icon: IconProps['icon']; size: IconProps['size'] }
