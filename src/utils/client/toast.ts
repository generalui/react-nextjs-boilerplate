import { ToastContent, toast as toastify } from 'react-toastify'

type ToastSeverity = 'success' | 'info' | 'error' | 'warning'

const autoCloseTime = 5000

export const toast = (content: ToastContent, severity: ToastSeverity = 'success') => {
	toastify[severity](content, { autoClose: autoCloseTime, position: toastify.POSITION.TOP_RIGHT })
}

export const dispatchErrorToast = (message: string) => {
	const errorMessage = message || 'An unknown error has occurred, please try again'

	toast(errorMessage, 'error')
}
