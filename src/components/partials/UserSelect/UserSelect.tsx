import { OptionProps } from 'react-select'
import { User, selectOptionsType } from 'types/index'
import { useUsers } from 'hooks/api/users/useUsers'
// import { ImageWithPlaceholder } from 'common/ImageWithPlaceholder'
import { SelectInput } from 'common/SelectInput'
import { UserSelectProps } from './UserSelect.types'

const Option = (props: OptionProps<selectOptionsType<User>>) => {
	const { className, cx, isDisabled, isFocused, isSelected, innerRef, innerProps, data } = props
	const { meta } = data

	if (!meta) {
		return null
	}

	const { name, email } = meta

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
				{/* TODO: validate optional placeholder with team */}
				{/* <ImageWithPlaceholder
					className='w-10 h-10 block mt-1 rounded-3xl'
					placeholder='/images/profile-image-placeholder.jpg'
					src={image?.image?.url}
					alt={name || undefined}
				/> */}
				{/* <div className='flex flex-col gap-2'> */}
				<span>{name}</span>
				<span>{email}</span>
				{/* </div> */}
			</div>
		</div>
	)
}

export const UserSelect = ({
	className,
	testId = 'UserSelect',
	labelClassName,
	label,
	placeholder,
	name
}: UserSelectProps<selectOptionsType<User>>) => {
	const { users } = useUsers()

	const selectOptions = users?.map((user) => ({
		value: user.id,
		label: user.email,
		meta: user
	}))

	return (
		<div data-testid={testId} className={className}>
			<SelectInput<selectOptionsType<User>>
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
