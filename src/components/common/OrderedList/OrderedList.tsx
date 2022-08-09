import { Text } from 'common/Text'
import { OrderedListProps } from './OrderedList.types'

export const OrderedList = ({ list, className, testId = 'OrderedList' }: OrderedListProps) => {
	return (
		<div className={className} data-testid={testId}>
			<ol>
				{list.map((item, i) => (
					<li key={i} className='flex flex-row'>
						{`${i + 1}.`}
						&nbsp;
						<Text className={item.className}>{item.text}</Text>
					</li>
				))}
			</ol>
		</div>
	)
}
