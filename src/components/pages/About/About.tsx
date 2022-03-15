import { FlexContainer } from 'components/atoms/FlexContainer/FlexContainer'
import DefaultTemplate from 'components/templates/Default/Default'
import styles from 'styles/Home.module.css'

const About = () => {
	return (
		<DefaultTemplate title='About'>
			<FlexContainer>
				<h1 className={styles.title}>About Page</h1>
			</FlexContainer>
		</DefaultTemplate>
	)
}

export default About
