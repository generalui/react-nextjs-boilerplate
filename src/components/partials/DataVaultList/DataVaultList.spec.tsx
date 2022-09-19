/**
 * Test file for DataVaultList
 */
import { render, screen } from '@testing-library/react'
import '__mocks__/index'
import React from 'react'
import { DataVaultList } from './index'

describe('DataVaultList Component', () => {
	it('renders on the page', () => {
		render(<DataVaultList studyId={''} title='' />)

		const component = screen.getByTestId('DataVaultList')

		expect(component).toBeInTheDocument()
	})
})
