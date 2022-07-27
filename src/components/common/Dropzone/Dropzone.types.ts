import { ReactNode } from 'react'
import { Accept, DropEvent, FileRejection } from 'react-dropzone'
import { CommonProps } from 'types/CommonProps'
import { ImagePreview } from 'common/ImageInput/ImageInput.types'

export interface DropzoneProps extends CommonProps {
	onChange?: (file: File[] | File | Error) => void
	onError?: (error: Error) => void
	value?: string
	placeholder?: string
	editIconClassName?: string
	maxFiles?: number
	accept?: Accept
	multi?: boolean
	onDrop?: <T extends File>(
		acceptedFiles: T[],
		fileRejections: FileRejection[],
		event: DropEvent
	) => void
	imageDropzone?: true
	children: ReactNode | ((cachedFiles: File[] | ImagePreview | undefined) => void)
}
