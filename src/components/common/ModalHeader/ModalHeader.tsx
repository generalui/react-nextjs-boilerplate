import { XIcon } from '@heroicons/react/solid'
import { ModalHeaderProps } from './ModalHeader.types'

export const ModalHeader = ({
	className,
	testId = 'ModalHeader',
	title,
	onClose
}: ModalHeaderProps) => {
	return (
		<div className={className} data-testid={testId}>
			<div className='flex justify-between items-center pl-1.5 pb-3 border-b dark:border-gray-600'>
				<div className=''>
					<h2>{title}</h2>
				</div>
				<button
					type='button'
					className=' text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white'
					data-modal-toggle='popup-modal'
					onClick={onClose}
				>
					<XIcon className='h-5 w-5' />
				</button>
			</div>
		</div>
	)
}
