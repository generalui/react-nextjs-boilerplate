import { formatDisplayDate } from 'utils/client/date'
import { useText } from 'hooks/useText'
import { DataTypeContainer } from 'partials/DataTypeContainer'
import { EditTodo } from 'partials/EditTodo'
import { Card } from 'common/Card'
import { Detail } from 'common/Detail'
import { ImageWithPlaceholder } from 'common/ImageWithPlaceholder'
import { Loader } from 'common/Loader'
import { Text } from 'common/Text'
import { TodoInfoProps } from './TodoInfo.types'

export const TodoInfo = ({
	className,
	isAdmin,
	singleTodoId,
	loading,
	todo,
	testId = 'TodoInfo'
}: TodoInfoProps) => {
	const { t } = useText('todos.details')

	return (
		<div className={className} data-testid={testId}>
			<Card
				action={isAdmin && <EditTodo todoId={singleTodoId} disabled={loading} />}
				className='flex flex-col gap-6'
				iconProps={{ icon: 'DocumentChartBarIcon' }}
				title={t('title')}
			>
				<div className='flex flex-col lg:flex-row items-start lg:items-center gap-6'>
					<ImageWithPlaceholder src={todo?.image?.image?.url} className='h-52 w-52' />
					<div className='flex flex-col gap-3 justify-between lg:h-52 flex-grow w-full'>
						<div className='bg-gray-50 rounded px-4 py-2 flex-grow'>
							<Loader isLoading={loading}>
								<Text className='text-lg font-bold line-clamp-4 lg:line-clamp-none'>
									{todo?.title}
								</Text>
							</Loader>
						</div>
						<div className='flex flex-col lg:flex-row gap-4 justify-between'>
							<Detail label={t('coordinator')}>{todo?.users?.[0]?.user?.name}</Detail>
							<Detail label={t('submissionDate')}>
								{todo?.submissionDate ? formatDisplayDate(todo.submissionDate) : null}
							</Detail>
							<Detail label={t('endDate')}>
								{todo?.endDate ? formatDisplayDate(todo.endDate) : null}
							</Detail>
						</div>
					</div>
				</div>
				<Detail textColor='text-gray-500' label={t('description')}>
					{todo?.description}
				</Detail>
				{isAdmin && (
					<Detail label={t('dataTypes')}>
						<DataTypeContainer todo={todo} />
					</Detail>
				)}
			</Card>
		</div>
	)
}
