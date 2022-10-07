import { CommonProps } from 'types/CommonProps'
import { ConsentPickDataTypes } from 'types/Consent'

export default interface EditConsentProps extends CommonProps {
	modalName: string
	consent?: ConsentPickDataTypes
}
