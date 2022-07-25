import { CommonProps } from 'types/CommonProps'
import { Study } from 'types/Study'

export interface AddPrivateDataProps extends CommonProps {
	modalName: string
	studyId: string
	dataTypes?: Study['dataTypes']
}
