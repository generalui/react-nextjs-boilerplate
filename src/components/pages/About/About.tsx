import { Default as DefaultTemplate } from 'components/partials/PageWrapper'
import { FlexContainer } from 'common/FlexContainer'
import { Text } from 'common/Text'

export const About = () => {
	return (
		<DefaultTemplate title='About'>
			<FlexContainer column>
				<Text as='h1'>About Page</Text>
			</FlexContainer>
		</DefaultTemplate>
	)
}
