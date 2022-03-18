import { FC } from 'react'
import styled from 'styled-components'

/**
 * This is an example styled component
 */
type FlexContainerProps = StyledFlexContainerProps & {
	/**
	 * Use the nested prop if the flex container is being used inside of another flex container
	 */
	nested?: boolean
}

interface StyledFlexContainerProps {
	className?: string
	margin?: string | number
	width?: string
	column?: boolean
	size?: 'sm' | 'md' | 'lg'
	justify?: 'start' | 'center' | 'space-between' | 'space-around' | 'space-evenly'
	align?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'
}

/**
 * This is an example component - not intended for production use
 */
export const StyledFlexContainer = styled.div<StyledFlexContainerProps>`
	flex: 1;
	display: flex;
	flex-direction: ${(p) => (p.column ? 'column' : 'row')};
	justify-content: ${(p) => p.justify || 'center'};
	align-items: ${(p) => p.align || 'center'};
	align-items: center;
	margin: ${(p) => p.margin || 'auto'}; // defaults to being centered
	width: ${(p) => p.width || '100%'};
	max-width: ${(p) => {
		switch (p.size) {
			case 'sm':
				return '500px'
			case 'md':
				return '900px'
			case 'lg':
				return '1200px'
			default:
				return 'inherit'
		}
	}};
`

const FlexContainerNestedWrapper = styled.div`
	width: 100%;
	height: 100%;
`

export const FlexContainer: FC<FlexContainerProps> = ({ nested, children, ...props }) => {
	return nested ? (
		<FlexContainerNestedWrapper>
			<StyledFlexContainer {...props}>{children}</StyledFlexContainer>
		</FlexContainerNestedWrapper>
	) : (
		<StyledFlexContainer {...props}>{children}</StyledFlexContainer>
	)
}
