import { QueryCache, QueryClient } from 'react-query'
import { dispatchErrorToast } from 'utils/client/toast'

export const reactQueryClient = new QueryClient({
	queryCache: new QueryCache({
		onError: (err) => dispatchErrorToast((err as Error)?.message)
	})
})
