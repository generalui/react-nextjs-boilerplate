import cn from 'classnames'
import { useState } from 'react'
import { MouseEvent } from 'react'
import { Icon } from 'common/Icon'
import { Text } from 'common/Text'
import { AccordionProps } from './Accordion.types'

export const Accordion = ({
	children,
	isActive,
	title,
	className,
	iconProps,
	testId = 'Accordion'
}: AccordionProps) => {
	const [active, setActive] = useState(isActive || false)

	const handleAccordion = (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
		event.preventDefault()
		if (event.target === event.currentTarget) {
			setActive(!active)
		}
	}

	return (
		<div className={className} data-testid={testId}>
			<div>
				{/* Accordion header */}
				<h2>
					<button
						className='flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
						onClick={(event) => handleAccordion(event)}
					>
						<div className={cn('flex justify-between')}>
							<div className='flex items-center gap-3'>
								{iconProps?.icon && (
									<div
										className={cn(
											'p-2 text-white rounded flex justify-center items-center',
											iconProps.wrapperClass
										)}
									>
										<Icon className={className} icon={iconProps.icon} size={iconProps.size} />
									</div>
								)}
								<Text className='text-gray-900 text-lg'>{title}</Text>
							</div>
						</div>
						<Icon icon={active ? 'ChevronUpIcon' : 'ChevronDownIcon'} />
					</button>
				</h2>
				{/* Accordion body */}
				<div>
					{active && (
						<div className='p-5 font-light border border-b-0 border-gray-200 dark:border-gray-700'>
							{children}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
