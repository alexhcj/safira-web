export const throttle = (fn, ms) => {
	let wait = false
	return function (...args) {
		if (!wait) {
			fn.apply(this, args) // preserve `this` and pass arguments
			wait = true
			setTimeout(() => {
				wait = false
			}, ms)
		}
	}
}
