import { Document } from '@prisma/client'
import cn from 'classnames'
import Image from 'next/image'
import { useCallback, useMemo } from 'react'
import { useText } from 'hooks/useText'
import { List } from 'partials/List'
import { Column } from 'partials/List/List.types'
import { Icon } from 'common/Icon'
import { DocumentationListProps } from './DocumentationList.types'

export const DocumentationList = ({
	action,
	className,
	documents,
	iconProps,
	isLoading,
	testId = 'DocumentationList',
	title
}: DocumentationListProps) => {
	const { t } = useText('studies.documentation')

	const renderDocumentIcon = useCallback((fileType: string) => {
		let icon: JSX.Element

		if (fileType.includes('pdf')) {
			icon = <Icon icon={'Pdf'} className='text-danger' />
		} else if (fileType.includes('image')) {
			icon = <Icon icon='PhotographIcon' className='text-accent-1' />
		} else if (fileType.includes('application')) {
			icon = <Icon icon='DocumentTextIcon' className='text-primary' />
		} else {
			icon = <Icon icon='PaperClipIcon' />
		}

		return <div className='h-6 w-6 flex justify-center items-center'>{icon}</div>
	}, [])

	const documentComponents = useMemo(
		() =>
			documents.map((document: Document) => {
				const prismaDate = new Date(document.insertedAt)
				const date = `${
					prismaDate.getMonth() + 1
				}/${prismaDate.getDate()}/${prismaDate.getFullYear()}`
				return {
					key: document.id,
					name: (
						<div className='flex gap-2'>
							{renderDocumentIcon(document.fileType)}
							{document.name}
						</div>
					),
					date
				}
			}),
		[documents, renderDocumentIcon]
	)

	const columns: Column<typeof documentComponents[0]>[] = [
		{
			key: 'name',
			title: t('name'),
			className: 'break-all',
			width: 10
		},
		{
			key: 'date',
			title: t('modified'),
			headerClassName: 'text-right',
			className: 'text-right',
			width: 2
		}
	]

	return (
		<List
			action={action}
			className={cn('max-h-64 overflow-y-auto', className)}
			columns={columns}
			concise
			data={documentComponents}
			emptyMessage={t('noDocuments')}
			iconProps={iconProps}
			indexKey='key'
			isLoading={isLoading}
			sharedClassName='text-gray-500'
			testId={testId}
			title={title}
		/>
	)
}
