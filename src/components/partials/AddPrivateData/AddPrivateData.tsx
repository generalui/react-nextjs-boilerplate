// TODO: Rename this component to AddStudyDataVaultDocumentation - OR - refactor to share the same component as AddStudyDocumentation
import { Form } from 'react-final-form'
import { DataVaultInput, DataVaultSchema } from 'types/Study'
import { handleValidate } from 'utils/client/handleValidate'
import { useStudy } from 'hooks/api/studies/useStudy'
import { useModal } from 'hooks/useModal'
import { useStudyDataTypes } from 'hooks/useStudyDataTypes'
import { useText } from 'hooks/useText'
import { DocumentsInput } from 'partials/DocumentsInput'
import { ModalButton } from 'partials/ModalButton'
import { Icon } from 'common/Icon'
import { ModalFooterButtons } from 'common/ModalFooterButtons'
import { Text } from 'common/Text'
import { DataTypesSelect } from '../DataTypesSelect'
import { AddPrivateDataProps } from './AddPrivateData.types'

export const AddPrivateData = ({
	modalName,
	className,
	dataTypes,
	studyId,
	testId = 'AddPrivateData'
}: AddPrivateDataProps) => {
	const { t } = useText('studies.addPrivateData')
	const studyDataTypes = useStudyDataTypes(dataTypes)
	const { close } = useModal(modalName)
	const { uploadToDataVault } = useStudy(studyId)
	const { reset } = uploadToDataVault

	const onSubmit = async (values: DataVaultInput) => {
		await uploadToDataVault.mutate(DataVaultSchema.parse(values))

		close()
		reset()
	}

	return (
		<div className={className} data-testid={testId}>
			<ModalButton
				name={modalName}
				modalTitle={t('modalTitle')}
				v='sm'
				buttonChildren={
					<>
						<Icon icon='PlusIcon' className='text-white' size='xs' />
						{t('buttonLabel')}
					</>
				}
			>
				<Form
					onSubmit={onSubmit}
					validate={(values) => handleValidate(values, DataVaultSchema)}
					render={({ handleSubmit }) => (
						<form onSubmit={handleSubmit}>
							<div className='flex flex-col gap-2 p-2'>
								<Text v='subtitle' className='font-semibold'>
									{t('dataType')}
								</Text>
								<DataTypesSelect options={studyDataTypes} name='dataType' isClearable />
							</div>
							<div className='flex flex-col gap-2 p-2'>
								<Text v='subtitle' className='font-semibold'>
									{t('filesOrFolders')}
								</Text>
								<DocumentsInput name='dataVault' />
							</div>

							<ModalFooterButtons
								actionButtonLabel={t('submitLabel')}
								modalName={modalName}
								isLoading={false}
							/>
						</form>
					)}
				/>
			</ModalButton>
		</div>
	)
}
