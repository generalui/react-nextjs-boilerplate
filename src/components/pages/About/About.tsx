import { FlexContainer } from 'components/atoms/FlexContainer/FlexContainer'
import { H1 } from 'components/atoms/Headers/H1'
import { Default as DefaultTemplate } from 'components/templates'

export const About = () => {
	return (
		<DefaultTemplate title='About'>
			<FlexContainer>
				<H1>About Page</H1>
			</FlexContainer>
		</DefaultTemplate>
	)
}
