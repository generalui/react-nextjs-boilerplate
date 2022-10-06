import { withAuth } from 'next-auth/middleware'

export default withAuth({
	callbacks: {
		authorized: ({ req, token }) => !!token || new URL(req.url).pathname.startsWith('/images/')
	},
	pages: {
		signIn: '/auth/signin'
	}
})
