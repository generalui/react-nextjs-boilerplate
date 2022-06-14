import { ListProps } from './List.types'

const sharedClasses = 'grid grid-cols-12 gap-20 px-6'

export const List = <DataType extends { name: string }>({
	columns,
	data,
	className,
	testId = 'List'
}: ListProps<DataType>) => {
	return (
		<div
			className={`relative overflow-x-auto gap-4 flex flex-col ${className}`}
			data-testid={testId}
		>
			<div className={`${sharedClasses} font-semibold text-black text-xs`}>
				{columns.map((column) => (
					<div className={column.className} key={column.title}>
						{column.title}
					</div>
				))}
			</div>
			{data.map((item) => (
				<div className={`${sharedClasses} p-6 bg-white rounded-2xl items-center`} key={item.name}>
					{columns.map((column) => {
						const contents = item[column.key]
						const classArray = Array.isArray(column.contentClassName)
							? column.contentClassName
							: [column.contentClassName]

						return (
							<div
								className={`line-clamp-2 ${column.className}`}
								key={`${item.name}-${column.title}`}
							>
								{Array.isArray(contents)
									? contents.map((contentLevel, index) => (
											<div key={contentLevel} className={classArray[index] || ''}>
												{contentLevel}
											</div>
									  ))
									: contents}
							</div>
						)
					})}
				</div>
			))}
		</div>
	)
}
