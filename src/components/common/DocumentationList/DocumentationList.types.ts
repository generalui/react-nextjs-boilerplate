import { Document } from '@prisma/client'
import { CommonProps } from 'types/CommonProps'

export interface DocumentationListProps extends CommonProps {
	documents: Document[]
}
