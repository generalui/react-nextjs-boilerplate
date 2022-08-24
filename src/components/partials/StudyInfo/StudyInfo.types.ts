import { CommonProps } from 'types/CommonProps'
import { Study } from 'types/Study'

export interface StudyInfoProps extends CommonProps {
	isAdmin: boolean
	singleStudyId: string
	loading: boolean
	study: Study | undefined
}
