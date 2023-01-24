import { TodoStatus } from '@prisma/client'
import { useText } from 'hooks/useText'
import { StatusBadge } from 'partials/StatusBadge'
import { DropDown } from 'common/DropDown'
import { TodoStatusDropdownProps } from './TodoStatusDropdown.types'

export const TodoStatusDropdown = ({
	className,
	onChange,
	testId = 'TodoStatusDropdown',
	value
}: TodoStatusDropdownProps) => {
	const { t } = useText('todos.status')
	const createDropdownItem = (key: TodoStatus) => ({
		label: (
			<>
				<StatusBadge size='sm' v={key} /> {t(key).toUpperCase()}
			</>
		),
		onClick: () => onChange(key),
		value: key
	})

	return (
		<DropDown
			className={className}
			items={Object.values(TodoStatus).map(createDropdownItem)}
			testId={testId}
		>
			{createDropdownItem(value).label}
		</DropDown>
	)
}
