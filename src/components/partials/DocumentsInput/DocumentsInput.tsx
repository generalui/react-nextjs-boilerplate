import cn from 'classnames'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Field, FieldInputProps } from 'react-final-form'
import { useText } from 'hooks/useText'
import { Dropzone } from 'common/Dropzone'
import { InputError } from 'common/InputError'
import { InputLabel } from 'common/InputLabel'
import { DocumentGrid } from './DocumentGrid'
import { DocumentPreview, DocumentsInputProps } from './DocumentsInput.types'

const maxFiles = 15
const acceptedFiles = {
	// TODO: Add correct support for file types
	'*': [
		'.pdf',
		'.txt',
		'.csv',
		'.jpg',
		'.jpeg',
		'.png',
		'.gif',
		'.svg',
		'.doc',
		'.docx',
		'.xls',
		'.xlsx'
	]
}

export const DocumentsInput = ({
	className,
	name,
	onChange,
	testId = 'DocumentsInput',
	label,
	labelClassName,
	showAcceptedFileTypes = true
}: DocumentsInputProps) => {
	const [previewDocumentFiles, setPreviewDocumentFiles] = useState<DocumentPreview[] | undefined>()
	const [dropzoneErrors, setDropzoneErrors] = useState<string[]>([])
	const inputRef = useRef<FieldInputProps<File, HTMLElement>>()
	const { t } = useText('createStudy.fields.documentation')
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

	return (
		<div className={cn('pb-2', className)} data-testid={testId}>
			<InputLabel className={labelClassName} name={name} label={label} />

			<Field name={name}>
				{({ input, meta }) => {
					inputRef.current = input
					const isError = (meta.error && meta.touched) || dropzoneErrors.length > 0

					return (
						<>
							{/* Drag and drop area */}
							<Dropzone
								multi
								maxFiles={maxFiles}
								accept={acceptedFiles}
								onChange={(files) => {
									setDropzoneErrors([])
									handleChange(files)
								}}
								onError={(err) => setDropzoneErrors([error(err.message, '5mb')])}
								className='w-full bg-gray-100 h-44 border border-solid  border-gray-400 border-dashed cursor-pointer overflow-y-auto p-4'
							>
								{previewDocumentFiles ? (
									<DocumentGrid documents={previewDocumentFiles} />
								) : (
									<div className='w-full h-full flex flex-col justify-center items-center cursor-pointer'>
										<Image src={'/icons/folder.svg'} width='40' height='30' alt={t('alt')} />
										<label className='font-bold text-blue-600'>{t('filesSelect')}</label>
										<label className='font-light text-gray-500'>{t('filesDrag')}</label>
									</div>
								)}
							</Dropzone>

							{/* Accept file type notice */}
							{showAcceptedFileTypes && (
								<div className='text-xs text-gray-500 mt-2'>
									{t('subText')}{' '}
									{acceptedFiles['*'].map((type, i) => (
										<span key={type}>
											{type}
											{i < acceptedFiles['*'].length - 1 ? ', ' : ''}
										</span>
									))}
								</div>
							)}

							{/* Show errors if any */}
							{isError && <InputError className='mt-2' errors={[...dropzoneErrors, meta.error]} />}
						</>
					)
				}}
			</Field>
		</div>
	)
}
