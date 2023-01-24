import { TodoStatus } from '@prisma/client'
import Link from 'next/link'
import { Todo } from 'types/Todo'
import { User } from 'types/User'
import { formatDisplayDate } from 'utils/client/date'
import { useCurrentUser } from 'hooks/api/users/useCurrentUser'
import { UseText, useText } from 'hooks/useText'
import { List } from 'partials/List'
import { Column } from 'partials/List/List.types'
import { StatusBadge } from 'partials/StatusBadge'
import { Text } from 'common/Text'
import { TodoListProps } from './TodoList.types'

const getColumns = (
	concise: boolean,
	isParticipant: boolean,
	t?: ReturnType<UseText>['t']
): Column<Todo>[] => {
	const image: Column<Todo> = {
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
	const todo: Column<Todo> = {
		key: 'title',
		className: 'font-bold text-sm text-gray-700 line-clamp-2',
		title: t?.('list.todoName'),
		width: 8,
		transformFunction: (title, todo) => (
			<Link href={`${isParticipant ? '/participant' : ''}/todos/${todo?.id}`}>
				{(title as string) || 'Test'}
			</Link>
		)
	}
	const status: Column<Todo> = {
		key: 'status',
		title: t?.('list.status'),
		width: 1,
		transformFunction: (status) => <StatusBadge v={(status as TodoStatus) || 'new'} />
	}
	const submissionDate: Column<Todo> = {
		key: 'submissionDate',
		title: t?.('list.submissionDate'),
		width: 2,
		transformFunction: (endDate) => <Text v='subtitle'>{formatDisplayDate(endDate as string)}</Text>
	}

	return concise
		? [image, todo, status, submissionDate]
		: [
				image,
				{
					...todo,
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

export const TodoList = ({
	action,
	className,
	concise = false,
	iconProps = {
		icon: 'DocumentChartBarIcon'
	},
	isLoading,
	todos,
	testId = 'TodoList',
	title
}: TodoListProps) => {
	const { t } = useText('todos')
	const { currentUser } = useCurrentUser()
	const isParticipant = currentUser?.role === 'participant'
	const columns = getColumns(concise, isParticipant, t)

	return (
		<List
			action={action}
			className={className}
			columns={columns}
			concise={concise}
			data={todos}
			iconProps={iconProps}
			indexKey='id'
			isLoading={isLoading}
			loadingClassName={concise ? 'p-12' : 'p-24'}
			testId={testId}
			title={title}
		/>
	)
}
