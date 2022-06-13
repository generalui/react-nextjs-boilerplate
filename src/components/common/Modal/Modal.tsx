import { Modal as M } from 'flowbite-react'
import { memo } from 'react'
import { ModalProps } from './Modal.types'

export const Modal = memo(function Modal({
	children,
	className,
	testId = 'Modal',
	show,
	onClose,
	size,
	popup,
	title,
	footer
}: ModalProps) {
	return (
		<div className={className} data-testid={testId}>
			<M show={show} size={size} popup={popup} onClose={onClose}>
				{title && <M.Header>{title}</M.Header>}
				<M.Body>{children}</M.Body>
				{footer && <M.Footer>{footer}</M.Footer>}
			</M>
		</div>
	)
})
