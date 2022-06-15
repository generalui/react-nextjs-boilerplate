import { prisma } from 'utils/api/prisma'
import { Studies } from 'components/pages/Studies'

/**
 * Studies page
 *
 * This page represents the route for path "/studies"
 * The actual page is defined at components/pages/Studies/Studies
 *
 */

export const getServerSideProps = async () => {
	const studies = await prisma.study.findMany({
		include: {
			owner: true
		}
	})

	// Pass data to the page via props
	return { props: { studies: JSON.parse(JSON.stringify(studies)) } }
}

export default Studies
