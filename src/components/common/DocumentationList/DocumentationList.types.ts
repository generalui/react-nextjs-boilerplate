import { Document } from '@prisma/client'
import { SharedListProps } from 'partials/List/List.types'

export interface DocumentationListProps extends SharedListProps {
	documents: Document[]
}
