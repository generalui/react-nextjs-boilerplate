import client from 'client.config'
import { StylesConfig } from 'react-select'
import { selectOptionsType } from 'types/index'

const defaultTextColor = client.tailwindTheme.extend.typography.DEFAULT.css.color

// TODO: restyle this component using scss
export const dataTypesStyles: StylesConfig<selectOptionsType, boolean> = {
	option: (base, { isFocused, isSelected }) => ({
		...base,
		color: isFocused ? defaultTextColor : isSelected ? defaultTextColor : defaultTextColor,
		backgroundColor: isFocused || isSelected ? '#f3f4f6' : undefined,
		borderRadius: '12px',
		padding: '4px 10px',
		height: '28px',
		cursor: 'pointer'
	}),
	control: (base) => ({
		...base,
		borderRadius: '8px'
	}),
	menu: (base) => ({
		...base,
		borderRadius: '8px'
	}),
	menuList: (base) => ({
		...base,
		padding: '8px 4px',
		display: 'flex',
		flexDirection: 'column',
		gap: '4px'
	}),
	valueContainer: (base, { isMulti }) => ({
		...base,
		display: !isMulti ? 'flex' : base.display
	}),
	singleValue: (base) => ({
		...base
	}),
	multiValue: (base) => ({
		...base,
		backgroundColor: '#d5f2ff',
		border: '1px solid #0093d8',
		padding: '4px 8px',
		borderRadius: '4px',
		alignItems: 'center',
		gap: '8px'
	}),
	multiValueLabel: (base) => ({ ...base, padding: 0, margin: 0, paddingLeft: 0, color: '#0093d8' }),
	multiValueRemove: (base) => ({
		...base,
		alignItems: 'center',
		backgroundColor: '#0093d8',
		borderRadius: '50%',
		height: '1rem',
		width: '1rem',
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
