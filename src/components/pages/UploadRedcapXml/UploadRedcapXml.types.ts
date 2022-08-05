import { CommonProps } from 'types/CommonProps'

export interface UploadRedcapXmlProps extends CommonProps {
	onChange?: (files: File[] | Error) => void
}
