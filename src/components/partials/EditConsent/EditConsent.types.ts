import { CommonProps } from 'types/CommonProps'
import { ConsentInput, ConsentPickDataTypes } from 'types/Consent'

export default interface EditConsentProps extends CommonProps {
	modalName: string
	consent?: ConsentPickDataTypes
	onSubmit: (values: ConsentInput) => void
}
