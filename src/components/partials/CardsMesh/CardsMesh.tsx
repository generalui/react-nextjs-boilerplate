import { CardData, InfoCard } from 'common/InfoCard'
import { MeshContainer } from 'common/MeshContainer'

export const CardsMesh = () => {
	const cardData: CardData[] = [
		{
			href: 'https://github.com/generalui/react-nextjs-boilerplate/blob/main/DEVELOPMENT.md',
			title: 'Documentation',
			text: 'Learn how to use this starter project to build robust apps.',
			blankTarget: true
		},
		{
			href: 'https://nextjs.org/learn',
			title: 'Next.js',
			text: 'Learn more about Next.js features and API.',
			blankTarget: true
		},
		{
			href: 'https://github.com/generalui/react-nextjs-boilerplate/blob/main/CONTRIBUTING.md',
			title: 'Contributing',
			text: 'Discover how you can contribute to this project.',
			blankTarget: true
		},
		{
			href: '/counter',
			title: 'Hooks for Redux',
			text: 'An example of using hooks-for-redux and persisting to cookie storage.'
		}
	]
	return (
		<MeshContainer>
			{cardData && cardData.map((data) => <InfoCard {...data} key={data.href} />)}
		</MeshContainer>
	)
}
