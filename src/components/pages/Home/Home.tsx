import { CodeContainer } from 'components/atoms/CodeContainer/CodeContainer'
import { FlexContainer } from 'components/atoms/FlexContainer/FlexContainer'
import { H1 } from 'components/atoms/Headers/H1'
import { Paragraph } from 'components/atoms/Paragraph/Paragraph'
import CardsMesh from 'components/organisms/CardsMesh/CardsMesh'
import DefaultTemplate from 'components/templates/Default/Default'

const Home = () => {
	return (
		<DefaultTemplate>
			<FlexContainer>
				<H1>
					Welcome to <a href='https://nextjs.org'>Next.js!</a>
				</H1>

				<Paragraph>
					Get started by editing <CodeContainer>pages/index.js</CodeContainer>
				</Paragraph>

				<CardsMesh />
			</FlexContainer>
		</DefaultTemplate>
	)
}

export default Home