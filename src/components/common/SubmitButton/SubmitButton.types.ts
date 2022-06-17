import { ReactNode } from 'react'
import { ButtonProps } from 'common/Button/Button.types'

export interface SubmitButtonProps extends ButtonProps {
	isError?: boolean
	isLoading?: boolean
	isSuccess?: boolean
	disableOnLoading?: boolean
	loadingLabel?: ReactNode
	successLabel?: ReactNode
	errorLabel?: ReactNode
}
