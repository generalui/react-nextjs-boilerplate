import { Consent } from '@prisma/client'
import { CommonProps } from 'types/CommonProps'
import { Study } from 'types/Study'

export interface DataTypeContainerProps extends CommonProps {
	study?: Study
	consent?: Partial<Consent>
}
