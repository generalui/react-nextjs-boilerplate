import { memo } from 'react'
import { TestProps } from './Test.types'

export const Test = memo(function Test({ children, testId = 'Test' }: TestProps) {
	return <div data-testid={testId}>{children}</div>
})
