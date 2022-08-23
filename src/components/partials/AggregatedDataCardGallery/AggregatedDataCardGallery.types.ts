import { CommonProps } from 'types/CommonProps'
import { AggregatedDataCardProps } from 'partials/AggregatedDataCard/AggregatedDataCard.types'

export interface AggregatedDataCardGalleryProps extends CommonProps {
	aggregatedData: AggregatedDataCardProps[]
}
