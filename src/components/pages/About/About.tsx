import { Default as DefaultTemplate } from 'components/templates'
import styles from 'styles/Home.module.css'

export const About = () => {
	return (
		<DefaultTemplate title='About'>
			<h1 className={styles.title}>About Page</h1>
		</DefaultTemplate>
	)
}
