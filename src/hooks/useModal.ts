import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { setRouterQuery } from 'utils/client/setRouterQuery'

export const useModal = (name: string) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const { query } = useRouter()

	useEffect(() => {
		if (query && query[`modal-${name}`] === 'true') {
			setIsOpen(true)
		} else {
			setIsOpen(false)
		}
	}, [query, name, setIsOpen])

	const handleOpen = () => {
		setRouterQuery({ ...query, [`modal-${name}`]: 'true' })
		setIsOpen(true)
	}

	const handleClose = () => {
		const nextQuery = query
		delete nextQuery[`modal-${name}`]
		setRouterQuery(nextQuery)
		setIsOpen(false)
	}

	return { isOpen, open: handleOpen, close: handleClose }
}
