import { useState } from 'react'

import cn from 'classnames'
import { useParams } from 'react-router-dom'

import { useAuthContext } from '@context/AuthContext'
import { useErrorContext } from '@context/ErrorContext'

import { useComments } from '@hooks/services/useComments'
import { useFormValidation } from '@hooks/useFormValidation'

import { maxLength, minLength, pattern, required } from '@utils/validation/form'

import { Button } from '../../UI/Buttons/Button/Button'
import { Textarea } from '../Textarea/Textarea'

import s from './reply-form.module.scss'

const replyFormValidationSchema = {
	reply: [
		required('Comment should be filled.'),
		minLength(30, 'Comment should be minimum 30 characters length.'),
		maxLength(100, 'Comment should be maximum 100 characters length.'),
		pattern(/^[a-zA-Z0-9\s.,!?'"()]+$/g, 'Comment should contain letters, numbers, spaces and basic punctuation.'),
	],
}

/**
 * Form component for creating and updating comments/replies
 *
 * @param {number} nestedLvl - The nesting level of the reply in comments hierarchy
 * @param {string} type - Visual type of the form ('short' for compact version)
 * @param {string} action - Action to perform ('create' for new comment or 'update' to modify existing comments array)
 * @returns {JSX.Element} Reply form component
 */
export const ReplyForm = ({ nestedLvl = 0, type, action = 'create' }) => {
	const { user } = useAuthContext()
	const { isResponseValid, clearErrors } = useErrorContext()
	const { slug } = useParams()
	const { createComment, updateComment } = useComments()
	const initialFormState = {
		reply: '',
	}
	const [form, setForm] = useState(initialFormState)
	const { isValid, getFieldError, resetFieldError } = useFormValidation(form, replyFormValidationSchema, {
		validateOnChange: false,
	})

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (isValid()) {
			const formData = {
				text: form.reply,
			}

			if (user && user.id && user.accessToken) {
				if (action === 'update') {
					const res = await updateComment(slug, formData, { nestedLvl })

					if (res && res.success) {
						setForm(initialFormState)
					}
				}

				if (action === 'create') {
					const res = await createComment(slug, formData)

					if (res && res.success) {
						setForm(initialFormState)
					}
				}
			}
		}
	}

	const handleChange = (field) => (e) => {
		if (!isValid(false)) resetFieldError(field)
		if (!isResponseValid()) clearErrors()

		setForm({
			...form,
			[field]: e.target.value,
		})
	}

	return (
		<form className={cn(s.form, type && s[`form_${type}`])} onSubmit={handleSubmit}>
			<Textarea
				className={s.reply}
				key='reply'
				id='reply'
				type='text'
				value={form['reply']}
				label='Comment'
				handleChange={handleChange('reply')}
				error={getFieldError('reply')}
			/>
			<div>
				<Button htmlType='submit' type='auth' className={s.btn}>
					Post comment
				</Button>
			</div>
		</form>
	)
}
