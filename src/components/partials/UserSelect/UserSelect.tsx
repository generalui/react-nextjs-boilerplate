import { OptionProps } from 'react-select'
import { SelectOptionsType, User } from 'types/index'
import { useUsers } from 'hooks/api/users/useUsers'
import { SelectInput } from 'common/SelectInput'
import { UserSelectProps } from './UserSelect.types'

type Meta = { user?: User; isHeader: boolean }

const Option = (props: OptionProps<SelectOptionsType<Meta>>) => {
	const { className, cx, isDisabled, isFocused, isSelected, innerRef, innerProps, data, label } =
		props
	const { meta } = data

	if (!meta) {
		return null
	}

	const { user, isHeader } = meta

	return (
		<div
			ref={innerRef}
			className={cx(
				{
					option: true,
					'option--is-disabled': isDisabled,
					'option--is-focused': isFocused,
					'option--is-selected': isSelected
				},
				className
			)}
			{...innerProps}
		>
			<div className='flex flex-col gap-1 h-max'>
				{isHeader ? (
					<span className='font-semibold'>{label}</span>
				) : (
					<>
						<span>{user?.role === 'admin' ? user?.name : user?.id}</span>
						<span>{user?.role === 'admin' && user?.email}</span>
					</>
				)}
			</div>
		</div>
	)
}

const getUsers: (userType: string, users?: User[]) => SelectOptionsType<Meta>[] | undefined = (
	userType,
	users
) => {
	if (!users) return undefined
	if (userType === 'all') {
		const participants = users
			?.filter((user) => {
				return user.role === 'participant'
			})
			.map((user) => ({
				value: user.id,
				label: user.id,
				meta: { user, isHeader: false }
			}))
		const admins = users
			.filter((user) => {
				return user.role === 'admin'
			})
			.map((user) => ({
				value: user.id,
				label: user.email,
				meta: { user, isHeader: false }
			}))
		return [
			{ label: 'Participants', value: 'Participants', meta: { isHeader: true } },
			...participants,
			{ label: 'Admins', value: 'Admins', meta: { isHeader: true } },
			...admins
		] as SelectOptionsType<Meta>[]
	} else {
		return users
			?.filter((user) => {
				return user.role === userType
			})
			.map(
				(user) =>
					({
						value: user.id,
						label: user.email,
						meta: { user }
					} as SelectOptionsType<Meta>)
			)
	}
}

export const UserSelect = ({
	className,
	testId = 'UserSelect',
	labelClassName,
	label,
	placeholder,
	name,
	userType = 'admin'
}: UserSelectProps<SelectOptionsType<User>>) => {
	const { users } = useUsers()

	const selectOptions = getUsers(userType, users)

	return (
		<div data-testid={testId} className={className}>
			<SelectInput<SelectOptionsType<Meta>>
				placeholder={placeholder}
				labelClassName={labelClassName}
				label={label}
				data-testid={testId}
				name={name}
				options={selectOptions}
				components={{ Option }}
			/>
		</div>
	)
}
