import { StylesConfig } from 'react-select'
import { selectOptionsType } from 'types/index'

export const selectStyles: StylesConfig<selectOptionsType, true> = {
	option: (base, { isFocused, isSelected }) => ({
		...base,
		backgroundColor: isFocused || isSelected ? '#f3f4f6' : undefined,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		padding: '4px 10px',
		gap: '6px',
		height: '28px',
		cursor: 'pointer'
	}),
	multiValue: (base) => ({
		...base,
		backgroundColor: '#d5f2ff',
		border: '1px solid #0093d8',
		padding: '0px 8px',
		borderRadius: '4px',
		alignItems: 'center'
	}),
	multiValueRemove: (base) => ({
		...base,
		alignItems: 'center',
		backgroundColor: '#0093d8',
		borderRadius: '8px',
		height: '16px',
		width: '16px',
		color: '#d5f2ff',
		':hover': {
			cursor: 'pointer'
		}
	})
}
