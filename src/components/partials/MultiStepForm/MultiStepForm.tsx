import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { MultiStepFormProps } from './MultiStepForm.types'

export const MultiStepForm = ({
	className,
	stepComponents,
	testId = 'MultiStepForm'
}: MultiStepFormProps) => {
	const [step, setStep] = useState<number | undefined>(undefined)
	const { query } = useRouter()

	useEffect(() => {
		const currentStep = typeof query.step === 'string' ? parseInt(query.step) - 1 : undefined
		setStep(currentStep)
	}, [query])

	return (
		<div className={className} data-testid={testId}>
			{typeof step === 'number' && stepComponents[step]}
		</div>
	)
}
