import cn from 'classnames'
import { useEffect, useRef, useState } from 'react'
import { DropDownItem } from 'common/DropDown/DropDownItem'
import { dropDownVariants } from 'common/DropDown/variants'
import { Icon } from 'common/Icon'
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

	const variantClasses = dropDownVariants[v]

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
			className={cn('z-50 rounded-lg relative', variantClasses.container, className)}
			ref={wrapperRef}
			data-testid={testId}
		>
			<button
				id='dropdownDefault'
				className={cn(
					variantClasses.button,
					'w-full h-full flex items-center justify-between text-sm font-medium focus:ring-4 focus:outline-none focus:ring-blue-300'
				)}
				onClick={toggleOpen}
				type='button'
			>
				<div className='truncate'>{children}</div>
				<Icon icon='ChevronDownIcon' className='text-blue-600' />
			</button>
			<div
				className={cn(
					'z-10 min-w-full bg-white rounded-lg shadow absolute mt-2 p-2 text-sm text-gray-700 flex flex-col items-center text-center gap-1 -translate-x-1/2 left-1/2',
					{
						hidden: !isOpen
					}
				)}
			>
				{items.map(({ onClick, ...rest }) => (
					<DropDownItem
						onClick={() => {
							setIsOpen(false)
							onClick?.()
						}}
						{...rest}
						key={rest.value}
					/>
				))}
			</div>
		</div>
	)
}
