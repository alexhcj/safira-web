export const throttle = (fn, ms) => {
	let wait = false
	return () => {
		if (!wait) {
			fn.call()
			wait = true
			setTimeout(() => {
				wait = false
			}, ms)
		}
	}
}
