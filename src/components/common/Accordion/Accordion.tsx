import cn from 'classnames'
import { useState } from 'react'
import { Icon } from 'common/Icon'
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

	const handleAccordion = () => {
		setActive(!active)
	}

	return (
		<div className={className} data-testid={testId}>
			<div
				onClick={handleAccordion}
				onKeyDown={(event) => {
					if (event.key === 'enter') handleAccordion()
				}}
				role='button'
				tabIndex={0}
			>
				{/* Accordion header */}
				<h2>
					<button className='flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'>
						<div className={cn('flex justify-between')}>
							<div className={'flex items-center gap-3'}>
								{iconProps?.icon && (
									<div
										className={cn(
											'p-1 text-white rounded flex justify-center items-center',
											iconProps.wrapperClass
										)}
									>
										<Icon className={className} icon={iconProps.icon} size={iconProps.size} />
									</div>
								)}
								{title}
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
