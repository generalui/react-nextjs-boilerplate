import { Document } from '@prisma/client'
import { BaseListProps } from 'partials/List/List.types'

export interface DocumentationListProps extends BaseListProps {
	documents: Document[]
}
