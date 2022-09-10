import { useState } from 'react'
import { Icon } from 'common/Icon'
import { AccordionProps } from './Accordion.types'

export const Accordion = ({ children, className, testId = 'Accordion' }: AccordionProps) => {
	const [active, setActive] = useState(false)

	const handleAccordion = () => {
		setActive(!active)
	}

	return (
		<div className={className} data-testid={testId}>
			<div
				id='accordion-collapse'
				data-accordion='collapse'
				onClick={handleAccordion}
				onKeyDown={handleAccordion}
				role='button'
				tabIndex={0}
			>
				{/* Accordion heading */}
				<h2>
					<button
						type='button'
						className='flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
						data-accordion-target='#accordion-collapse-body-1'
						aria-expanded='true'
						aria-controls='accordion-collapse-body-1'
					>
						<span>{'What is Flowbite?'}</span>
						<Icon icon={active ? 'ChevronUpIcon' : 'ChevronDownIcon'} />
					</button>
				</h2>
				{/* Accordion body */}
				<div className='' aria-labelledby='accordion-collapse-heading-1'>
					{active && children}
				</div>
			</div>
		</div>
	)
}
