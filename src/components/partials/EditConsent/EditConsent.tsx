import { useText } from 'hooks/useText'
import { Form } from 'partials/Form'
import { ModalButton } from 'partials/ModalButton'
import { Button } from 'common/Button'
import { Icon } from 'common/Icon'
import { ModalFooter } from 'common/ModalFooter'
import { SubmitButton } from 'common/SubmitButton'
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
					// validate={(values) => handleValidate(values, publicFilesSchema)}
					render={({ handleSubmit }) => (
						<form onSubmit={handleSubmit}>
							<ModalFooter>
								<SubmitButton
									className='w-full justify-center md:justify-start md:w-auto'
									disableOnLoading
								>
									{t('submitButton')}
								</SubmitButton>
								<Button
									onClick={() => {
										console.log('f')
									}}
									v='secondary'
									className='w-full justify-center md:justify-start md:w-auto'
								>
									{t('cancelButton')}
								</Button>
							</ModalFooter>
						</form>
					)}
				/>
			</ModalButton>
		</div>
	)
}
