import { CommonProps } from 'types/CommonProps'
import { Study } from 'types/Study'

export interface StudyDocumentationProps extends CommonProps {
	singleStudyId: string
	study: Study | undefined
	loading: boolean
}
