import { StylesConfig } from 'react-select'
import { selectOptionsType } from 'types/index'

// TODO: restyle this component using scss
export const dataTypesStyles: StylesConfig<selectOptionsType, boolean> = {
	option: (base, { isFocused, isSelected }) => ({
		...base,
		backgroundColor: isFocused || isSelected ? '#f3f4f6' : undefined,
		borderRadius: '12px',
		padding: '4px 10px',
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
	multiValueLabel: (base) => ({ ...base, color: '#0093d8' }),
	multiValueRemove: (base) => ({
		...base,
		alignItems: 'center',
		backgroundColor: '#0093d8',
		borderRadius: '50%',
		height: '18px',
		width: '18px',
		color: '#d5f2ff',
		':hover': {
			cursor: 'pointer',
			backgroundColor: '#0772b0'
		},
		padding: 0,
		display: 'flex',
		justifyContent: 'center'
	}),
	input: (base) => ({
		...base,
		'> input': {
			':focus': {
				boxShadow: 'none'
			}
		}
	})
}
