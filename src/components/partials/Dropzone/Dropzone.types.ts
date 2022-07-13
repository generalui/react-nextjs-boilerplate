import { Accept, DropEvent, FileRejection } from 'react-dropzone'
import { CommonProps } from 'types/CommonProps'

export interface DropzoneProps extends CommonProps {
	onChange?: (file: File | Error) => void
	value?: string
	placeholder?: string
	editIconClassName?: string
	maxFiles?: number
	accept: Accept
	onDrop?: <T extends File>(
		acceptedFiles: T[],
		fileRejections: FileRejection[],
		event: DropEvent
	) => void
}
