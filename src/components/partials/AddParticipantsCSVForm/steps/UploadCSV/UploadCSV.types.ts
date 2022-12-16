import { UploadCSVInput } from 'types/index'
import { BaseFormProps } from 'partials/Form/Form.types'

export interface UploadCSVProps extends BaseFormProps<UploadCSVInput> {
	removeStepsText?: boolean
}
