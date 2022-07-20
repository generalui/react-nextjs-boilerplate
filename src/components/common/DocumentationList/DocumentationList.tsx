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
	className,
	documents,
	isLoading,
	testId = 'DocumentationList'
}: DocumentationListProps) => {
	const { t } = useText('studies.documentation')
	const columns: Column[] = [
		{
			key: 'name',
			title: t('name'),
			className: 'break-all',
			width: 10
		},
		{
			key: 'date',
			title: t('modified'),
			width: 2
		}
	]

	const renderDocumentIcon = useCallback(
		(fileType: string) => {
			let icon: JSX.Element

			if (fileType.includes('pdf')) {
				icon = <Image src={'/icons/pdf.svg'} alt={t('pdfIconAlt')} width={20} height={20} />
			} else if (fileType.includes('image')) {
				icon = <Icon icon='PhotographIcon' className='text-green-400' />
			} else if (fileType.includes('application')) {
				icon = <Icon icon='DocumentTextIcon' className='text-blue-600' />
			} else {
				icon = <Icon icon='PaperClipIcon' />
			}

			return <div className='h-6 w-6 flex justify-center items-center'>{icon}</div>
		},
		[t]
	)

	const documentComponents = useMemo(
		() =>
			documents.map((document: Document) => {
				const prismaDate = new Date(document.insertedAt)
				const date = `${
					prismaDate.getMonth() + 1
				}/${prismaDate.getDate()}/${prismaDate.getFullYear()}`
				return {
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

	return (
		<div className={cn('max-h-64 overflow-y-auto', className)} data-testid={testId}>
			<List
				columns={columns}
				data={documentComponents}
				sharedClassName='text-gray-500'
				isLoading={isLoading}
				concise
			/>
		</div>
	)
}
