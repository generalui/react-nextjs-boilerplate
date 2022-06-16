import cn from 'classnames'
import { signOut, useSession } from 'next-auth/react'
import { useState } from 'react'
import { useText } from 'hooks/useText'
import { Icon } from 'components/common/Icon'
import { SignInOutProps } from './SignInOut.types'

export const SignInOut = ({ testId = 'SignInOut', className }: SignInOutProps) => {
	const { t } = useText('common.userDropdown')
	const { data: session } = useSession()
	const label = session?.user?.name || t('signIn')
	const [isOpen, setIsOpen] = useState(false)

	const toggleOpen = () => setIsOpen(!isOpen)
	const close = () => setIsOpen(false)

	return (
		<div className={cn('z-50 w-64 relative', className)} data-testid={testId}>
			<button
				id='dropdownDefault'
				className='w-full text-blue-600 bg-blue-100 hover:bg-blue-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1 flex items-center justify-between'
				onClick={toggleOpen}
				onBlur={close}
				type='button'
			>
				<div className='truncate'>{label}</div>
				<Icon icon='ChevronDownIcon' />
			</button>
			<div
				className={cn('z-10 w-full bg-white divide-y divide-gray-100 rounded-lg shadow absolute', {
					hidden: !isOpen
				})}
			>
				<ul
					className='p-2 text-sm text-gray-700 flex flex-col items-center text-center gap-1'
					aria-labelledby='dropdownDefault'
				>
					<li className='w-full'>
						<button className='hover:bg-gray-100 py-2 w-full rounded-xl'>{t('profile')}</button>
					</li>
					<li className='w-full'>
						<button onClick={() => signOut} className='hover:bg-gray-100 py-2 w-full rounded-xl'>
							{t('logout')}
						</button>
					</li>
				</ul>
			</div>
		</div>
	)
}
