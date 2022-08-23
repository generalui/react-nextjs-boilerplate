import { ReactNode } from 'react'
import { Accept, DropEvent, FileRejection } from 'react-dropzone'
import { CommonProps } from 'types/CommonProps'
import { ImagePreview } from 'common/ImageInput/ImageInput.types'

export interface DropzoneProps extends CommonProps {
	accept?: Accept
	children: ReactNode | ((cachedFiles: File[] | ImagePreview | undefined) => void)
	editIconClassName?: string
	imageDropzone?: true
	maxFiles?: number
	multi?: boolean
	onChange?: (file: File[] | Error, imagePreview?: ImagePreview) => void
	onDrop?: <T extends File>(
		acceptedFiles: T[],
		fileRejections: FileRejection[],
		event: DropEvent
	) => void
	onError?: (error: Error) => void
	placeholder?: string
	value?: string
}
