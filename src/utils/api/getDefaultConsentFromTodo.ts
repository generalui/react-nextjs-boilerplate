import { ConsentEnum, Todo, TodoDataType } from '@prisma/client'

export const getDefaultConsentFromTodo = (todo: Partial<Todo>, dataType: string) => {
	const consentResult = todo?.dataTypes?.includes(dataType as TodoDataType)
		? ConsentEnum.yes
		: ConsentEnum.no

	return consentResult
}
