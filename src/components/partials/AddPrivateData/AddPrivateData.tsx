// TODO: Rename this component to AddStudyDataVaultDocumentation - OR - refactor to share the same component as AddStudyDocumentation
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Form } from 'react-final-form'
import { DataVaultInput, DataVaultSchema } from 'types/Study'
import { handleValidate } from 'utils/client/handleValidate'
import { useStudy } from 'hooks/api/studies/useStudy'
import { useModal } from 'hooks/useModal'
import { useStudyDataTypes } from 'hooks/useStudyDataTypes'
import { useText } from 'hooks/useText'
import { DocumentsInput } from 'partials/DocumentsInput'
import { DropDown } from 'common/DropDown'
import { Icon } from 'common/Icon'
import { Modal } from 'common/Modal'
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
	const { t } = useText('studies.privateData')
	const studyDataTypes = useStudyDataTypes(dataTypes)
	const { isOpen, open, close } = useModal(modalName)
	const { uploadToDataVault } = useStudy(studyId)
	const { push } = useRouter()
	const { isLoading, isSuccess, reset } = uploadToDataVault

	useEffect(() => {
		if (!isLoading && isSuccess) {
			close()
			reset()
		}
	}, [isLoading, isSuccess, close, reset])

	const onSubmit = (values: DataVaultInput) => {
		uploadToDataVault.mutate(DataVaultSchema.parse(values))
	}

	return (
		<div className={className} data-testid={testId}>
			<DropDown
				v='button'
				items={[
					{
						label: (
							<div className='flex items-center gap-1'>
								<Image
									src='/icons/redcap.svg'
									width={25}
									height={25}
									alt={t('dropDownItems.redcap.alt')}
								/>
								{t('dropDownItems.redcap.label')}
							</div>
						),
						onClick: () => {
							push(`${studyId}/upload-redcap-xml`)
						},
						value: 'profile'
					},
					{
						label: (
							<div className='flex items-center gap-1'>
								<Image
									src='/icons/document-upload.svg'
									width={25}
									height={25}
									alt={t('dropDownItems.files.alt')}
								/>
								{t('dropDownItems.files.label')}
							</div>
						),
						onClick: open,
						value: 'logout'
					}
				]}
			>
				<Icon icon='PlusIcon' className='text-white' size='xs' />
				{t('buttonLabel')}
			</DropDown>
			<Modal show={isOpen} onClose={close} title={'modalTitle'} bodyClassName='pt-6'>
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
								isLoading={isLoading}
							/>
						</form>
					)}
				/>
			</Modal>
		</div>
	)
}
