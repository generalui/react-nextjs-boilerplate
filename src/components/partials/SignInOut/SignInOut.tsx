import cn from 'classnames'
import { Dropdown } from 'flowbite-react'
import { signOut, useSession } from 'next-auth/react'
import { useText } from 'hooks/useText'
import { SignInOutProps } from './SignInOut.types'

export const SignInOut = ({ testId = 'SignInOut', className }: SignInOutProps) => {
	const { t } = useText('common.userDropdown')
	const { data: session } = useSession()
	const label = session?.user?.name || t('signIn')

	return (
		<div className={cn('z-50', className)} data-testid={testId}>
			{/* TODO: replace Flowbite React Dropdown (not tab-able, not accessible) */}
			<Dropdown label={label} size='sm'>
				<Dropdown.Item>{t('profile')}</Dropdown.Item>
				<Dropdown.Item onClick={() => signOut()}>{t('logout')}</Dropdown.Item>
			</Dropdown>
		</div>
	)
}
