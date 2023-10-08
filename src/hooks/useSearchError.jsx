import { useEffect, useMemo, useState } from 'react'

const searchErrorTypes = [
	{ id: 1, type: 'empty', text: 'Enter product or select from list.' },
	{ id: 2, type: 'text', text: 'Use only upper and lower case characters.' },
	{ id: 3, type: 'length', text: 'Maximum characters are 30.' },
	{ id: 4, type: 'noresult', text: 'Nothing has found on this search. Please try to find something else.' },
]

export const useSearchError = (search, dataLength, inputFocused, inputTouched) => {
	const [error, setError] = useState(null)
	const isError = useMemo(() => inputFocused && inputTouched && error, [inputFocused, inputTouched, error])

	useEffect(() => {
		switch (!!search) {
			case !search:
				setError(searchErrorTypes[0])
				break
			case !search.match('^[a-zA-Z ]*$'):
				setError(searchErrorTypes[1])
				break
			case search.length > 30:
				setError(searchErrorTypes[2])
				break
			case !!search && dataLength === 0:
				setError(searchErrorTypes[3])
				break
			default:
				setError(null)
		}
	}, [search, dataLength])

	return { searchError: isError ? error : null }
}
