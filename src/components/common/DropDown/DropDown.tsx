import cn from 'classnames'
import { useEffect, useRef, useState } from 'react'
import { DropDownItem } from 'components/common/DropDown/DropDownItem'
import { dropDownVariants } from 'components/common/DropDown/variants'
import { Icon } from 'components/common/Icon'
import { DropDownProps } from './DropDown.types'

export const DropDown = ({
	children,
	className,
	items,
	testId = 'DropDown',
	v = 'default'
}: DropDownProps) => {
	const [isOpen, setIsOpen] = useState(false)

	const toggleOpen = () => setIsOpen(!isOpen)

	const wrapperRef = useRef<HTMLDivElement>(null)

	// below is the same as componentDidMount and componentDidUnmount
	useEffect(() => {
		document.addEventListener('click', handleClickOutside, false)
		return () => {
			document.removeEventListener('click', handleClickOutside, false)
		}
	}, [])

	const handleClickOutside = (event: Event) => {
		if (wrapperRef.current && event.target && !wrapperRef.current.contains(event.target as Node)) {
			setIsOpen(false)
		}
	}

	return (
		<div
			className={cn('z-50 w-64 rounded-lg relative', dropDownVariants[v], className)}
			ref={wrapperRef}
			data-testid={testId}
		>
			<button
				id='dropdownDefault'
				className='w-full px-4 py-1 flex items-center justify-between text-sm font-medium focus:ring-4 focus:outline-none focus:ring-blue-300'
				onClick={toggleOpen}
				type='button'
			>
				<div className='truncate'>{children}</div>
				<Icon icon='ChevronDownIcon' />
			</button>
			<div
				className={cn(
					'z-10 w-full bg-white rounded-lg shadow absolute p-2 text-sm text-gray-700 flex flex-col items-center text-center gap-1',
					{
						hidden: !isOpen
					}
				)}
			>
				{items.map(DropDownItem)}
			</div>
		</div>
	)
}
