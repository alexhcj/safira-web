import { useEffect, useState } from 'react'

export const useLocalStorage = (key, fallbackState) => {
	const [value, setValue] = useState(
		JSON.parse(localStorage.getItem(key)) ?? fallbackState
	)

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value))
	}, [value, setValue, key])

	return [value, setValue]
}
