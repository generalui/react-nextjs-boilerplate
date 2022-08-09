import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { MultiStepFormProps } from './MultiStepForm.types'

type MultiStepFormType = <T>(props: MultiStepFormProps<T>) => JSX.Element

export const MultiStepForm: MultiStepFormType = ({
	className,
	stepComponents,
	results,
	testId = 'MultiStepForm'
}) => {
	const [step, setStep] = useState<number | undefined>(undefined)
	console.log('step: ', step)
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
