import cn from 'classnames'
import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Field, FieldInputProps } from 'react-final-form'
import { dispatchErrorToast } from 'utils/client/toast'
import { MAX_FILE_SIZE_MB } from 'utils/fileUpload'
import { useText } from 'hooks/useText'
import { Dropzone } from 'common/Dropzone'
import { Icon } from 'common/Icon'
import { IconProps } from 'common/Icon/Icon.types'
import { ImagePreview } from 'common/ImageInput/ImageInput.types'
import { InputError } from 'common/InputError'
import { InputLabel } from 'common/InputLabel'
import { DocumentGrid } from './DocumentGrid'
import { DocumentPreview, DocumentsInputProps } from './DocumentsInput.types'

const defaultMaxFiles = 15
const defaultAcceptedFileTypes = {
	'application/xml': ['.xml'],
	'text/csv': ['.csv'],
	'audio/*': [],
	'image/*': [],
	'video/*': []
}

const defaultIcon = {
	icon: 'folder' as IconProps['icon'],
	size: 'lg' as IconProps['size']
}

export const DocumentsInput = ({
	className,
	name,
	onChange,
	label,
	labelClassName,
	testId = 'DocumentsInput',
	showAcceptedFileTypes = true,
	acceptedFileTypes = defaultAcceptedFileTypes,
	maxFiles = defaultMaxFiles,
	image = defaultIcon,
	localizationScope = 'createStudy.fields.documentation',
	filesSelectLabel = 'filesSelect',
	filesDragLabel = 'filesDrag'
}: DocumentsInputProps) => {
	const [previewDocumentFiles, setPreviewDocumentFiles] = useState<DocumentPreview[] | undefined>()
	const inputRef = useRef<FieldInputProps<File, HTMLElement>>()
	const { t } = useText(localizationScope)
	const { t: error } = useText('common.errors')

	const handleChange = (acceptedFiles: File[]) => {
		if (!acceptedFiles || !acceptedFiles.length) return

		// Handle accepted files
		onChange?.(acceptedFiles)
		inputRef.current?.onChange(acceptedFiles)

		// Generate preview sprites
		const filePreviews = acceptedFiles.map((file) => {
			const existingPreview = previewDocumentFiles?.find((preview) => preview.name === file.name)
			if (existingPreview) {
				return existingPreview
			}

			const currentFile: DocumentPreview = {
				type: file.type,
				name: file.name,
				preview: file.type.includes('image') ? URL.createObjectURL(file) : undefined
			}

			return currentFile
		})

		setPreviewDocumentFiles(filePreviews)
	}

	useEffect(() => {
		return () => {
			// Make sure to revoke the data uris to avoid memory leaks
			previewDocumentFiles?.map((document) => {
				if (document.preview) URL.revokeObjectURL(document.preview)
			})
		}
	}, [previewDocumentFiles])

	const fileTypeStrings = useMemo(
		() =>
			Object.entries(acceptedFileTypes)
				.map(([key, fileTypes]) => {
					const keyName = key.replace('/*', '')
					return !fileTypes.length ? keyName : fileTypes.join(', ')
				})
				.join(', '),
		[acceptedFileTypes]
	)

	return (
		<div className={cn('pb-2', className)} data-testid={testId}>
			<InputLabel className={labelClassName} name={name} label={label} />

			<Field name={name}>
				{({ input, meta }) => {
					inputRef.current = input
					const isError = meta.error && meta.touched

					return (
						<>
							{/* Drag and drop area */}
							<Dropzone
								maxFiles={maxFiles}
								accept={acceptedFileTypes}
								onChange={(files: File[] | ImagePreview | Error) => {
									if (Array.isArray(files)) {
										handleChange(files)
									}
								}}
								onError={(err) => dispatchErrorToast(error(err.message, `${MAX_FILE_SIZE_MB}mb`))}
								className='w-full bg-gray-100 h-44 border border-solid  border-gray-400 border-dashed cursor-pointer overflow-y-auto p-4'
							>
								{previewDocumentFiles ? (
									<DocumentGrid documents={previewDocumentFiles} maxFiles={maxFiles} />
								) : (
									<div className='w-full h-full flex flex-col justify-center items-center cursor-pointer'>
										{'icon' in image ? (
											<Icon icon={image.icon} size={image.size} className='fill-primary' />
										) : (
											<Image
												src={image.src}
												width={image.width}
												height={image.height}
												alt={t('alt')}
											/>
										)}

										<label className='font-bold text-primary'>{t(filesSelectLabel)}</label>
										<label className='font-light text-gray-500'>{t(filesDragLabel)}</label>
									</div>
								)}
							</Dropzone>

							{/* Accept file type notice */}
							{showAcceptedFileTypes && (
								<div className='text-xs text-gray-500 mt-2'>
									{`${t('subText')} ${fileTypeStrings}`}
								</div>
							)}

							{/* Show errors if any */}
							{isError && (
								<InputError
									className='mt-2'
									errors={Array.isArray(meta.error) ? meta.error : [meta.error]}
								/>
							)}
						</>
					)
				}}
			</Field>
		</div>
	)
}
