import { CommonProps } from 'types/CommonProps'
import { DocumentPreview } from 'partials/DocumentsInput/DocumentsInput.types'

export interface DocumentGridProps extends CommonProps {
	documents: DocumentPreview[]
}
