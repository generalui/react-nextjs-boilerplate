import { signOut, useSession } from 'next-auth/react'
import { useEffect, useRef, useState } from 'react'
import { useText } from 'hooks/useText'
import { DropDown } from 'components/common/DropDown'
import { SignInOutProps } from './SignInOut.types'

export const SignInOut = ({ testId = 'SignInOut', className }: SignInOutProps) => {
	const { t } = useText('common.userDropdown')
	const { data: session } = useSession()
	const label = session?.user?.name || t('signIn')

	return (
		<DropDown
			className={className}
			items={[
				{
					children: t('profile'),
					onClick: () => {
						// TODO: redirect to profile page
						console.log('Navigate to profile')
					}
				},
				{ children: t('logout'), onClick: () => signOut() }
			]}
			testId={testId}
			v='profile'
		>
			{label}
		</DropDown>
	)
}
