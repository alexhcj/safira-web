import { useEffect, useState } from 'react'

/**
 *
 * @param form
 * @param schema
 * @returns {{errors: {}, resetErrors: (function(): void), validateField: string, validateAll: (function(): Record<string, string|null>)}|*|null}
 */
export const useFormValidation = (form, schema) => {
	const [errors, setErrors] = useState({})

	const validateField = (field, value) => {
		const validators = schema[field]
		if (!validators) return null

		for (const validate of validators) {
			const error = validate(value, form)
			if (error) return error
		}
		return null
	}

	const validateAll = () => {
		const newErrors = {}

		for (const [field, value] of Object.entries(form)) {
			const error = validateField(field, value)
			if (error) newErrors[field] = error
		}
		setErrors(newErrors)
		return newErrors
	}

	const resetErrors = () => setErrors({})

	const isErrors = () => {
		return Object.keys(errors).length > 0
	}

	useEffect(() => {
		validateAll()
	}, [form])

	return {
		errors,
		resetErrors,
		validateField,
		validateAll,
		isErrors,
	}
}
