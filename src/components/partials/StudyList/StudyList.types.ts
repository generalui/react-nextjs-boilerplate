import { CommonProps } from 'types/CommonProps'
import { Study } from 'types/Study'

export interface StudyListProps extends CommonProps {
	studies: Study[]
	isLoading?: boolean
	concise?: boolean
}
