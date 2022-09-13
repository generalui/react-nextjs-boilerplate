import cn from 'classnames'
import { useText } from 'hooks/useText'
import { IconProps } from 'common/Icon/Icon.types'
import { DataTypeLabel } from '../../common/DataTypeLabel'
import { DataTypeContainerProps } from './DataTypeContainer.types'

export const DataTypeContainer = ({
	className,
	study,
	testId = 'DataTypeContainer'
}: DataTypeContainerProps) => {
	const { t: dataTypes } = useText('common.dataTypes')

	const upperCaseFirstLetter = (word: string) => `${word.slice(0, 1).toUpperCase()}${word.slice(1)}`

	const tags =
		study?.dataTypes?.sort().map((dataType) => ({
			label: dataTypes(`${dataType}.label`),
			icon: upperCaseFirstLetter(dataType) as IconProps['icon'],
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
					icon={icon}
					dataType={dataType}
				>
					{label}
				</DataTypeLabel>
			))}
		</div>
	)
}
