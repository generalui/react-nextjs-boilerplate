import { Text } from 'common/Text'
import { OrderedListProps } from './OrderedList.types'

export const OrderedList = ({ list, className, testId = 'OrderedList' }: OrderedListProps) => {
	return (
		<div className={className} data-testid={testId}>
			<ol>
				{list.map((item) => (
					<li key={item.step} className='flex flex-row'>
						{`${item.step}.`}
						&nbsp;
						<Text className={item.className}>{item.text}</Text>
					</li>
				))}
			</ol>
		</div>
	)
}
