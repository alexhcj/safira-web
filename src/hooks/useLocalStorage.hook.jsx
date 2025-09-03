import { useEffect, useRef, useState } from 'react'

export const useLocalStorage = (
	key,
	defaultValue = '',
	{ serialize = JSON.stringify, deserialize = JSON.parse } = {},
) => {
	const [state, setState] = useState(() => {
		try {
			const valueInLocalStorage = window.localStorage.getItem(key)

			if (valueInLocalStorage === null) {
				return typeof defaultValue === 'function' ? defaultValue() : defaultValue
			}

			return deserialize(valueInLocalStorage)
		} catch (error) {
			console.warn(`Failed to read localStorage key "${key}":`, error)
			return typeof defaultValue === 'function' ? defaultValue() : defaultValue
		}
	})

	const prevKeyRef = useRef(key)

	useEffect(() => {
		const prevKey = prevKeyRef.current
		if (prevKey !== key) {
			try {
				window.localStorage.removeItem(prevKey)
			} catch (error) {
				console.warn(`Failed to remove localStorage key "${prevKey}":`, error)
			}
		}

		prevKeyRef.current = key

		try {
			window.localStorage.setItem(key, serialize(state))
		} catch (error) {
			console.warn(`Failed to set localStorage key "${key}":`, error)
		}
	}, [key, state, serialize])

	return [state, setState]
}
