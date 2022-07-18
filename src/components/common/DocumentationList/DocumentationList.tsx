import { useText } from 'hooks/useText'
import { List } from 'partials/List'
import { Column } from 'partials/List/List.types'
import { Icon } from 'common/Icon'
import { DocumentationListProps } from './DocumentationList.types'

export const DocumentationList = ({
	className,
	testId = 'DocumentationList'
}: DocumentationListProps) => {
	const { t } = useText('studies.documentation')
	const columns: Column[] = [
		{
			key: 'name',
			title: t('name'),
			width: 10
		},
		{
			key: 'date',
			title: t('modified'),
			width: 2
		}
	]

	const data = [
		{
			name: (
				<div className='flex gap-2'>
					<Icon icon='ArchiveIcon' />
					{'document 1'}
				</div>
			),
			date: '2/11/2022'
		},
		{
			name: (
				<div className='flex gap-2'>
					<Icon icon='ArchiveIcon' />
					{'document 2'}
				</div>
			),
			date: '2/11/2021'
		}
	]

	return (
		<div className={className} data-testid={testId}>
			<List
				columns={columns}
				data={data}
				className='flex justify-between'
				sharedClassName='text-gray-500'
				concise
			/>
		</div>
	)
}
