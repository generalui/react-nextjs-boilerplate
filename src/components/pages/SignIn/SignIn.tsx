/*!
 * SignIn
 */
import { SignInResponse, signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import { SigninError } from 'types/Error'
import { Button } from 'components/common/Button'
import { Header } from 'partials/Header'
import { PageWrapper } from 'partials/PageWrapper'
import { SignInProps } from './SignIn.types'

const LOGIN_ERRORS: Record<string, string> = {
	CredentialsSignin: 'User name or password not valid.',
	UserAlreadyExists: 'User with this email already exists.',
	failedLogin: 'Failed to login.'
}

export const SignIn: FC<SignInProps> = ({ providers, csrfToken }) => {
	const { status } = useSession()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [loginErrors, setLoginErrors] = useState<SigninError[]>([])
	const router = useRouter()
	const { callbackUrl, error } = router.query

	useEffect(() => {
		if (status !== 'loading') {
			if (error) {
				if (Array.isArray(error)) {
					setLoginErrors(
						error.map((e) => ({
							id: e,
							message: LOGIN_ERRORS[e]
						}))
					)
				} else {
					setLoginErrors([
						{
							id: error,
							message: LOGIN_ERRORS[error]
						}
					])
				}
			}
		}
		if (status === 'authenticated' && callbackUrl) {
			router.push(callbackUrl as string)
		}
	}, [status, router, callbackUrl, error, setLoginErrors])

	return (
		<PageWrapper title='Sign in' hideAuth>
			<div style={{ overflow: 'hidden', position: 'relative' }} data-testid='SignIn'>
				<div>
					<div>
						{/* TODO: add logo */}
						<div>
							<input name='csrfToken' type='hidden' defaultValue={csrfToken} />
							<hr />
							{providers &&
								Object.values(providers).map((provider) => (
									<div key={provider.name} style={{ marginBottom: 0 }}>
										{provider.id === 'credentials' && (
											<>
												<input
													placeholder='Email'
													type='email'
													data-testid='signin-email'
													value={email}
													onChange={(e) => setEmail(e.target.value)}
												/>

												<input
													placeholder='Password'
													type='password'
													data-testid='signin-password'
													value={password}
													onChange={(e) => setPassword(e.target.value)}
												/>
											</>
										)}
										<Button onClick={() => signIn(provider.id, { email, password })}>
											Sign in with {provider.name}
										</Button>
										<Button
											onClick={async () => {
												const signInResponse: SignInResponse | undefined = await signIn(
													provider.id,
													{
														email,
														password,
														createAccount: true,
														redirect: false
													}
												)

												if (!signInResponse) {
													setLoginErrors([
														...loginErrors,
														{
															id: 'failedLogin',
															message: LOGIN_ERRORS['failedLogin']
														}
													])
												}

												const error = (signInResponse as unknown as SignInResponse)?.error as string

												if (error)
													setLoginErrors([
														...loginErrors,
														{
															id: error,
															message: LOGIN_ERRORS[error]
														}
													])

												console.log('~ signInResponse', signInResponse)
											}}
										>
											Create account
										</Button>
									</div>
								))}

							{loginErrors && loginErrors.map((err) => <div key={err.id}>{err.message}</div>)}
						</div>
					</div>
				</div>
			</div>
		</PageWrapper>
	)
}
