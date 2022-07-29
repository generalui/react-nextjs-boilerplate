import { useEffect, useState } from 'react'
import { useRouterQuery } from 'hooks/useRouterQuery'

export const useModal = (name: string) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const { query, update, remove } = useRouterQuery(`modal-${name}`)

	useEffect(() => {
		if (query === 'true') {
			setIsOpen(true)
		} else {
			setIsOpen(false)
		}
	}, [query, name, setIsOpen])

	const handleOpen = () => {
		update({ [`modal-${name}`]: 'true' })
		setIsOpen(true)
	}

	const handleClose = () => {
		remove(`modal-${name}`)
		setIsOpen(false)
	}

	return { isOpen, open: handleOpen, close: handleClose }
}
