/*!
 * SignIn
 */
import { signInImage } from 'client.config'
import { SignInResponse, signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useMemo } from 'react'
import { SignInInput, SignInSchema } from 'types/Auth'
import { SignInError } from 'types/Error'
import { handleValidate } from 'utils/client/handleValidate'
import { useText } from 'hooks/useText'
import { Form } from 'partials/Form'
import { StagingWarning } from 'partials/StagingWarning'
import { AlertError } from 'common/AlertError'
import { Button } from 'common/Button'
import { Input } from 'common/Input'
import { SubmitButton } from 'common/SubmitButton'
import { SignInFormProps } from './SignInForm.types'

export const SignInForm = ({ className, testId = 'SignInForm' }: SignInFormProps) => {
	const { t } = useText('signIn.form')
	const { t: common } = useText('common')
	const { status } = useSession()
	const [loginErrors, setLoginErrors] = useState<SignInError[]>([])
	const router = useRouter()
	const { callbackUrl, error } = router.query
	const isLoading = status === 'loading'
	const LOGIN_ERRORS: Record<string, string> = useMemo(
		() => ({
			CredentialsSignin: t('errors.credentialsSignin'),
			UserAlreadyExists: t('errors.userAlreadyExists'),
			failedLogin: t('errors.failedLogin')
		}),
		[t]
	)

	useEffect(() => {
		if (!isLoading) {
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
	}, [status, router, callbackUrl, error, setLoginErrors, LOGIN_ERRORS, isLoading])

	const handleSignIn = async (values: SignInInput) => {
		const signInValues = await SignInSchema.parse(values)

		signIn('credentials', signInValues)
	}

	const createAccount = async ({ email, password }: SignInInput) => {
		const createAccountResponse: SignInResponse | undefined = await signIn('credentials', {
			email,
			password,
			createAccount: true,
			redirect: false
		})

		if (!createAccountResponse) {
			setLoginErrors([
				...loginErrors,
				{
					id: 'failedLogin',
					message: LOGIN_ERRORS['failedLogin']
				}
			])
		}

		const error = (createAccountResponse as unknown as SignInResponse)?.error as string

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
		<Form
			testId={testId}
			onSubmit={handleSignIn}
			className={className}
			validate={(values) => handleValidate(values, SignInSchema)}
			render={({ handleSubmit, values }) => (
				<form onSubmit={handleSubmit} className='flex flex-col space-y-10'>
					<img className='h-36 mx-auto ' src={signInImage} alt={common('pages.home')} />

					<StagingWarning className='' />

					<div className='flex flex-col gap-2'>
						<div>
							<label className='text-xs text-gray-500' htmlFor='coordinator'>
								{t('email.label')}
							</label>
							<Input name='email' type='text' placeholder={t('email.placeholder')} />
						</div>
						<div>
							<label className='text-xs text-gray-500' htmlFor='endDate'>
								{t('password.placeholder')}
							</label>
							<Input name='password' type='password' placeholder={t('password.placeholder')} />
						</div>
					</div>

					{loginErrors && loginErrors.length > 0 && (
						<div className='grid grid-cols-1 gap-4'>
							{loginErrors.map((err) => (
								<AlertError key={err.id}>{err.message}</AlertError>
							))}
						</div>
					)}

					<div className='flex flex-col gap-2'>
						<SubmitButton isLoading={isLoading} disableOnLoading>
							{t('buttons.submit')}
						</SubmitButton>

						{process.env.NEXT_PUBLIC_ENV === 'development' && (
							<div>
								<p className='text-muted'>{'This is only visible in development'}</p>
								<Button className='w-full' onClick={() => createAccount(values)}>
									{t('buttons.createAccount')}
								</Button>
							</div>
						)}
					</div>
				</form>
			)}
		/>
	)
}
