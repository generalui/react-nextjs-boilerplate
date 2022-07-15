import cn from 'classnames'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Field, FieldInputProps } from 'react-final-form'
import { useText } from 'hooks/useText'
import { DocumentGrid } from 'common/DocumentGrid'
import { Dropzone } from 'common/Dropzone'
import { InputError } from 'common/InputError'
import { DocumentPreview, DocumentsInputProps } from './DocumentsInput.types'

const MAX_FILE_SIZE = 5 * 1000000 // 5 mb

export const DocumentsInput = ({
	className,
	name,
	onChange,
	testId = 'DocumentsInput'
}: DocumentsInputProps) => {
	const [previewDocumentFiles, setPreviewDocumentFiles] = useState<DocumentPreview[] | undefined>()
	const [documentFiles, setDocumentFiles] = useState<File[] | undefined>()
	const [dropzoneErrors, setDropzoneErrors] = useState<string[]>([])
	const inputRef = useRef<FieldInputProps<File, HTMLElement>>()
	const { t } = useText('createStudy.fields.documentation')

	const handleChange = (acceptedFiles: File[]) => {
		if (!acceptedFiles || !acceptedFiles.length) return

		const files = acceptedFiles.filter((file) => {
			return (
				file !== undefined &&
				!documentFiles?.find((documentFile) => documentFile.name === file.name)
			)
			// add a Toast when file is duplicated
		})

		const currentFilePreviews = files.map((file) => {
			const currentFile: DocumentPreview = {
				type: file.type,
				name: file.name,
				preview: file.type.includes('image') ? URL.createObjectURL(file) : undefined
			}

			return currentFile
		})

		setPreviewDocumentFiles(
			previewDocumentFiles
				? [...previewDocumentFiles, ...currentFilePreviews]
				: [...currentFilePreviews]
		)

		setDocumentFiles(documentFiles ? [...documentFiles, ...files] : [...files])
	}

	useEffect(() => {
		return () => {
			// Make sure to revoke the data uris to avoid memory leaks
			previewDocumentFiles?.map((document) => {
				if (document.preview) URL.revokeObjectURL(document.preview)
			})
		}
	}, [previewDocumentFiles])

	useEffect(() => {
		const totalFileSize = documentFiles?.reduce((totalSize, currentFile) => {
			return totalSize + currentFile.size
		}, 0)

		if (totalFileSize && totalFileSize > MAX_FILE_SIZE) {
			onChange?.(new Error('maxFileSizeExceeded'))
		}

		inputRef.current?.onChange(documentFiles)
	}, [documentFiles, onChange])

	return (
		<div className={cn(className)} data-testid={testId}>
			<Field name={name}>
				{({ input, meta }) => {
					inputRef.current = input
					const isError = (meta.error && meta.touched) || dropzoneErrors.length > 0
					const handleChangeInner = (files: File[]) => {
						setDropzoneErrors([])

						handleChange(files)
					}

					return (
						<>
							<Dropzone
								multi
								onChange={handleChangeInner}
								onError={(error) => setDropzoneErrors([t(error.message, '5mb')])}
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

							{isError && <InputError errors={[...dropzoneErrors, meta.error]} />}
						</>
					)
				}}
			</Field>
		</div>
	)
}
