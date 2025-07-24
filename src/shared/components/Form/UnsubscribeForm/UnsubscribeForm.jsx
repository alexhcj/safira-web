import { useState } from 'react'

import cn from 'classnames'

import { maxLength, minLength, pattern } from '@/utils'

import { useUnsubscribeContext } from '@context/UnsubscribeContext'

import { useEmailer } from '@hooks/services/useEmailer'
import { useFormValidation } from '@hooks/useFormValidation'

import { Preloader } from '@shared/components/common/Preloader/Preloader'
import { Textarea } from '@shared/components/Form/Textarea/Textarea'
import { Button } from '@shared/components/UI/Buttons/Button/Button'
import { Text } from '@shared/components/UI/Text/Text'

import s from './unsubscribe-form.module.scss'

const reasons = [
	'Too many emails',
	'Content not relevant to me',
	'Found better alternatives',
	'No longer interested in this topic',
	'Emails too frequent',
	'Content quality issues',
	'Other reason',
]

const feedbackFormValidationSchema = {
	feedback: [
		minLength(20, 'Review min length should be 20 characters and valid.'),
		maxLength(100, 'Review max length should be 100 characters and valid.'),
		pattern(/^[\w\s.,!?'"(){}[\]-]+$/, 'Review can only contain letters, numbers, spaces and basic punctuation.'),
	],
}

export const UnsubscribeForm = () => {
	const { sendFeedback, isLoading } = useEmailer()
	const { _, setUnsubscribeContext } = useUnsubscribeContext()
	const initialForm = {
		reason: '',
		feedback: '',
	}
	const [form, setForm] = useState(initialForm)
	const { isValid, getFieldError, resetFieldError } = useFormValidation(form, feedbackFormValidationSchema, {
		validateOnChange: false,
	})

	const handleChangeFeedback = (e) => {
		!isValid() && resetFieldError('feedback')
		setForm((prev) => ({ ...prev, feedback: e.target.value }))
	}

	const selectReason = (reason) => {
		setForm((prev) => ({ ...prev, reason: reason }))
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (isValid()) {
			const feedback = {
				unsubReason: form.reason,
				unsubFeedback: form.feedback,
			}

			const res = await sendFeedback(feedback)

			if (res && res.success) {
				setUnsubscribeContext((prev) => ({ ...prev, step: 2, feedback: true }))
			}
		}
	}

	const handleSkip = () => {
		setUnsubscribeContext((prev) => ({ ...prev, step: 2, feedback: false }))
	}

	return (
		<div className={s.box}>
			<p className={s.text}>We respect your choice. Before you head out, can you let us know why you unsubscribed?</p>
			<form onSubmit={handleSubmit}>
				<div className={s.list}>
					{reasons.map((reason) => (
						<button
							className={cn(s.reason, { [s.active]: form.reason === reason })}
							type='button'
							key={reason}
							onClick={() => selectReason(reason)}
						>
							{reason}
						</button>
					))}
				</div>
				{form.reason === 'Other reason' && (
					// TODO: add height animation (transition group)
					<Textarea
						className={s.textarea}
						id='feedback'
						name='feedback'
						type='text'
						value={form.feedback}
						placeholder='Help us understand what went wrong...'
						handleChange={handleChangeFeedback}
						error={getFieldError('feedback')}
					/>
				)}
				<div className={s.actions}>
					<Button className={s.button_send} type='profile' htmlType='submit'>
						{isLoading ? <Preloader width={20} height={20} /> : 'Send feedback'}
					</Button>
					<Button className={s.button_skip} type='secondary' onClick={handleSkip}>
						<Text className={s.button_skip_text} span>
							Skip
						</Text>
					</Button>
				</div>
			</form>
		</div>
	)
}
