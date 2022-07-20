import { Form } from 'react-final-form'
import { useText } from 'hooks/useText'
import { DocumentsInput } from 'partials/DocumentsInput'
import { ModalButton } from 'partials/ModalButton'
import { Icon } from 'common/Icon'
import { ModalFooterButtons } from 'common/ModalFooterButtons'
import { Select } from 'common/Select'
import { Text } from 'common/Text'
import { AddPrivateDataProps } from './AddPrivateData.types'

export const AddPrivateData = ({
	modalName,
	className,
	testId = 'AddPrivateData'
}: AddPrivateDataProps) => {
	const { t } = useText('studies.addPrivateData')

	const options = [{ value: 'consents', label: 'Consents' }]

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
					onSubmit={() => {
						return
					}}
					render={({ handleSubmit }) => (
						<form onSubmit={handleSubmit}>
							<div className='flex flex-col gap-2 p-2'>
								<Text v='subtitle' className='font-semibold'>
									{t('dataType')}
								</Text>
								<Select
									placeholder={t('placeholder')}
									name='dataTypes'
									options={options}
									isClearable
								/>
							</div>
							<div className='flex flex-col gap-2 p-2'>
								<Text v='subtitle' className='font-semibold'>
									{t('filesOrFolders')}
								</Text>
								<DocumentsInput name='privateData' />
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
