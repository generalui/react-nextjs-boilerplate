/* eslint-disable react/jsx-key */
import { useReducer } from 'react'
import { State, UploadXmlInput } from 'types/index'
import { MultiStepForm } from 'partials/MultiStepForm'
import { UploadRedcapXml } from 'partials/UploadRedcapXml'
import { RedcapXmlFormProps } from './RedcapXmlForm.types'

export const RedcapXmlForm = ({ className, testId = 'RedcapXmlForm' }: RedcapXmlFormProps) => {
	const initialState: State = {
		xmlFile: undefined,
		result2: ''
	}

	function reducer(state: State, action: { type: string; payload: State }): State {
		switch (action.type) {
			case 'xmlFile': {
				const xmlFile = action.payload.xmlFile
				return { ...state, xmlFile }
			}
			default:
				return state
		}
	}

	const [state, dispatch] = useReducer(reducer, initialState)

	const handleUploadRedcapXml = (values: UploadXmlInput) => {
		dispatch({ type: 'xmlFile', payload: { xmlFile: values.xmlFile[0] } })
	}

	const multiStepComponents = [
		<UploadRedcapXml onSubmit={handleUploadRedcapXml} />,
		<>{'Component 2'}</>,
		<>{'Component 3'}</>
	]

	return (
		<div className={className} data-testid={testId}>
			<MultiStepForm steps={multiStepComponents} name='upload-redcap-xml-form-step' />
		</div>
	)
}
