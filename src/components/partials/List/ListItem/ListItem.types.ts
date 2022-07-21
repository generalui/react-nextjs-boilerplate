import { CommonProps } from 'types/CommonProps'
import { ListData, ListProps } from 'partials/List/List.types'

export interface ListItemProps<DataType extends ListData> extends CommonProps {
	columns: ListProps<DataType>['columns']
	itemData: DataType
	concise?: boolean
}
