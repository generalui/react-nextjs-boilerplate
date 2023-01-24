import { useAggregatedTodoData } from 'hooks/api/aggregatedData/useAggregatedTodoData'
import { useTodos } from 'hooks/api/todos/useTodos'
import { useText } from 'hooks/useText'
import { AggregatedDataCardGallery } from 'partials/AggregatedDataCardGallery'
import { PageWrapper } from 'partials/PageWrapper'
import { TodoList } from 'partials/TodoList'
import { AdminWelcome } from 'common/WelcomeContent'

export const Home = () => {
	const { t } = useText('home')
	const { todos = [], isLoading } = useTodos({ page: 0, pageSize: 5 })

	const { data } = useAggregatedTodoData()
	const aggregatedData = [
		{
			dataClassName: 'text-accent-1',
			value: data?.totalTodos,
			dataType: 'currentTodos'
		},
		{
			dataClassName: 'text-accent-2',
			value: 0,
			dataType: 'assignedTodos'
		},
		{
			dataClassName: 'text-accent-3',
			value: data?.totalDocuments,
			dataType: 'documentation'
		}
	].map(({ dataType, ...passThrough }) => ({
		...passThrough,
		title: t(`${dataType}.title`),
		className: 'col-span-3 lg:col-span-1',
		key: dataType,
		subTitle: t(`${dataType}.subTitle`),
		description: t(`${dataType}.description`)
	}))

	return (
		<PageWrapper title={t('title')} withSpace={false}>
			{/* Client about info */}
			<AdminWelcome className='mb-12' />

			{/* Aggregated todo data */}
			<AggregatedDataCardGallery aggregatedData={aggregatedData} />

			{/* Divider */}
			<div className='border-b col-span-1 col-span-3 border-color-black-400 my-9' />

			{/* Recently added todos */}
			<TodoList
				className='w-full'
				concise
				isLoading={isLoading}
				todos={todos}
				title={t('recentlyAddedTodos.title')}
			/>
		</PageWrapper>
	)
}
