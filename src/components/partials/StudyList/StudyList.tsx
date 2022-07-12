import Link from 'next/link'
import { ReactNode } from 'react'
import { UseText, useText } from 'hooks/useText'
import { List } from 'partials/List'
import { Column } from 'partials/List/List.types'
import { StatusBadge } from 'partials/StatusBadge'
import { Text } from 'common/Text'
import { StudyListProps } from './StudyList.types'

type GetColumns = (concise?: boolean, t?: ReturnType<UseText>['t']) => Column[]

const getColumns: GetColumns = (concise, t) => {
	const image = {
		key: 'image',
		width: 1
	}
	const study = {
		key: 'title',
		className: 'font-bold text-sm text-gray-700 line-clamp-2',
		title: t?.('list.studyName')
	}
	const status = {
		key: 'status',
		title: t?.('list.status'),
		width: 1
	}
	const submissionDate = {
		key: 'submissionDate',
		title: t?.('list.submissionDate'),
		width: 2
	}
	if (concise)
		return [
			image,
			{
				...study,
				width: 8
			},
			status,
			submissionDate
		]
	else
		return [
			image,
			{
				...study,
				width: 5
			},
			{
				key: 'coordinator',
				className: 'text-base text-gray-900 font-semibold',
				title: t?.('list.coordinator'),
				width: 3
			},
			submissionDate,
			status
		]
}

const transformStudyToRow = (
	studies: StudyListProps['studies'],
	concise: StudyListProps['concise']
) =>
	studies.map((study) => {
		const transformedStudy: {
			image: ReactNode
			title: ReactNode
			submissionDate: ReactNode
			status: ReactNode
			coordinator?: ReactNode
		} = {
			image: (
				<div
					style={{
						backgroundImage: `url(${
							study?.image?.image?.url || '/images/image_placeholder_centered.jpg'
						})`
					}}
					className='block h-16 w-16 bg-center bg-cover rounded-lg'
					role='img'
				/>
			),
			title: <Link href={`/studies/${study?.id}`}>{study?.title || 'Test'}</Link>,
			submissionDate: <Text v='subtitle'>{new Date(study?.endDate).toLocaleDateString()}</Text>,
			status: <StatusBadge v={study?.status} />
		}
		if (!concise)
			transformedStudy.coordinator = (
				<div className='flex flex-col'>
					{study?.users?.[0]?.user?.name}
					<Text v='subtitle'>{study?.users?.[0]?.user?.email}</Text>
				</div>
			)

		return transformedStudy
	})

export const StudyList = ({
	className,
	testId = 'StudyList',
	studies,
	isLoading,
	concise
}: StudyListProps) => {
	const { t } = useText('studies')
	const columns = getColumns(concise, t)
	const listData = transformStudyToRow(studies, concise)

	return (
		<List
			className={className}
			testId={testId}
			columns={columns}
			data={listData}
			isLoading={isLoading}
			concise={concise}
		/>
	)
}
