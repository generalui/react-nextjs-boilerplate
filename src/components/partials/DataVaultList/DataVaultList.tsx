import { StudyDataType } from '@prisma/client'
import cn from 'classnames'
import { DataVaultListData } from 'types/Study'
import { formatDisplayDate } from 'utils/client/date'
import { useStudy } from 'hooks/api/studies/useStudy'
import { useText } from 'hooks/useText'
import { List } from 'partials/List'
import { Column } from 'partials/List/List.types'
import { DataTypeLabel } from 'common/DataTypeLabel'
import { DataVaultListProps } from './DataVaultList.types'

export const DataVaultList = ({
	action,
	className,
	iconProps = {
		icon: 'LockClosedIcon',
		wrapperClass: 'bg-red-400'
	},
	studyId,
	testId = 'DataVaultList',
	title
}: DataVaultListProps) => {
	const { t } = useText('studies.dataVault')
	const { t: dataTypes } = useText('studies.dataTypes')

	const { dataVault } = useStudy(studyId)

	const columns: Column<DataVaultListData>[] = [
		{
			key: 'dataType',
			title: t('dataType'),
			width: 8,
			transformFunction: (value) => (
				<DataTypeLabel
					dataType={value as string}
					img={`/icons/gray_${value}.svg`}
					className='gap-2 capitalize flex items-center'
				>
					{dataTypes(value as StudyDataType)}
				</DataTypeLabel>
			)
		},
		{
			key: '_count',
			title: t('files'),
			className: 'bg-gray-50 w-min px-4 rounded',
			width: 2
		},
		{
			key: '_max.insertedAt',
			title: t('modified'),
			width: 2,
			transformFunction: (value) => formatDisplayDate(value as Date)
		}
	]

	return (
		<List
			action={action}
			className={cn('max-h-64 overflow-y-auto', className)}
			columns={columns}
			concise
			data={(dataVault.data as DataVaultListData[]) || []}
			emptyMessage={t('noDocuments')}
			iconProps={iconProps}
			indexKey='dataType'
			isLoading={dataVault.isLoading}
			sharedClassName='text-gray-500'
			testId={testId}
			title={title}
		/>
	)
}
