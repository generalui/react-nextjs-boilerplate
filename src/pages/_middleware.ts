import { withAuth } from 'next-auth/middleware'

export default withAuth({
	callbacks: {
		authorized: ({ req, token }) => {
			if (req.url.startsWith(`${process.env.BASE_URL}/images/`)) {
				return true
			}
			return token ? true : false
		}
	},
	pages: {
		signIn: '/auth/signin'
	}
})
