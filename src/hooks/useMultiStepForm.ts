import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export const useMultiStepForm = () => {
	const [currentStep, setCurrentStep] = useState<number | undefined>(undefined)
	const { query } = useRouter()

	useEffect(() => {
		const step = typeof query.step === 'string' ? parseInt(query.step) - 1 : undefined
		setCurrentStep(step)
	}, [query])

	return { currentStep }
}
