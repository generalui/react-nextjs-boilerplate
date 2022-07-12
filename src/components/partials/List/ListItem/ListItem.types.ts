import { CommonProps } from 'types/CommonProps'
import { ListProps } from 'partials/List/List.types'

// TODO: Refactor  ListProps<DataType>['data'][0] is not a good indicator - @Jase
export interface ListItemProps<DataType extends object> extends CommonProps {
	columns: ListProps<DataType>['columns']
	itemData: ListProps<DataType>['data'][0]
	concise?: boolean
}
