import cn from 'classnames'
import { useDropzone } from 'react-dropzone'
import { DropzoneProps } from './Dropzone.types'

const MAX_FILE_SIZE = 5 * 1000000 // 5 mb

export const Dropzone = ({
	onChange,
	className,
	children,
	maxFiles,
	accept,
	testId = 'Dropzone'
}: DropzoneProps) => {
	const { getRootProps, getInputProps } = useDropzone({
		maxFiles,
		accept,
		onDrop: async (acceptedFiles: File[]) => {
			if (!acceptedFiles || !acceptedFiles.length) return

			const file = acceptedFiles[0]

			if (file.size > MAX_FILE_SIZE) {
				onChange?.(new Error('maxFileSizeExceeded'))
			} else {
				onChange?.(file)
			}
		}
	})

	return (
		<div
			{...getRootProps({
				className: cn(
					'dropzone relative rounded-lg border border-gray-400 focus:border-2 focus:border-blue-600 focus:outline-2  focus:outline-gray-400 overflow-hidden flex flex-col items-center grow-0 w-full h-full h-40 w-40 lg:h-[198px] lg:w-[198px]',
					className
				)
			})}
			data-testid={testId}
			tabIndex={0}
			role='button'
		>
			<input className='hidden' {...getInputProps()} />
			{children}
		</div>
	)
}
