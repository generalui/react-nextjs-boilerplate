import { selectOptionsType } from 'types/index'

type DataTypesOptions = (t: (term: string) => string) => selectOptionsType[]

const dataTypes = ['consents', 'geneticData', 'healthRecords', 'specimens']

export const getDataTypes: DataTypesOptions = (t) =>
	dataTypes.map((dataType) => {
		return { label: t(`${dataType}.label`), value: dataType }
	})
