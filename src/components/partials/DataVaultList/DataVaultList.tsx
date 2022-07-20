import cn from 'classnames'
import { useStudy } from 'hooks/api/studies/useStudy'
import { useText } from 'hooks/useText'
import { List } from 'partials/List'
import { Column } from 'partials/List/List.types'
import { DataVaultListProps } from './DataVaultList.types'

export const DataVaultList = ({
	className,
	studyId,
	testId = 'DataVaultList'
}: DataVaultListProps) => {
	const { t } = useText('studies.dataVault')

	const { dataVault } = useStudy(studyId)

	const columns: Column[] = [
		{
			key: 'dataType',
			title: t('dataType'),
			width: 8
		},
		{
			key: '_count',
			title: t('files'),
			className: 'bg-gray-50 w-min px-4',
			width: 2
		},
		{
			key: '_max.inserted_at',
			title: t('modified'),
			width: 2,
			transformFunction: (value) => (value as Date).toLocaleDateString()
		}
	]

	return (
		<List
			className={cn('max-h-64 overflow-y-auto', className)}
			columns={columns}
			concise
			data={dataVault.data || []}
			emptyMessage={t('noDocuments')}
			isLoading={dataVault.isLoading}
			sharedClassName='text-gray-500'
			testId={testId}
		/>
	)
}
