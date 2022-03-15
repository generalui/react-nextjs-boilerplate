import { CardBody } from 'components/atoms/CardBody/CardBody'
import { CardContainer } from 'components/atoms/CardContainer/CardContainer'
import { CodeContainer } from 'components/atoms/CodeContainer/CodeContainer'
import { FlexContainer } from 'components/atoms/FlexContainer/FlexContainer'
import { H1 } from 'components/atoms/Headers/H1'
import { MeshContainer } from 'components/atoms/MeshContainer/MeshContainer'
import { Paragraph } from 'components/atoms/Paragraph/Paragraph'
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

				<MeshContainer>
					<CardContainer>
						<CardBody href='https://nextjs.org/docs'>
							<h2>Documentation &rarr;</h2>
							<p>Find in-depth information about Next.js features and API.</p>
						</CardBody>
					</CardContainer>

					<CardContainer>
						<CardBody href='https://nextjs.org/learn'>
							<h2>Learn &rarr;</h2>
							<p>Learn about Next.js in an interactive course with quizzes!</p>
						</CardBody>
					</CardContainer>

					<CardContainer>
						<CardBody href='https://github.com/vercel/next.js/tree/canary/examples'>
							<h2>Examples &rarr;</h2>
							<p>Discover and deploy boilerplate example Next.js projects.</p>
						</CardBody>
					</CardContainer>

					<CardContainer>
						<CardBody href='https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'>
							<h2>Deploy &rarr;</h2>
							<p>Instantly deploy your Next.js site to a public URL with Vercel.</p>
						</CardBody>
					</CardContainer>
				</MeshContainer>
			</FlexContainer>
		</DefaultTemplate>
	)
}

export default Home
