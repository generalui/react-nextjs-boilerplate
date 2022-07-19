import { useModal } from 'hooks/useModal'
import { useText } from 'hooks/useText'
import { Button } from 'common/Button'
import { ModalFooter } from 'common/ModalFooter/ModalFooter'
import { SubmitButton } from '../SubmitButton'
import { ModalFooterButtonsProps } from './ModalFooterButtons.types'

export const ModalFooterButtons = ({
	actionButtonLabel = 'Save',
	className,
	modalName,
	testId = 'ModalFooterButtons'
}: ModalFooterButtonsProps) => {
	const { t } = useText('common.modal')
	const { close } = useModal(modalName)

	return (
		<div className={className} data-testid={testId}>
			<ModalFooter className='mt-4'>
				<SubmitButton>{actionButtonLabel}</SubmitButton>
				<Button v='secondary' onClick={close}>
					{t('cancel')}
				</Button>
			</ModalFooter>
		</div>
	)
}
