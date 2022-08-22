import { createReduxModule } from 'hooks-for-redux'
import { useEffect, useState } from 'react'
import { useRouterQuery } from './useRouterQuery'

const defaultUseMultiStepFormReducerState: MultiStepFormReducerState = {
	step: 0,
	values: undefined
}

type MultiStepFormReducerState = Record<string, unknown> & {
	values?: Record<string, unknown> // this can probably be a generuic
	step: number
}

export const [useMultiStepFormReducer, { setValue, incStep, setStep, reset }] = createReduxModule(
	'multi-step-form',
	defaultUseMultiStepFormReducerState,
	{
		setValue: (state: MultiStepFormReducerState, update: Record<string, unknown>) => ({
			...state,
			values: { ...state?.values, ...update }
		}),
		incStep: (state: MultiStepFormReducerState, amount?: number) => {
			return {
				...state,
				step: state.step + (amount || 1)
			}
		},
		setStep: (state: MultiStepFormReducerState, value: number) => ({
			...state,
			step: value
		}),
		reset: () => defaultUseMultiStepFormReducerState
	}
)

export const useMultiStepForm = () => {
	const { query, update } = useRouterQuery(`step`)
	const { step, values } = useMultiStepFormReducer()

	useEffect(() => {
		if (query) {
			const queryStepNumber =
				typeof query === 'string' && !isNaN(parseInt(query)) && parseInt(query) > 0
					? parseInt(query) - 1
					: 0

			setStep(queryStepNumber)
		}
	}, [query])

	const handleStep = () => {
		update({ step: `${step + 2}` })
		incStep()
	}

	return { setValue, step: handleStep, reset, currentStep: step, values }
	// return { currentStep }
}
