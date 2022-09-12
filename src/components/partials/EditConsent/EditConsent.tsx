import { useText } from 'hooks/useText'
import { Form } from 'partials/Form'
import { ModalButton } from 'partials/ModalButton'
import { Accordion } from 'common/Accordion'
import { Icon } from 'common/Icon'
import { IconProps } from 'common/Icon/Icon.types'
import { ModalFooter } from 'common/ModalFooter'
import { ModalFooterButtons } from 'common/ModalFooterButtons'
import { Text } from 'common/Text'
import { ToggleButton } from 'common/ToggleButton'
import { EditConsentProps } from './EditConsent.types'

type ConsentDataType = {
	dictionary: string
	icon: IconProps['icon']
	backgroundColor: string
	isActive?: true
}

export const EditConsent = ({ className, modalName, testId = 'EditConsent' }: EditConsentProps) => {
	const { t } = useText('participant.study.consent.modal')

	const consentDataTypes: ConsentDataType[] = [
		{
			dictionary: 'form.healthRecords',
			icon: 'HealthRecords',
			backgroundColor: 'bg-orange-400',
			isActive: true
		},
		{ dictionary: 'form.specimens', icon: 'Specimens', backgroundColor: 'bg-green-400' },
		{ dictionary: 'form.geneticData', icon: 'GeneticData', backgroundColor: 'bg-red-400' },
		{ dictionary: 'form.analyses', icon: 'FolderAnalyses', backgroundColor: 'bg-gray-400' }
	]

	return (
		<div className={className} data-testid={testId}>
			<ModalButton
				name={modalName}
				modalTitle={t('title')}
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
						console.log('f')
					}}
					render={({ handleSubmit }) => (
						<form onSubmit={handleSubmit}>
							{consentDataTypes.map((consentDataType) => (
								<Accordion
									key={consentDataType.dictionary}
									isActive={consentDataType.isActive}
									title={t(`${consentDataType.dictionary}.title`)}
									iconProps={{
										icon: consentDataType.icon,
										wrapperClass: consentDataType.backgroundColor,
										size: 'sm'
									}}
								>
									<div>
										<Text className='text-gray-600 font-normal text-base'>
											<div className='flex flex-col gap-2'>
												{t(`${consentDataType.dictionary}.body`)}
												<ToggleButton />
											</div>
										</Text>
									</div>
								</Accordion>
							))}
							<ModalFooter>
								<ModalFooterButtons modalName={modalName} className='w-full' />
							</ModalFooter>
						</form>
					)}
				/>
			</ModalButton>
		</div>
	)
}
