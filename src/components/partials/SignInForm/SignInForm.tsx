/*!
 * SignIn
 */
import { SignInResponse, signIn, useSession } from 'next-auth/react'
import { ClientSafeProvider } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useMemo } from 'react'
import { SigninError } from 'types/Error'
import { useText } from 'hooks/useText'
import { AlertError } from 'common/AlertError'
import { Button } from 'common/Button'
import { InputV1 } from 'common/Input/InputV1'
import { SignInFormProps } from './SignInForm.types'

export const SignInForm = ({
	providers,
	csrfToken,
	className,
	testId = 'SignInForm'
}: SignInFormProps) => {
	const { t } = useText('signIn.form')
	const { status } = useSession()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [loginErrors, setLoginErrors] = useState<SigninError[]>([])
	const router = useRouter()
	const { callbackUrl, error } = router.query

	const LOGIN_ERRORS: Record<string, string> = useMemo(
		() => ({
			CredentialsSignin: t('errors.credentialsSignin'),
			UserAlreadyExists: t('errors.userAlreadyExists'),
			failedLogin: t('errors.failedLogin')
		}),
		[t]
	)

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
		if (status === 'authenticated') {
			const redirectUrl = callbackUrl || '/'
			router.push(redirectUrl as string)
		}
	}, [status, router, callbackUrl, error, setLoginErrors, LOGIN_ERRORS])

	const createAccount = async (provider: ClientSafeProvider) => {
		const signInResponse: SignInResponse | undefined = await signIn(provider.id, {
			email,
			password,
			createAccount: true,
			redirect: false
		})

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
	}

	return (
		<div data-testid={testId} className={className}>
			<div style={{ overflow: 'hidden', position: 'relative' }} data-testid='SignIn'>
				<div>
					{/* TODO: add logo */}
					<img className='h-36 mx-auto' src='/images/NBDC_logo_full.svg' alt='NBDC Logo' />

					<div>
						<input name='csrfToken' type='hidden' defaultValue={csrfToken} />
						{Object.values(providers).length &&
							Object.values(providers).map((provider) => (
								<div
									className='grid grid-cols-1 gap-6'
									key={provider.name}
									style={{ marginBottom: 0 }}
								>
									{provider.id === 'credentials' && (
										<div className='mb-5'>
											<label className='label' htmlFor='email'>
												{t('email.label')}
											</label>
											<InputV1
												id='email'
												className='w-full mb-2'
												type='email'
												data-testid='signin-email'
												value={email}
												placeholder={t('email.placeholder')}
												onChange={(e) => setEmail(e.target.value)}
											/>
											<label className='label' htmlFor='password'>
												{t('password.label')}
											</label>

											<InputV1
												className='w-full mb-2'
												id='password'
												type='password'
												data-testid='signin-password'
												value={password}
												placeholder={t('password.placeholder')}
												onChange={(e) => setPassword(e.target.value)}
											/>
										</div>
									)}
									<div className='grid grid-cols-1 gap-4'>
										{loginErrors &&
											loginErrors.map((err) => <AlertError key={err.id}>{err.message}</AlertError>)}
									</div>

									<div className='grid grid-cols-1 gap-4'>
										<Button
											className='w-full'
											onClick={() => signIn(provider.id, { email, password })}
										>
											{t('signIn')}
										</Button>
										{process.env.NEXT_PUBLIC_ENV === 'development' && (
											<div>
												<p className='text-muted'>{'This is only visible in development'}</p>
												<Button className='w-full' onClick={() => createAccount(provider)}>
													{t('createAccount')}
												</Button>
											</div>
										)}
									</div>
								</div>
							))}
					</div>
				</div>
			</div>
		</div>
	)
}
