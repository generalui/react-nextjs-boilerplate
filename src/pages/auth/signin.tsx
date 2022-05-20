import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { getCsrfToken, getProviders, signIn } from 'next-auth/react'
import { SignIn } from 'components/pages/SignIn'

/**
 * SignIn page
 *
 * This page represents the route for path "/auth/sign-in"
 * The actual page is defined at components/pages/SignIn/SignIn
 *
 */

export default SignIn

export const getServerSideProps: GetServerSideProps = async (context) => {
	const providers = await getProviders()
	console.log('~ providers', providers)
	const csrfToken = await getCsrfToken(context)
	return {
		props: {
			providers,
			csrfToken
		}
	}
}
