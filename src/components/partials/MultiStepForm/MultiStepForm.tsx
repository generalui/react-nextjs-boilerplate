import { useEffect, useState } from 'react'
import { useModal } from 'hooks/useModal'
import { useRouter } from 'hooks/useRouter'
import { Card } from 'common/Card'
import { MultiStepFormProps } from './MultiStepForm.types'

export const MultiStepForm = ({
	name,
	title,
	header,
	className,
	steps,
	children,
	currentStep,
	onCancel,
	inProgress = false,
	testId = 'MultiStepForm'
}: MultiStepFormProps) => {
	const { events, asPath } = useRouter()

	useEffect(
		function preventPageNavigation() {
			const confirmationMessage = 'Changes you made may not be saved.'
			const beforeUnloadHandler = (e: BeforeUnloadEvent) => {
				;(e || window.event).returnValue = confirmationMessage
				return confirmationMessage // Gecko + Webkit, Safari, Chrome etc.
			}
			const beforeRouteHandler = (url: string) => {
				if (asPath !== url && !confirm(confirmationMessage)) {
					// to inform NProgress or something ...
					events.emit('routeChangeError')
					// tslint:disable-next-line: no-string-throw
					throw `Route change to "${url}" was aborted (this error can be safely ignored). See https://github.com/zeit/next.js/issues/2476.`
				}
			}
			if (inProgress) {
				window.addEventListener('beforeunload', beforeUnloadHandler)
				events.on('routeChangeStart', beforeRouteHandler)
			} else {
				window.removeEventListener('beforeunload', beforeUnloadHandler)
				events.off('routeChangeStart', beforeRouteHandler)
			}
			return () => {
				window.removeEventListener('beforeunload', beforeUnloadHandler)
				events.off('routeChangeStart', beforeRouteHandler)
			}
		},
		[inProgress, events, asPath]
	)

	// prompt the user if they try and leave with unsaved changes
	// useEffect(() => {
	// const warningText = 'You have unsaved changes - are you sure you wish to leave this page?'
	// const handleWindowClose = (e: BeforeUnloadEvent) => {
	// 	e.preventDefault()
	// 	return (e.returnValue = warningText)
	// }

	// 	const handleBrowseAway = () => {
	// 		if (window.confirm(warningText)) return
	// 		events.emit('routeChangeError')
	// 		throw 'routeChange aborted.'
	// 	}

	// 	// window.addEventListener('beforeunload', handleWindowClose)
	// 	events.on('routeChangeStart', () => {
	// 		if (!mounted) {
	// 			return
	// 		}
	// 		handleBrowseAway()
	// 	})
	// 	return () => {
	// 		// window.removeEventListener('beforeunload', handleWindowClose)
	// 		events.off('routeChangeStart', () => {
	// 			if (!mounted) {
	// 				return
	// 			}
	// 			handleBrowseAway()
	// 		})
	// 	}
	// }, [events, mounted])

	return (
		<>
			<div className={className} data-testid={testId}>
				<Card className='flex flex-col gap-4'>
					{title && <h2 className={'font-semibold text-2xl flex gap-2 items-center'}>{title}</h2>}

					{header}

					{typeof currentStep === 'number' && steps[currentStep]}

					{children}
				</Card>
			</div>
		</>
	)
}
