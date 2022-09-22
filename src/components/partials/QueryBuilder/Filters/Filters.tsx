import { FormSpy } from 'react-final-form'
import { ConditionInput, ConditionSchema } from 'types/QueryBuilder'
import { debounce } from 'utils/debounce'
import { useText } from 'hooks/useText'
import { Form } from 'partials/Form'
import { Condition } from 'partials/QueryBuilder/Condition'
import { Card } from 'common/Card'
import { FiltersProps } from './Filters.types'

export const Filters = ({
	className,
	fields,
	conditions,
	onFiltersChange,
	testId = 'Filters'
}: FiltersProps) => {
	const { t } = useText('common.queryBuilder.filters')

	const onSubmit = (conditions: ConditionInput) => {
		try {
			ConditionSchema.parse(conditions)
			onFiltersChange(conditions)
		} catch (error) {
			return
		}
	}

	return (
		<div className={className} data-testid={testId}>
			<Card
				iconProps={{ icon: 'DocumentChartBarIcon' }}
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
									debounce(() => onSubmit(props.values as ConditionInput), 1000, 'filters')()
								}}
							/>
						</form>
					)}
				/>
			</Card>
		</div>
	)
}
