// import { XMLBuilder, XMLParser, XMLValidator } from 'fast-xml-parser'
import { useState } from 'react'
import { FormProps as FinalFormProps } from 'react-final-form'
import { CommonProps } from 'types/CommonProps'
import { z } from 'zod'
import { useStudyDataTypes } from 'hooks/useStudyDataTypes'
import { useText } from 'hooks/useText'
import { DocumentsInput } from 'partials/DocumentsInput'
import { Form } from 'partials/Form'
import { PageWrapper } from 'partials/PageWrapper'
import { Button } from 'common/Button'
import { Card } from 'common/Card'
import { ModalFooter } from 'common/ModalFooter'
import { SubmitButton } from 'common/SubmitButton'
import { XMLPreview } from './XMLPreview'

export interface FormProps<T extends Record<string, unknown>> extends CommonProps {
	initialValues?: T
	onSubmit: (values: T) => void
	render: Required<FinalFormProps<T>>['render']
	submitText?: string
	validate?: FinalFormProps<T>['validate']
	keepDirtyOnReinitialize?: FinalFormProps<T>['keepDirtyOnReinitialize']
}

export const UploadSchema = z.object({
	redcapXML: z.any().array().optional()
})

// The shape of data in outgoing axios requests
export type UploadInput = z.infer<typeof UploadSchema>

export interface XMLFormProps extends Omit<FormProps<UploadInput>, 'render'> {
	create?: boolean
	isLoading: boolean
	onCancel: () => void
}

export const XMLForm = ({
	initialValues,
	isLoading,
	onCancel,
	onSubmit,
	testId = 'CreateStudy',
	submitText
}: XMLFormProps) => {
	const { t } = useText('createStudy')
	const [jsonPreview, setJsonPreview] = useState<Record<string, unknown>>()
	const studyDataTypes = useStudyDataTypes()

	return (
		<Form
			keepDirtyOnReinitialize
			data-testid={testId}
			onSubmit={onSubmit}
			initialValues={initialValues}
			// validate={(values) => handleValidate(values, StudySchema)}
			render={({ handleSubmit, values }) => {
				// console.log('~ values', values)
				const redcap = values?.['redcapXML']?.[0]
				// const redcap = values?.['redcapXML']?.[0]?.text().then((redcapResult: any) => {
				// 	console.log('~ redcapResult', redcapResult)
				// 	parseString(redcap, function (_err, result) {
				// 		console.dir('result', result)
				// 		if (result) setJsonPreview(result)
				// 	})
				// 	// const jObj = redcap
				// 	// 	? parser.parse(redcap)
				// 	// 	: // .then((redcapResult: any) => console.log('redcapResult', redcapResult))
				// 	// 	  undefined
				// 	// console.log('~ jObj', jObj)
				// })

				return (
					<form onSubmit={handleSubmit}>
						<div className='grid grid-cols-1 gap-4 pb-6 lg:gap-6'>
							<div className='col-span-1'>
								<DocumentsInput name='redcapXML' label={t('fields.documentation.label')} />
							</div>

							{redcap && <XMLPreview xmlFile={redcap} />}
						</div>
						<ModalFooter>
							<SubmitButton
								className='w-full justify-center md:justify-start md:w-auto'
								isLoading={isLoading}
								disableOnLoading
							>
								{submitText || t('buttons.submit')}
							</SubmitButton>
							<Button
								onClick={onCancel}
								v='secondary'
								className='w-full justify-center md:justify-start md:w-auto'
							>
								{t('buttons.cancel')}
							</Button>
						</ModalFooter>
					</form>
				)
			}}
		/>
	)
}

const UploadPage = () => {
	return (
		<PageWrapper title={'title'} testId={'upload'}>
			<Card>
				<XMLForm onSubmit={console.log} onCancel={console.log} isLoading={false} />
			</Card>
		</PageWrapper>
	)
}
export default UploadPage
