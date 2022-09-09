import cn from 'classnames'
import { useText } from 'hooks/useText'
import { DataTypeLabel } from '../../common/DataTypeLabel'
import { DataTypeContainerProps } from './DataTypeContainer.types'

export const DataTypeContainer = ({
	className,
	study,
	testId = 'DataTypeContainer'
}: DataTypeContainerProps) => {
	const { t: dataTypes } = useText('common.dataTypes')

	const tags =
		study?.dataTypes?.sort().map((dataType) => ({
			label: dataTypes(`${dataType}.label`),
			icon: `/icons/${dataType}.svg`,
			dataType
		})) || []

	return (
		// Min hight added to compensate for empty state without tags
		<div
			className={cn(
				'border border-gray-300 p-4 rounded flex flex-wrap gap-4 min-h-[68px]',
				className
			)}
			data-testid={testId}
		>
			{tags?.map(({ icon, label, dataType }) => (
				<DataTypeLabel
					className='bg-secondary text-button-text-secondary border border-primary rounded p-1 pl-2 pr-2 flex gap-2 width-auto'
					key={label}
					img={icon as string}
					dataType={dataType}
				>
					{label}
				</DataTypeLabel>
			))}
		</div>
	)
}
