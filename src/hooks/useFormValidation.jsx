import { useState, useEffect } from 'react'

/**
 * Custom hook for form validation
 * @param {Object} formValues - Current form values
 * @param {Object} validationSchema - Validation rules for each field
 * @param {Object} options - Additional options
 * @param {boolean} options.validateOnChange - Whether to validate on each change (default: true)
 * @returns {Object} Form validation state and methods
 */
export const useFormValidation = (formValues, validationSchema, options = {}) => {
	const { validateOnChange = true } = options

	const [errors, setErrors] = useState({})
	const [initialValues, setInitialValues] = useState(formValues)

	useEffect(() => {
		const keysMatch =
			Object.keys(initialValues).length === Object.keys(formValues).length &&
			Object.keys(initialValues).every((key) => Object.keys(formValues).includes(key))

		if (!keysMatch) {
			setInitialValues(formValues)
		}
	}, [formValues, initialValues])

	useEffect(() => {
		if (validateOnChange) {
			validateForm()
		}
	}, [formValues, validateOnChange])

	const validateField = (field) => {
		const value = formValues[field]
		const rules = validationSchema[field]

		if (!rules) return null

		for (const rule of rules) {
			const error = rule(value, formValues)
			if (error) return error
		}

		return null
	}

	const validateForm = () => {
		const newErrors = {}

		Object.keys(validationSchema).forEach((field) => {
			const error = validateField(field)
			if (error) newErrors[field] = error
		})

		setErrors(newErrors)
		return newErrors
	}

	const resetForm = () => {
		setErrors({})
	}

	const resetFieldError = (fieldName) => {
		setErrors((prevErrors) => {
			const newErrors = { ...prevErrors }
			delete newErrors[fieldName]
			return newErrors
		})
	}

	const isValid = (validateBeforeCheck = true) => {
		if (validateBeforeCheck) {
			const validationErrors = validateForm()
			return Object.keys(validationErrors).length === 0
		}
		return Object.keys(errors).length === 0
	}

	const getFieldError = (field) => {
		return errors[field] || null
	}

	return {
		errors,
		isValid,
		validateField,
		validateForm,
		getFieldError,
		resetForm,
		resetFieldError,
	}
}
