import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import cn from 'classnames'
import { useAuthContext } from '../../../../context/AuthContext'
import { useFormErrors } from '../../../../hooks/useFormErrors'
import { useComments } from '../../../../hooks/services/useComments'
import { Textarea } from '../Textarea/Textarea'
import { Button } from '../../UI/Buttons/Button/Button'
import s from './reply-form.module.scss'

const authFormValidationSchema = {
	textarea: [
		{ type: 'required', pattern: /^(?!\s*$).+/, text: 'Comment should be filled.' },
		{
			type: 'text',
			pattern: /^[a-zA-z0-9" "]+$/g,
			text: 'Comment should valid.',
		},
		{
			type: 'length',
			pattern: 100,
			text: 'Comment should be maximun 100 characters length.',
		},
	],
}

// action: 'create' (create new entity) | 'update' (updates comments array)
// type: 'short'
export const ReplyForm = ({ nestedLvl, type, action }) => {
	const { slug } = useParams()
	const { create, update } = useComments()
	const [commentError, setCommentError] = useState(null)
	const { user } = useAuthContext()
	const initialFormState = {
		textarea: '',
	}
	const [form, setForm] = useState(initialFormState)
	const { errors } = useFormErrors(form, authFormValidationSchema)

	const handleSubmit = (e) => {
		e.preventDefault()

		if (Object.keys(errors).length === 0) {
			const formData = {
				userId: user.id,
				text: form.textarea,
			}

			if (user && user.id && user.accessToken) {
				action === 'update' ? update(slug, formData, { nestedLvl }) : create(formData)
			} else {
				setCommentError(user)
			}
		}
	}

	const handleChange = (field) => (e) => {
		if (commentError) setCommentError(false)

		setForm({
			...form,
			[field]: e.target.value,
		})
	}

	return (
		<form className={cn(s.form, type && s[`form_${type}`])} onSubmit={handleSubmit}>
			<Textarea
				key='textarea'
				id='textarea'
				type='text'
				value={form['textarea']}
				label='Comment'
				handleChange={handleChange('textarea')}
				error={errors['textarea']}
				className={s.textarea}
			/>
			<div className={s.actions}>
				{commentError && <span className={cn(s.auth_error, commentError && s.active)}>{commentError.message}</span>}
				<Button htmlType='submit' type='auth' className={s.btn}>
					Post comment
				</Button>
			</div>
		</form>
	)
}
