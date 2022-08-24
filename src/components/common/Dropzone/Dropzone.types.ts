import { ReactNode } from 'react'
import { Accept } from 'react-dropzone'
import { CommonProps } from 'types/CommonProps'
import { ImagePreview } from 'common/ImageInput/ImageInput.types'

export interface DropzoneProps extends CommonProps {
	accept?: Accept
	children: ReactNode | ((cachedFiles: File[] | ImagePreview | undefined) => void)
	maxFiles?: number
	onChange: (file: File[] | Error, imagePreview?: ImagePreview) => void
	onError: (error: Error) => void
	placeholder?: string
	value?: string
}
