import { Text } from 'common/Text'
import { UnorderedListProps } from './UnorderedList.types'

export const UnorderedList = ({
	list,
	className,
	testId = 'UnorderedList'
}: UnorderedListProps) => {
	return (
		<div className={className} data-testid={testId}>
			<ul className='list-disc'>
				{list.map((item, i) => (
					<li key={i}>
						<Text className={item.className}>{item.text}</Text>
					</li>
				))}
			</ul>
		</div>
	)
}
