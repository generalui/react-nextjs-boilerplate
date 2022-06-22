import { useModal } from 'hooks/useModal'
import { Button } from 'common/Button'
import { Modal } from 'common/Modal'
import { ModalButtonProps } from './ModalButton.types'

export const ModalButton = ({
	children,
	className,
	buttonChildren: buttonText,
	modalTitle,
	name,
	testId = 'ModalButton'
}: ModalButtonProps) => {
	const { isOpen, open, close } = useModal(name)

	return (
		<div className={className} data-testid={testId}>
			<Button onClick={open} center>
				{buttonText}
			</Button>
			<Modal show={isOpen} onClose={close} title={modalTitle} bodyClassName='pt-6'>
				{children}
			</Modal>
		</div>
	)
}
