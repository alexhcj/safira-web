import React, { createContext, createRef, useCallback, useContext, useEffect, useRef, useState } from 'react'

const ErrorContext = createContext(undefined)

export const ErrorProvider = ({ children }) => {
	const [errors, setErrors] = useState([])
	const timeoutIdsRef = useRef({})
	const MAX_ERRORS = 3

	// Clean up timeouts when component unmounts
	useEffect(() => {
		return () => {
			Object.values(timeoutIdsRef.current).forEach((timeoutId) => {
				clearTimeout(timeoutId)
			})
		}
	}, [])

	const dismissError = useCallback((id) => {
		// Clear the timeout for this error
		if (timeoutIdsRef.current[id]) {
			clearTimeout(timeoutIdsRef.current[id])
			delete timeoutIdsRef.current[id]
		}

		// Remove the error from state
		setErrors((prev) => prev.filter((error) => error.id !== id))
	}, [])

	const addError = useCallback(
		(error) => {
			const errorId = Date.now().toString()

			const newError = {
				...error,
				id: errorId,
				timestamp: new Date().toISOString(),
				nodeRef: createRef(), // for CSSTransitions
			}

			// Set errors with proper array management
			setErrors((prev) => {
				// If we already have MAX_ERRORS, remove the oldest one
				if (prev.length >= MAX_ERRORS) {
					const oldestError = prev[0]

					// Clear its timeout
					if (timeoutIdsRef.current[oldestError.id]) {
						clearTimeout(timeoutIdsRef.current[oldestError.id])
						delete timeoutIdsRef.current[oldestError.id]
					}

					// Return new array with oldest removed and new one added
					return [...prev.slice(1), newError]
				}

				// Otherwise just add the new error to the existing array
				return [...prev, newError]
			})

			// Set an independent timeout for this error
			const timeoutId = setTimeout(() => {
				dismissError(errorId)
			}, 8000)

			// Store the timeout ID
			timeoutIdsRef.current[errorId] = timeoutId
		},
		[dismissError],
	)

	const clearErrors = () => {
		// Clear all timeouts before clearing errors
		Object.values(timeoutIdsRef.current).forEach((timeoutId) => {
			clearTimeout(timeoutId)
		})
		timeoutIdsRef.current = {}
		setErrors([])
	}

	const isResponseValid = useCallback(() => {
		return errors.length === 0
	}, [errors])

	return (
		<ErrorContext.Provider value={{ responseErrors: errors, addError, dismissError, clearErrors, isResponseValid }}>
			{children}
		</ErrorContext.Provider>
	)
}

export const useErrorContext = () => {
	const context = useContext(ErrorContext)
	if (!context) {
		throw new Error('useErrorContext must be used within an ErrorProvider')
	}
	return context
}
