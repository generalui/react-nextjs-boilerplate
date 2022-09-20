const timerMap: Record<string, NodeJS.Timeout> = {}

export const debounce = (callback: () => void, timeout = 300, throttleKey: string) => {
	return () => {
		clearTimeout(timerMap[throttleKey])
		timerMap[throttleKey] = setTimeout(() => {
			callback()
		}, timeout)
	}
}
