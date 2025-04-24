import { useRef, useState } from 'react'

import cn from 'classnames'
import { useParams } from 'react-router-dom'

import { reviewsAPI } from '@api/reviews'

import { useAuthContext } from '@context/AuthContext'

import { useFormValidation } from '@hooks/useFormValidation'

import { maxLength, minLength, pattern, required } from '@utils/validation/form'

import { NewRating } from '../../Rating/NewRating'
import { Button } from '../../UI/Buttons/Button/Button'
import { Space } from '../../UI/Spacing/Space'
import { Text } from '../../UI/Text/Text'
import { Textarea } from '../Textarea/Textarea'

import s from './new-review-form.module.scss'

const reviewFormValidationSchema = {
	rating: [required('Rating should be filled.'), pattern(/^[1-5]$/, 'Rating should be 1-5 numbers and valid.')],
	review: [
		minLength(30, 'Review min length should be 30 characters and valid.'),
		maxLength(100, 'Review max length should be 100 characters and valid.'),
		pattern(/^[\w\s.,!?'"(){}[\]-]+$/, 'Review can only contain letters, numbers, spaces and basic punctuation.'),
	],
}

export const NewReviewForm = () => {
	const ratingRef = useRef(null)
	const { user } = useAuthContext()
	const { slug } = useParams()
	const initialFormState = {
		rating: '0',
		review: '',
	}
	const [form, setForm] = useState(initialFormState)
	const { errors, isValid } = useFormValidation(form, reviewFormValidationSchema)

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (user && isValid()) {
			const formData = {
				rating: form.rating,
				text: form.review,
				reviewProductSlug: slug,
			}

			await reviewsAPI.create(formData)
		}

		setForm({ rating: '0', review: '' })
		handleResetRating()
	}

	const handleChange = (field) => (e) => {
		setForm({
			...form,
			[field]: e.target.value,
		})
	}

	const handleResetRating = () => {
		ratingRef.current.resetRating()
	}

	const handleSelectRating = (rating) => {
		setForm({ ...form, rating: rating })
	}

	return (
		<div className={s.box}>
			<h4 className={s.title}>Add a review</h4>
			<Text className={s.text}>Select rating and describe your filling about product</Text>
			<Space space={20} />
			<Text span className={cn(s.rating_text, s.required)}>
				Your rating
			</Text>
			<Space space={8} />
			<NewRating ref={ratingRef} onClick={handleSelectRating} />
			<Space space={20} />
			<form className={s.form} onSubmit={handleSubmit}>
				<Textarea
					className={s.textarea}
					key='review'
					id='review'
					type='text'
					value={form['review']}
					label='Review'
					handleChange={handleChange('review')}
					error={errors['review']}
					required
				/>
				<Button htmlType='submit' type='form'>
					<Text span color='white' className={s.btn_auth_text}>
						Submit
					</Text>
				</Button>
			</form>
		</div>
	)
}
