import { useMultiStepForm } from 'hooks/useMultiStepForm'
import { MultiStepFormProps } from './MultiStepForm.types'

type MultiStepFormComponent = <T>(props: MultiStepFormProps<T>) => JSX.Element

export const MultiStepForm: MultiStepFormComponent = ({
	className,
	steps,
	testId = 'MultiStepForm'
}) => {
	const { currentStep } = useMultiStepForm()

	return (
		<div className={className} data-testid={testId}>
			{typeof currentStep === 'number' && steps[currentStep].component}
		</div>
	)
}
