import { withAuth } from 'next-auth/middleware'

export default withAuth({
	callbacks: {
		authorized: ({ req, token }) => (token ? true : false)
	},
	pages: {
		signIn: '/auth/signin'
	}
})
