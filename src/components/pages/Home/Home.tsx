import { CardsMesh } from 'partials/CardsMesh'
import { PageWrapper } from 'partials/PageWrapper'
import { FlexContainer } from 'common/FlexContainer'
import { InlineCode } from 'common/InlineCode'
import { Text } from 'common/Text'

export const Home = () => {
	return (
		<PageWrapper>
			<FlexContainer column>
				<Text as='h1' center>
					Welcome to the{' '}
					<a
						rel='noreferrer'
						target='_blank'
						href='https://github.com/generalui/react-nextjs-boilerplate'
					>
						GenUI React Starter!
					</a>
				</Text>

				<Text as='p'>
					Get started by editing <InlineCode>pages/index.js</InlineCode>
				</Text>
				<CardsMesh />
			</FlexContainer>
		</PageWrapper>
	)
}
