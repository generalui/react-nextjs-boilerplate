import cn from 'classnames'
import { useText } from 'hooks/useText'
import { List } from 'partials/List'
import { Column } from 'partials/List/List.types'
import { DataVaultListProps } from './DataVaultList.types'

export const DataVaultList = ({
	className,
	data,
	isLoading,
	testId = 'DataVaultList'
}: DataVaultListProps) => {
	const { t } = useText('studies.dataVault')
	const columns: Column[] = [
		{
			key: 'dataType',
			title: t('dataType'),
			width: 8
		},
		{
			key: 'files',
			title: t('files'),
			className: 'background-gray-100',
			width: 2
		},
		{
			key: 'modified',
			title: t('modified'),
			width: 2
		}
	]

	return (
		<List
			className={cn('max-h-64 overflow-y-auto', className)}
			columns={columns}
			concise
			data={data}
			emptyMessage={t('noDocuments')}
			isLoading={isLoading}
			sharedClassName='text-gray-500'
			testId={testId}
		/>
	)
}
