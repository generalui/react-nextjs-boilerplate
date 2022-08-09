import { CommonProps } from 'types/CommonProps'

export interface UploadRedcapXmlProps extends CommonProps {
	submitFile: (file: File) => void
}
