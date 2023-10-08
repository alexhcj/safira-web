import { useEffect, useState } from 'react'

export const useFormErrors = (form, errorsSchema) => {
	const [errors, setErrors] = useState({})

	const validateInput = (type, value, errorsSchema) => {
		return errorsSchema[type].find(({ pattern }) => !value.match(pattern))
	}

	const validateTextarea = (type, value, errorsSchema) => {
		return errorsSchema[type].find(({ pattern, type: patternType }) =>
			patternType === 'length' ? value.length > pattern : !value.match(pattern),
		)
	}

	const validateCheckbox = (type, value) => {
		return errorsSchema[type].find(({ pattern }) => pattern !== value)
	}

	const validatePasswordsEquality = (type, value, password) => {
		return errorsSchema[type].find(({ pattern }) => (!value ? pattern !== value : value !== password))
	}

	// const validateStrongPassword = (type, value, errorsSchema) => {
	// 	return errorsSchema[type].find(({ pattern }) => !value.match(pattern))
	// }

	useEffect(() => {
		let checkedErrors = {}

		Object.entries(form).forEach(([key, value]) => {
			let error

			switch (key) {
				case 'password':
					error = validateInput(key, value, errorsSchema)
					break
				case 'textarea':
					error = validateTextarea(key, value, errorsSchema)
					break
				case 'isPrivacyConfirmed':
					error = validateCheckbox(key, value)
					break
				case 'confirmPassword':
					error = validatePasswordsEquality(key, value, form['password'])
					break
				default:
					error = validateInput(key, value, errorsSchema)
					break
			}

			if (error) {
				checkedErrors[key] = { [error.type]: error.text }
			}
		})

		setErrors(checkedErrors)
	}, [form])

	return { errors }
}
