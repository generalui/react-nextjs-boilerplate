import { PageWrapper } from 'partials/PageWrapper'
import { FlexContainer } from 'common/FlexContainer'
import { Text } from 'common/Text'

export const About = () => {
	return (
		<PageWrapper title='About'>
			<FlexContainer column>
				<Text as='h1'>About Page</Text>
			</FlexContainer>
		</PageWrapper>
	)
}
