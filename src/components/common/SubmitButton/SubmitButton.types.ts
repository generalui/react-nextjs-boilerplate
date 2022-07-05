import { ReactNode } from 'react'
import { ButtonProps } from 'common/Button/Button.types'

export interface SubmitButtonProps extends ButtonProps {
	isLoading?: boolean
	isSuccess?: boolean
	disableOnLoading?: boolean
	loadingLabel?: ReactNode
	successLabel?: ReactNode
}
