import { ConsentEnum } from '@prisma/client'
import { ConsentInput, ConsentPickDataTypes } from 'types/Consent'
import { useText } from 'hooks/useText'
import { Form } from 'partials/Form'
import { ModalButton } from 'partials/ModalButton'
import { Accordion } from 'common/Accordion'
import { Icon } from 'common/Icon'
import { IconProps } from 'common/Icon/Icon.types'
import { ModalFooter } from 'common/ModalFooter'
import { ModalFooterButtons } from 'common/ModalFooterButtons'
import { ToggleButton } from 'common/ToggleButton'
import EditConsentProps from './EditConsent.types'

type ConsentDataType = {
	dictionary: string
	icon: IconProps['icon']
	backgroundColor: string
	isActive?: true
	name: string
	active?: boolean
}

const CONSENT_DATA_TYPE_PROPS: Record<string, ConsentDataType> = {
	analyses: {
		dictionary: 'form.analyses',
		icon: 'FolderAnalyses',
		backgroundColor: 'bg-gray-400',
		name: 'analyses'
	},
	geneticData: {
		dictionary: 'form.geneticData',
		icon: 'GeneticData',
		backgroundColor: 'bg-red-400',
		name: 'geneticData'
	},
	healthRecords: {
		dictionary: 'form.healthRecords',
		icon: 'HealthRecords',
		backgroundColor: 'bg-orange-400',
		name: 'healthRecords'
	},
	specimens: {
		dictionary: 'form.specimens',
		icon: 'Specimens',
		backgroundColor: 'bg-green-400',
		name: 'specimens'
	}
}

const getConsentDataTypes = (consent?: ConsentPickDataTypes) => {
	if (!consent) return []

	const consentDataTypes: (keyof typeof consent)[] = [
		'healthRecords',
		'geneticData',
		'specimens',
		'analyses'
	]

	return consentDataTypes.map((dt) => ({
		...CONSENT_DATA_TYPE_PROPS[dt],
		active: consent[dt] === ConsentEnum.yes
	}))
}

export const EditConsent = ({
	className,
	modalName,
	testId = 'EditConsent',
	consent,
	onSubmit
}: EditConsentProps) => {
	const { t } = useText('participant.todo.consent.modal')
	const consentDataTypes = getConsentDataTypes(consent)

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
					onSubmit={(values: ConsentInput) => onSubmit(values)}
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
										<div className='text-gray-600 font-normal text-base'>
											<div className='flex flex-col gap-2'>
												{t(`${consentDataType.dictionary}.body`)}
												<ToggleButton
													activeLabel={t(`${consentDataType.dictionary}.consented`)}
													inactiveLabel={t(`${consentDataType.dictionary}.notConsented`)}
													name={consentDataType.name}
													isActive={consentDataType.active}
												/>
											</div>
										</div>
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
