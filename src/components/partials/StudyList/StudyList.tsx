import { StudyStatus } from '@prisma/client'
import Link from 'next/link'
import { Study } from 'types/Study'
import { User } from 'types/User'
import { formatDisplayDate } from 'utils/client/date'
import { useCurrentUser } from 'hooks/api/users/useCurrentUser'
import { UseText, useText } from 'hooks/useText'
import { List } from 'partials/List'
import { Column } from 'partials/List/List.types'
import { StatusBadge } from 'partials/StatusBadge'
import { Text } from 'common/Text'
import { StudyListProps } from './StudyList.types'

const getColumns = (
	concise: boolean,
	isParticipant: boolean,
	t?: ReturnType<UseText>['t']
): Column<Study>[] => {
	const image: Column<Study> = {
		key: 'image',
		width: 1,
		transformFunction: (image) => (
			<div
				style={{
					backgroundImage: `url(${
						(image as { image?: { url: string } })?.image?.url ||
						'/images/image_placeholder_centered.jpg'
					})`
				}}
				className='block h-12 w-12 bg-center bg-cover rounded-lg'
				role='img'
			/>
		)
	}
	const study: Column<Study> = {
		key: 'title',
		className: 'font-bold text-sm text-gray-700 line-clamp-2',
		title: t?.('list.studyName'),
		width: 8,
		transformFunction: (title, study) => (
			<Link href={`${isParticipant ? '/participant' : ''}/studies/${study?.id}`}>
				{(title as string) || 'Test'}
			</Link>
		)
	}
	const status: Column<Study> = {
		key: 'status',
		title: t?.('list.status'),
		width: 1,
		transformFunction: (status) => <StatusBadge v={(status as StudyStatus) || 'new'} />
	}
	const submissionDate: Column<Study> = {
		key: 'submissionDate',
		title: t?.('list.submissionDate'),
		width: 2,
		transformFunction: (endDate) => <Text v='subtitle'>{formatDisplayDate(endDate as string)}</Text>
	}

	return concise
		? [image, study, status, submissionDate]
		: [
				image,
				{
					...study,
					width: 5
				},
				{
					key: 'users',
					className: 'text-base text-gray-900 font-semibold',
					title: t?.('list.coordinator'),
					width: 3,
					transformFunction: (users) => (
						<div className='flex flex-col'>
							{(users as { user: User }[])?.[0]?.user?.name}
							<Text v='subtitle'>{(users as { user: User }[])?.[0]?.user?.email}</Text>
						</div>
					)
				},
				submissionDate,
				status
		  ]
}

export const StudyList = ({
	action,
	className,
	concise = false,
	iconProps = {
		icon: 'DocumentChartBarIcon'
	},
	isLoading,
	studies,
	testId = 'StudyList',
	title
}: StudyListProps) => {
	const { t } = useText('studies')
	const { currentUser } = useCurrentUser()
	const isParticipant = currentUser?.role === 'participant'
	const columns = getColumns(concise, isParticipant, t)

	return (
		<List
			action={action}
			className={className}
			columns={columns}
			concise={concise}
			data={studies}
			iconProps={iconProps}
			indexKey='id'
			isLoading={isLoading}
			loadingClassName={concise ? 'p-12' : 'p-24'}
			testId={testId}
			title={title}
		/>
	)
}
