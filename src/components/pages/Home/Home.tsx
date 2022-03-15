import Link from 'next/link'
import { CardLink } from 'components/atoms/CardLink'
import DefaultTemplate from 'components/templates/Default/Default'
import styles from 'styles/Home.module.css'

const Home = () => {
	return (
		<DefaultTemplate>
			<h1 className={styles.title}>
				Welcome to the{' '}
				<a
					rel='noreferrer'
					target='_blank'
					href='https://github.com/generalui/react-nextjs-boilerplate'
				>
					GenUI React Starter!
				</a>
			</h1>

			<p className={styles.description}>
				Get started by editing <code className={styles.code}>pages/index.js</code>
			</p>

			<div className={styles.grid}>
				<Link
					href='https://github.com/generalui/react-nextjs-boilerplate/blob/main/DEVELOPMENT.md'
					passHref
				>
					<CardLink rel='noreferrer' target='_blank'>
						<h2>Documentation &rarr;</h2>
						<p>Learn how to use this starter project to build robust apps.</p>
					</CardLink>
				</Link>

				<Link href='https://nextjs.org' passHref>
					<CardLink rel='noreferrer' target='_blank'>
						<h2>Next.js &rarr;</h2>
						<p>Learn more about Next.js features and API.</p>
					</CardLink>
				</Link>

				<Link
					href='https://github.com/generalui/react-nextjs-boilerplate/blob/main/DEVELOPMENT.md'
					passHref
				>
					<CardLink rel='noreferrer' target='_blank'>
						<h2>Contributing &rarr;</h2>
						<p>Discover how you can contribute to this project.</p>
					</CardLink>
				</Link>

				<Link href='/counter' passHref>
					<CardLink>
						<h2>Hooks for Redux &rarr;</h2>
						<p>An example of using hooks-for-redux and persisting to cookie storage.</p>
					</CardLink>
				</Link>
			</div>
		</DefaultTemplate>
	)
}

export default Home
