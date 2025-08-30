import { useState } from 'react'

import cn from 'classnames'
import { useParams } from 'react-router-dom'

import { useAuthContext } from '@context/AuthContext'
import { useErrorContext } from '@context/ErrorContext'

import { useComments } from '@hooks/services/useComments'
import { useFormValidation } from '@hooks/useFormValidation'

import { Preloader } from '@shared/components/common/Preloader/Preloader'

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
 * @param {string} nestedLvl - The nesting level path (e.g., "0", "0.1", "1.2.0")
 * @param {string} type - Visual type of the form ('short' for compact version)
 * @param {string} action - Action to perform ('create' for new root comment or 'update' for nested reply)
 * @param {function} onReplySuccess - Callback function called after successful reply submission
 * @returns {JSX.Element} Reply form component
 */
export const ReplyForm = ({ nestedLvl = null, type, action = 'create', onReplySuccess }) => {
	const { user } = useAuthContext()
	const { isResponseValid, clearErrors } = useErrorContext()
	const { slug } = useParams()
	const { createComment, updateComment, isLoading } = useComments()
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
				let res

				if (action === 'update' && nestedLvl !== null) {
					// adding reply to existing comment
					res = await updateComment(slug, formData, { nestedLvl })
				} else if (action === 'create') {
					// creating new root comment
					res = await createComment(slug, formData)
				}

				if (res && res.success) {
					setForm(initialFormState)
					// call success callback to hide reply form
					if (onReplySuccess) {
						onReplySuccess()
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
				id={`reply-${nestedLvl || 'root'}`}
				type='text'
				value={form.reply}
				label={action === 'create' ? 'Comment' : 'Reply'}
				handleChange={handleChange('reply')}
				error={getFieldError('reply')}
				placeholder={action === 'create' ? 'Share your thoughts...' : 'Write your reply...'}
			/>
			<div>
				<Button htmlType='submit' type='auth' className={s.btn} disabled={isLoading}>
					{isLoading ? <Preloader width={20} height={20} /> : action === 'create' ? 'Post comment' : 'Post reply'}
				</Button>
			</div>
		</form>
	)
}
