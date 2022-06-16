import { Spinner } from 'common/Spinner'
import { LoaderProps } from './Loader.types'

export const Loader = ({ children, fallback = Spinner, isLoading }: LoaderProps) => {
	return <>{isLoading ? fallback : children}</>
}
