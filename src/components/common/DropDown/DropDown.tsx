import { DropDownProps } from './DropDown.types'

export const DropDown = ({ children, className, testId = 'DropDown', name }: DropDownProps) => {
	return (
		<>
			<div
				id={`${name}Trigger`}
				className={className}
				data-testid={testId}
				data-dropdown-toggle={`${name}DropDown`}
			>
				{children}
			</div>

			<div
				id={`${name}DropDown`}
				className='z-10 hidden bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700 dark:divide-gray-600'
			>
				<ul
					className='py-1 text-sm text-gray-700 dark:text-gray-200'
					aria-labelledby='dropdownInformationButton'
				>
					test
				</ul>
			</div>
		</>
	)
}
