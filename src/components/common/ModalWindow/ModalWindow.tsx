import { Modal } from 'flowbite-react'
import { memo } from 'react'
import { ModalWindowProps } from './ModalWindow.types'

export const ModalWindow = memo(function ModalWindow({
	children,
	className,
	testId = 'ModalWindow',
	show,
	onClose,
	modalSize
}: ModalWindowProps) {
	return (
		<div className={className} data-testid={testId}>
			<Modal show={show} size='lg' popup={true} onClose={onClose}>
				<Modal.Header>Modal 1</Modal.Header>
				<Modal.Body>{children}</Modal.Body>
			</Modal>
		</div>
	)
})
