import { useMultiStepForm } from 'hooks/useMultiStepForm'
import { MultiStepFormProps } from './MultiStepForm.types'

export const MultiStepForm = ({
	name,
	className,
	steps,
	testId = 'MultiStepForm'
}: MultiStepFormProps) => {
	const { currentStep } = useMultiStepForm(name)

	return (
		<div className={className} data-testid={testId}>
			{typeof currentStep === 'number' && steps[currentStep]}
		</div>
	)
}
