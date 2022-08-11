import { Study } from 'types/Study'
import { BaseListProps } from 'partials/List/List.types'

export interface StudyListProps extends BaseListProps {
	studies: Study[]
}
