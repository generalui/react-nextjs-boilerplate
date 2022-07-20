import { StudyDataTypes } from '@prisma/client'
import { CommonProps } from 'types/CommonProps'

export interface DataVaultListProps extends CommonProps {
	data: {
		dataType: StudyDataTypes
		files: number
		modified: Date
	}[]
	isLoading: boolean
}
