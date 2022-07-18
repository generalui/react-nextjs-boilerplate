import cn from 'classnames'
import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { toast } from 'utils/client/toast'
import { useText } from 'hooks/useText'
import { DropzoneProps } from './Dropzone.types'

const MAX_FILE_SIZE = 5 * 1000000 // 5 mb
const getTotalFileSize = (files?: File[]) =>
	!files ? 0 : files.reduce((totalSize, currentFile) => totalSize + currentFile.size, 0)

export const Dropzone = ({
	onChange,
	onError,
	className,
	children,
	maxFiles,
	accept,
	testId = 'Dropzone'
}: DropzoneProps) => {
	const [cachedFiles, setFiles] = useState<File[]>()
	const { t: error } = useText('common.errors')

	const { getRootProps, getInputProps } = useDropzone({
		maxFiles,
		accept,
		onDrop: async (acceptedFiles: File[]) => {
			if (!acceptedFiles || !acceptedFiles.length) return

			// Prevent duplicates
			const files = acceptedFiles.filter((file) => {
				const isUnique =
					file !== undefined && !cachedFiles?.find((cachedFile) => cachedFile.name === file.name)

				// Notify user of error
				if (!isUnique)
					toast(
						<>
							<div>{error('duplicateFileOmitted', file.name)}</div>
							<div className='text-red-500'>{file.name}</div>
						</>,
						'error'
					)

				return isUnique
			})

			// Calculate total file size of dropped files
			const filesAfterDrop = cachedFiles ? [...cachedFiles, ...files] : [...files]
			const totalFileSize = getTotalFileSize(filesAfterDrop)
			if (totalFileSize > MAX_FILE_SIZE) {
				onError?.(new Error('maxFileSizeExceeded'))
			} else {
				// If file size not exceeded set the files
				setFiles(filesAfterDrop)
				onChange?.(filesAfterDrop)
			}
		}
	})

	return (
		<div
			{...getRootProps({
				className: cn(
					'dropzone relative rounded-lg border border-gray-400 focus:border-2 focus:border-blue-600 focus:outline-2  focus:outline-gray-400 overflow-hidden flex flex-col items-center grow-0 w-full h-full',
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
