import { useEffect, useState } from 'react'
import { useRouterQuery } from './useRouterQuery'

export const useMultiStepForm = (name: string) => {
	const [currentStep, setCurrentStep] = useState<number | undefined>(undefined)
	const { query, update } = useRouterQuery(name)

	useEffect(() => {
		const step = typeof query === 'string' ? parseInt(query) - 1 : 0
		setCurrentStep(step)
	}, [query])

	return { currentStep, setCurrentStep }
}
