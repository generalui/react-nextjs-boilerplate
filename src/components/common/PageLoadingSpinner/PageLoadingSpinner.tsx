import React from 'react'
import { RingLoader } from 'react-spinners'
import styled from 'styled-components'

const PageLoadingSpinnerContainer = styled.div`
	width: 100%;
	height: 100%;
	/* TODO: replace with flex container component */
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`

/**
 * This is an example component - not intended for production use
 */
export const PageLoadingSpinner = () => {
	return (
		<PageLoadingSpinnerContainer>
			<RingLoader />
			<h4>This is an example loading spinner...</h4>
			<h4>The page is already loaded.</h4>
		</PageLoadingSpinnerContainer>
	)
}
