import { StudyStatus } from '@prisma/client'
import { useText } from 'hooks/useText'
import { StatusBadge } from 'partials/StatusBadge'
import { DropDown } from 'common/DropDown'
import { StudyStatusDropdownProps } from './StudyStatusDropdown.types'

export const StudyStatusDropdown = ({
	className,
	onChange,
	testId = 'StudyStatusDropdown',
	value
}: StudyStatusDropdownProps) => {
	const { t } = useText('studies.status')
	const createDropdownItem = (key: StudyStatus) => ({
		label: (
			<div className='flex items-center gap-3'>
				<StatusBadge size='sm' v={key} /> {t(key).toUpperCase()}
			</div>
		),
		onClick: () => onChange(key),
		value: key
	})

	return (
		<DropDown
			className={className}
			items={Object.values(StudyStatus).map(createDropdownItem)}
			testId={testId}
		>
			{createDropdownItem(value).label}
		</DropDown>
	)
}
