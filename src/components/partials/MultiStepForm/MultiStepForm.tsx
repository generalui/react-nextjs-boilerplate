import cn from 'classnames'
import { useEffect } from 'react'
import { useRouter } from 'hooks/useRouter'
import { Card } from 'common/Card'
import { MultiStepFormProps } from './MultiStepForm.types'

export const MultiStepForm = ({
	title,
	header,
	className,
	steps,
	children,
	currentStep,
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

	return (
		<Card className={cn('flex flex-col gap-6', className)} testId={testId}>
			{title && <h2 className={'font-semibold text-2xl flex gap-2 items-center'}>{title}</h2>}

			{header}

			{typeof currentStep === 'number' && steps[currentStep]}

			{children}
		</Card>
	)
}
