import { useText } from 'hooks/useText'
import { Form } from 'partials/Form'
import { ModalButton } from 'partials/ModalButton'
import { Accordion } from 'common/Accordion'
import { Icon } from 'common/Icon'
import { ModalFooter } from 'common/ModalFooter'
import { ModalFooterButtons } from 'common/ModalFooterButtons'
import { Text } from 'common/Text'
import { EditConsentProps } from './EditConsent.types'

export const EditConsent = ({ className, modalName, testId = 'EditConsent' }: EditConsentProps) => {
	const { t } = useText('participant.study.consent.modal')

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
							<Accordion
								isActive
								title={'test'}
								iconProps={{ icon: 'HealthRecords', wrapperClass: 'bg-orange-400', size: 'sm' }}
							>
								<div>
									<Text className='text-gray-600 font-normal text-base'>
										{
											'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Urna cursus eget nunc scelerisque. Nulla facilisi morbi tempus iaculis. Volutpat maecenas volutpat blandit aliquam. Porttitor eget dolor morbi non arcu risus quis. Elementum eu facilisis sed odio. Adipiscing diam donec adipiscing tristique risus nec feugiat in fermentum. Condimentum vitae sapien pellentesque habitant morbi tristique senectus et.'
										}
									</Text>
								</div>
							</Accordion>
							<Accordion
								title={'test'}
								iconProps={{ icon: 'Specimens', wrapperClass: 'bg-green-400', size: 'sm' }}
							>
								{'test 2'}
							</Accordion>
							<Accordion
								title={'test'}
								iconProps={{ icon: 'GeneticData', wrapperClass: 'bg-red-400', size: 'sm' }}
							>
								{'test 3'}
							</Accordion>
							<Accordion
								title={'test'}
								iconProps={{ icon: 'FolderAnalyses', wrapperClass: 'bg-gray-400', size: 'sm' }}
							>
								{'test 3'}
							</Accordion>
							<ModalFooter>
								<ModalFooterButtons modalName={modalName} />
							</ModalFooter>
						</form>
					)}
				/>
			</ModalButton>
		</div>
	)
}
