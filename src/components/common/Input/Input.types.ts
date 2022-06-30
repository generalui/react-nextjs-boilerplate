import { ChangeEvent } from 'react'
import { CommonProps } from 'types/CommonProps'
import { OnChangeValue } from 'types/index'

export interface InputProps extends CommonProps {
	onChange?: (value: OnChangeValue, previousValue: OnChangeValue) => void
	type?: string
	placeholder?: string
	name: string
	rows?: number
}

export interface InputPropsV1 extends CommonProps {
	value?: string | number | readonly string[] | undefined
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void
	type?: string
	placeholder?: string
}
