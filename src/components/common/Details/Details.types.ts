import { CommonProps } from 'types/CommonProps'

export interface DetailsProps extends CommonProps {
	details: DetailProps[]
}

export interface DetailProps extends CommonProps {
	title: string
	value: string
}
