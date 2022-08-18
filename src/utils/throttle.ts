//initialize throttlePause variable outside throttle function
const throttlePauseMap: Record<string, boolean> = {}

export const throttle = (callback: () => void, time: number, throttleKey: string) => {
	if (throttlePauseMap[throttleKey]) return

	throttlePauseMap[throttleKey] = true

	setTimeout(() => {
		callback()

		throttlePauseMap[throttleKey] = false
	}, time)
}
