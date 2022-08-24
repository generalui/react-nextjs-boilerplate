import cn from 'classnames'
import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { toast } from 'utils/client/toast'
import { MAX_FILE_SIZE_BYTES } from 'utils/fileUpload'
import { useText } from 'hooks/useText'
import { ImagePreview } from 'common/ImageInput/ImageInput.types'
import { DropzoneProps } from './Dropzone.types'

export const Dropzone = ({
	accept,
	children,
	className,
	maxFiles,
	onChange,
	onError,
	testId = 'Dropzone'
}: DropzoneProps) => {
	const [cachedFiles, setFiles] = useState<File[] | ImagePreview>()
	const { t: error } = useText('common.errors')

	const onDrop = async (acceptedFiles: File[]) => {
		if (!acceptedFiles || !acceptedFiles.length) return

		let hasFileSizeError = false

		if (!cachedFiles || !('preview' in cachedFiles)) {
			// Prevent duplicates
			const files = acceptedFiles.filter((file) => {
				if (file.size > MAX_FILE_SIZE_BYTES) {
					hasFileSizeError = true
					return false
				}
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

			if (hasFileSizeError) {
				onError(new Error('maxFileSizeExceeded'))
			}

			setFiles(files)
			onChange(files)
		}
	}

	const { getRootProps, getInputProps } = useDropzone({
		maxFiles,
		accept,
		onDrop
	})

	return (
		<div
			{...getRootProps({
				className: cn(
					'dropzone relative rounded-lg overflow-hidden flex flex-col grow-0 w-full h-full',
					className
				)
			})}
			data-testid={testId}
			tabIndex={0}
			role='button'
		>
			<input className='hidden' {...getInputProps()} />
			{typeof children === 'function' ? children(cachedFiles) : children}
		</div>
	)
}
