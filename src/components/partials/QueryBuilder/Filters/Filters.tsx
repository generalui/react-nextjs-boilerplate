import { FormSpy } from 'react-final-form'
import { debounce } from 'utils/debounce'
import { useText } from 'hooks/useText'
import { Form } from 'partials/Form'
import { Condition } from 'partials/QueryBuilder/Condition'
import { Card } from 'common/Card'
import { FiltersProps } from './Filters.types'

export const Filters = ({ className, fields, conditions, testId = 'Filters' }: FiltersProps) => {
	const { t } = useText('common.queryBuilder.filters')

	const onSubmit = (conditions: any) => {
		console.log('conditions: ', conditions)
	}

	return (
		<div className={className} data-testid={testId}>
			<Card
				iconProps={{ icon: 'DocumentReportIcon' }}
				title={t('title')}
				headerClassName='pb-4 border-b mb-0'
			>
				<Form
					onSubmit={onSubmit}
					render={({ handleSubmit }) => (
						<form onSubmit={handleSubmit}>
							<Condition fields={fields} conditions={conditions} />
							<FormSpy
								onChange={(props) => {
									debounce(() => onSubmit(props.values), 1000, 'filters')()
								}}
							/>
						</form>
					)}
				/>
			</Card>
		</div>
	)
}
