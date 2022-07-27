import cn from 'classnames'
import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { toast } from 'utils/client/toast'
import { useText } from 'hooks/useText'
import { ImagePreview } from 'common/ImageInput/ImageInput.types'
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
	imageDropzone,
	testId = 'Dropzone'
}: DropzoneProps) => {
	const [cachedFiles, setFiles] = useState<File[] | ImagePreview>()
	const { t: error } = useText('common.errors')

	const onDropImg = async (acceptedFiles: File[]) => {
		if (!acceptedFiles || !acceptedFiles.length) return

		const file = acceptedFiles[0]

		if (file.size > MAX_FILE_SIZE) {
			onChange?.(new Error('maxFileSizeExceeded'))
		} else {
			const imageFile: ImagePreview = {
				...file,
				preview: URL.createObjectURL(file)
			}

			setFiles(imageFile)
			onChange?.(imageFile)
			console.log('onChange: ', onChange)
		}
	}

	const onDropDocuments = async (acceptedFiles: File[]) => {
		if (!acceptedFiles || !acceptedFiles.length) return

		if (!cachedFiles || !('preview' in cachedFiles)) {
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
	}

	const { getRootProps, getInputProps } = useDropzone({
		maxFiles,
		accept,
		onDrop: async (acceptedFiles: File[]) => {
			if (imageDropzone) {
				onDropImg(acceptedFiles)
			} else {
				onDropDocuments(acceptedFiles)
			}
		}
	})

	return (
		<div
			{...getRootProps({
				className: cn(
					'dropzone relative rounded-lg overflow-hidden flex flex-col  grow-0 w-full h-full',
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
