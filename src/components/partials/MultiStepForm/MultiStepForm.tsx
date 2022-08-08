import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { MultiStepFormProps } from './MultiStepForm.types'

export const MultiStepForm = ({
	className,
	components,
	testId = 'MultiStepForm'
}: MultiStepFormProps) => {
	const [step, setStep] = useState(-1)
	const { query } = useRouter()

	useEffect(() => {
		const currentStep = typeof query.step === 'string' ? parseInt(query.step) - 1 : -1
		setStep(currentStep)
	}, [query])

	console.log('components: ', components)
	return (
		<div className={className} data-testid={testId}>
			{components[step]}
		</div>
	)
}
