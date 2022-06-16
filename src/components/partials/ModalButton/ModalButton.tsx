import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Button } from 'common/Button'
import { Modal } from 'common/Modal'
import { setRouterQuery } from '../../../utils/setRouterQuery'
import { ModalButtonProps } from './ModalButton.types'

export const ModalButton = ({
	children,
	className,
	buttonTitle,
	modalTitle,
	name,
	testId = 'ModalButton'
}: ModalButtonProps) => {
	const [open, setOpen] = useState<boolean>(false)
	const { query } = useRouter()

	useEffect(() => {
		if (query[`modal-${name}`] === 'true') {
			setOpen(true)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [query])

	const handleOnClick = () => {
		setRouterQuery({ [`modal-${name}`]: 'true' })
		setOpen(!open)
	}

	const handleOnClose = () => {
		setRouterQuery()
		setOpen(false)
	}

	return (
		<div className={className} data-testid={testId}>
			<Button onClick={handleOnClick} center>
				{buttonTitle}
			</Button>
			<Modal show={open} onClose={handleOnClose} title={modalTitle} bodyClassName='pt-6'>
				{children}
			</Modal>
		</div>
	)
}
