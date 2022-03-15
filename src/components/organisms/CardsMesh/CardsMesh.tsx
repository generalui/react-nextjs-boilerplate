import { MeshContainer } from 'components/atoms/MeshContainer/MeshContainer'
import InfoCard, { CardData } from 'components/molecules/InfoCard/InfoCard'

const CardsMesh = () => {
	const cardData: CardData[] = [
		{
			href: 'https://nextjs.org/docs',
			title: 'Documentation',
			text: 'Find in-depth information about Next.js features and API.'
		},
		{
			href: 'https://nextjs.org/learn',
			title: 'Learn',
			text: 'Learn about Next.js in an interactive course with quizzes!'
		},
		{
			href: 'https://github.com/vercel/next.js/tree/canary/examples',
			title: 'Examples',
			text: 'Discover and deploy boilerplate example Next.js projects.'
		},
		{
			href: 'https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app',
			title: 'Deploy',
			text: 'Instantly deploy your Next.js site to a public URL with Vercel.'
		}
	]
	return (
		<MeshContainer>
			{cardData && cardData.map((data) => <InfoCard {...data} key={data.href} />)}
		</MeshContainer>
	)
}

export default CardsMesh
