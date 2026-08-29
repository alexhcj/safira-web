import { useCallback, useEffect, useRef, useState } from 'react'

import cn from 'classnames'
import { useParams } from 'react-router-dom'

import { useAuthStateContext } from '@context/AuthContext'
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
		pattern(/^[a-zA-Z0-9\s.,!?'"()]+$/, 'Comment should contain letters, numbers, spaces and basic punctuation.'),
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
	const { isAuthenticated } = useAuthStateContext()
	const { isResponseValid, clearErrors } = useErrorContext()
	const { slug } = useParams()
	const { createComment, updateComment, isLoading } = useComments()
	const textareaRef = useRef(null)
	const initialFormState = {
		reply: '',
	}
	const [form, setForm] = useState(initialFormState)
	const { isValid, getFieldError, resetFieldError, resetForm } = useFormValidation(form, replyFormValidationSchema, {
		validateOnChange: false,
	})

	useEffect(() => {
		if (type === 'short' && textareaRef.current) {
			if (form.reply === '') {
				textareaRef.current.style.height = 'auto' // collapse back
				textareaRef.current.style.height = '39px'
			} else {
				textareaRef.current.style.height = 'auto'
				textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 80) + 'px' // 80px = 5 rem
			}
		}
	}, [type, form.reply])

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (isValid()) {
			const formData = {
				text: form.reply,
			}

			if (isAuthenticated) {
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
					resetForm()

					setTimeout(() => {
						resetTextareaHeight()
					}, 0)

					// call success callback to hide reply form
					if (onReplySuccess) {
						onReplySuccess()
					}
				}
			}
		}
	}

	const handleChange = (field) => (e) => {
		resetFieldError(field)
		if (!isResponseValid()) clearErrors()

		setForm({
			...form,
			[field]: e.target.value,
		})
	}

	const resetTextareaHeight = useCallback(() => {
		if (textareaRef.current) {
			textareaRef.current.style.height = 'auto'

			if (type === 'short') {
				textareaRef.current.style.height = '39px'
			} else {
				textareaRef.current.style.height = '170px'
			}
		}
	}, [type])

	return (
		<form className={cn(s.form, type && s[`form_${type}`])} onSubmit={handleSubmit}>
			<Textarea
				textareaRef={textareaRef}
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
			<Button htmlType='submit' type='auth' className={cn(s.btn, s[`btn_${type}`])} disabled={isLoading}>
				{isLoading ? <Preloader width={20} height={20} /> : action === 'create' ? 'Post comment' : 'Post reply'}
			</Button>
		</form>
	)
}
