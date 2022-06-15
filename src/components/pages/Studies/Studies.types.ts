import { Study, User } from '@prisma/client'
import { CommonProps } from 'types/CommonProps'

export interface StudiesProps extends CommonProps {
	studies: (Study & { coordinator: User })[]
}
