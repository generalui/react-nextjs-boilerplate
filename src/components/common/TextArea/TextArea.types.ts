import { ChangeEventHandler } from 'react'
import { CommonProps } from 'types/CommonProps'

export interface TextAreaProps extends CommonProps {
	rows?: number
	placeholder?: string
	name?: string
	value?: string | number | readonly string[] | undefined
	error?: boolean
	onChange?: ChangeEventHandler<HTMLTextAreaElement> | undefined
}
