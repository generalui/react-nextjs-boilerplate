import styled from 'styled-components'

interface TextProps {
	center?: boolean
}

/**
 * This is an example component - not intended for production use
 */
export const Text = styled.span<TextProps>`
	text-align: ${(p) => (p.center ? 'center' : 'inherit')};
`
