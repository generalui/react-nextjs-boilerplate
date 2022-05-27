import { withAuth } from 'next-auth/middleware'

export default withAuth({
	callbacks: {
		authorized: ({ req, token }) => {
			if (req.url.includes('/image')) {
				return true
			}
			return token ? true : false
		}
	},
	pages: {
		signIn: '/auth/signin'
	}
})
