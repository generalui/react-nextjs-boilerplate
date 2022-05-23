import { signOut, useSession } from 'next-auth/react'
import { FC } from 'react'
import { StyledHeader } from './Header.styled'
import { HeaderProps } from './Header.types'

export const Header: FC<HeaderProps> = () => {
	const { data: session } = useSession()

	return (
		<StyledHeader data-testid='Header'>
			<div>
				<p className={`nojs-show `}>
					{session?.user && (
						<>
							{session.user.image && (
								<span style={{ backgroundImage: `url('${session.user.image}')` }} />
							)}
							<span>
								<small>Signed in as</small>
								<br />
								<strong>{session.user.email ?? session.user.name}</strong>
							</span>
							<a
								href={`/api/auth/signout`}
								onClick={(e) => {
									e.preventDefault()
									signOut()
								}}
							>
								Sign out
							</a>
						</>
					)}
				</p>
			</div>
		</StyledHeader>
	)
}
