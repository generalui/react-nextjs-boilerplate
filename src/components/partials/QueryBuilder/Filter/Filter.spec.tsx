/**
 * Test file for Condition
 */
import { render, screen } from '@testing-library/react'
import '__mocks__/index'
import { Form } from 'partials/Form'
import { Filter } from 'partials/QueryBuilder/Filter'

describe('Condition Component', () => {
	it('renders on the page', () => {
		render(
			<Form
				onSubmit={() => {
					return
				}}
				render={({ handleSubmit }) => (
					<form onSubmit={handleSubmit}>
						<Filter
							fields={[]}
							conditions={[]}
							handleRemoveFilter={jest.fn}
							filterTypes={[]}
							filterKey='testFilterKey'
							updateFiltersArray={jest.fn}
						/>
					</form>
				)}
			/>
		)

		const component = screen.getByTestId('Filter')

		expect(component).toBeInTheDocument()
	})
})
