import { useState } from 'react'

import * as emailjs from '@emailjs/browser'
import cn from 'classnames'

import { convertISODate, maxLength, minLength, pattern, required } from '@/utils'

import { useFormValidation } from '@hooks/useFormValidation'

import { Preloader } from '@shared/components/common/Preloader/Preloader'
import { Input } from '@shared/components/Form/Input/Input'
import { Textarea } from '@shared/components/Form/Textarea/Textarea'
import { Button } from '@shared/components/UI/Buttons/Button/Button'
import { Text } from '@shared/components/UI/Text/Text'

import s from './contact-form.module.scss'

const contactFormValidationSchema = {
	name: [
		required('Name should be filled.'),
		minLength(2, 'Name should be at least 2 characters.'),
		maxLength(50, 'Name should be maximum 50 characters.'),
	],
	email: [
		required('Email should be filled.'),
		pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Email should be valid.'),
	],
	subject: [
		required('Subject should be filled.'),
		minLength(2, 'Subject should be at least 2 characters.'),
		maxLength(100, 'Subject should be maximum 100 characters.'),
	],
	message: [
		required('Message should be filled.'),
		minLength(10, 'Message should be at least 10 characters.'),
		maxLength(1000, 'Message should be maximum 1000 characters.'),
	],
}

export const ContactForm = () => {
	const [isLoading, setIsLoading] = useState(false)
	const initialFormState = {
		name: '',
		email: '',
		subject: '',
		message: '',
	}
	const [form, setForm] = useState(initialFormState)
	const { isValid, getFieldError, resetFieldError } = useFormValidation(form, contactFormValidationSchema, {
		validateOnChange: false,
	})

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (isValid()) {
			const formData = {
				name: form.name,
				email: form.email,
				subject: form.subject,
				message: form.message,
			}

			try {
				setIsLoading(true)

				await emailjs.send(
					import.meta.env.VITE_EMAILJS_SERVICE_ID,
					import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
					{
						name: formData.name,
						email: formData.email,
						message: formData.message,
						subject: formData.subject,
						date: convertISODate(new Date(), 'digit'),
					},
					import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
				)
				setForm(initialFormState)
			} catch (e) {
				setIsLoading(false)
			} finally {
				setIsLoading(false)
			}
		}
	}

	const handleChange = (field) => (e) => {
		!isValid() && resetFieldError(field)

		setForm({
			...form,
			[field]: e.target.value,
		})
	}

	return (
		<div>
			<h3 className={s.title}>Tell us your project</h3>
			<form onSubmit={handleSubmit}>
				<Input
					className={s.input}
					name='name'
					id='name'
					type='text'
					value={form['name']}
					placeholder='Name'
					label='Your name'
					handleChange={handleChange('name')}
					error={getFieldError('name')}
					required
				/>
				<Input
					className={s.input}
					name='email'
					id='email'
					type='text'
					value={form['email']}
					placeholder='Email'
					label='Your email'
					handleChange={handleChange('email')}
					error={getFieldError('email')}
					required
				/>
				<Input
					className={s.input}
					name='subject'
					id='subject'
					type='text'
					value={form['subject']}
					placeholder='Subject'
					label='Subject'
					handleChange={handleChange('subject')}
					error={getFieldError('subject')}
					required
				/>
				<Textarea
					className={cn(s.input, s.textarea)}
					id='message'
					name='message'
					label='Your message'
					value={form['message']}
					placeholder='Message'
					handleChange={handleChange('message')}
					error={getFieldError('message')}
					required
				/>
				<Button htmlType='submit' className={s.button}>
					{isLoading ? (
						<Preloader width={20} height={20} />
					) : (
						<Text span color='white'>
							Send
						</Text>
					)}
				</Button>
			</form>
		</div>
	)
}
