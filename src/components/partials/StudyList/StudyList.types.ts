import { Study } from 'types/Study'
import { SharedListProps } from 'partials/List/List.types'

export interface StudyListProps extends SharedListProps {
	studies: Study[]
}
