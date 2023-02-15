import { QueryInputType } from 'types/QueryBuilder'
import { Filter } from 'types/QueryBuilder'

export const getSingleWhere = (filter?: Filter) => {
	let where = {}
	if (!filter || !filter.value) return where

	// TODO: refactor - the type should be a prop on filter
	if (filter.dataType === QueryInputType.date) {
		const value = new Date(filter.value)
		// @ts-expect-error TODO: Fix this type
		if (!(value instanceof Date && !isNaN(value))) {
			return
		}
		const nextDay = new Date(value.getTime())
		nextDay.setDate(nextDay.getDate() + 1)

		switch (filter.condition) {
			case 'equals':
				where = {
					[filter.field]: {
						lt: nextDay,
						gte: value
					}
				}
				break

			case 'not':
				where = {
					NOT: {
						[filter.field]: {
							lt: nextDay,
							gte: value
						}
					}
				}
				break

			case 'lt':
				where = {
					[filter.field]: {
						lt: value
					}
				}
				break

			case 'gt':
				where = {
					[filter.field]: {
						gt: value
					}
				}
				break
		}
	} else if (filter.dataType === QueryInputType.select) {
		switch (filter.condition) {
			case 'excludes':
				where = {
					NOT: {
						[filter.field]: {
							has: filter.value
						}
					}
				}
				break
			default:
				where = {
					[filter.field]: {
						[filter.condition]: filter.value
					}
				}
				break
		}
	} else {
		where = {
			[filter.field]: {
				[filter.condition]: filter.value,
				mode: 'insensitive' // Default value: default
			}
		}
	}

	return where
}
