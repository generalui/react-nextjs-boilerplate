import { CommonProps } from 'types/CommonProps'
import { ListProps } from 'partials/List/List.types'

export interface ListItemProps<DataType extends object> extends CommonProps {
	columns: ListProps<DataType>['columns']
	itemData: ListProps<DataType>['data'][0]
}
