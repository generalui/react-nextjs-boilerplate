import { format } from 'date-fns'

export const formatFormDate = (date: Date) => format(date, 'yyyy-MM-dd')

export const formatDisplayDate = (dateString: string | Date = '') =>
	format(new Date(dateString), 'MM/dd/yyyy')
