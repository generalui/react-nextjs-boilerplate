import cn from 'classnames'
import { memo } from 'react'
import { ModalFooter } from 'common/ModalFooter'
import { ModalHeader } from 'common/ModalHeader'
import { ModalProps } from './Modal.types'

export const Modal = memo(function Modal({
	children,
	className,
	testId = 'Modal',
	show,
	onClose,
	title,
	footer,
	bodyClassName,
	size = '2xl'
}: ModalProps) {
	if (!show) return null

	return (
		<div className={className} data-testid={testId}>
			{/* Background Container */}
			<div
				id='popup-modal'
				className=' overflow-y-auto overflow-x-hidden fixed top-0 right-0 bottom-0 left-0 z-50 md:inset-0 h-full md:h-full items-center justify-center flex bg-gray-900 bg-opacity-50 dark:bg-opacity-80'
			>
				{/* Modal Container */}
				<div
					className={cn(
						'relative bg-white sm:bg-transparent sm:p-4 w-full h-full ',
						`max-w-${size}`
					)}
				>
					{/* Modal */}
					<div className='relative p-3 bg-white sm:rounded-lg sm:shadow dark:bg-gray-700 '>
						{/* Modal Header */}
						{title &&
							(typeof title === 'string' ? (
								<ModalHeader title={title} onClose={onClose} />
							) : (
								{ title }
							))}

						{bodyClassName ? <div className={bodyClassName}>{children}</div> : children}

						{/* Modal footer */}
						{footer && <ModalFooter />}
					</div>
				</div>
			</div>
		</div>
	)
})
