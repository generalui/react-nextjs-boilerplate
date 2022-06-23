import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useCurrentUser } from 'hooks/api/users/useCurrentUser'
import { useText } from 'hooks/useText'
import { DropDown } from 'components/common/DropDown'
import { ProfileDropDownProps } from './ProfileDropDown.types'

export const ProfileDropDown = ({
	testId = 'ProfileDropDown',
	className
}: ProfileDropDownProps) => {
	const { t } = useText('common.userDropdown')
	const { currentUser } = useCurrentUser()
	const label = currentUser?.name || t('signIn')
	const { push } = useRouter()

	return (
		<DropDown
			className={className}
			items={[
				{
					children: t('profile'),
					onClick: () => {
						push('/profile')
					},
					value: 'profile'
				},
				{ children: t('logout'), onClick: () => signOut(), value: 'logout' }
			]}
			testId={testId}
			v='secondary'
		>
			{label}
		</DropDown>
	)
}
