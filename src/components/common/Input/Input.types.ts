import { ChangeEvent } from 'react'
import { CommonProps } from 'types/CommonProps'

export interface InputProps extends CommonProps {
	value?: string | number | readonly string[] | undefined
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void
	type?: string
	placeholder?: string
}
