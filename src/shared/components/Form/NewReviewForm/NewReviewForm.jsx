import { useRef, useState } from 'react'

import cn from 'classnames'
import { useParams } from 'react-router-dom'

import { useAuthContext } from '@context/AuthContext'
import { useErrorContext } from '@context/ErrorContext'

import { useReviews } from '@hooks/services/useReviews'
import { useFormValidation } from '@hooks/useFormValidation'

import { Preloader } from '@shared/components/common/Preloader/Preloader'
import { ErrorPopover } from '@shared/components/UI/ErrorPopover/ErrorPopover'

import { maxLength, minLength, pattern, required } from '@utils/validation/form'

import { NewRating } from '../../Rating/NewRating'
import { Button } from '../../UI/Buttons/Button/Button'
import { Space } from '../../UI/Spacing/Space'
import { Text } from '../../UI/Text/Text'
import { Textarea } from '../Textarea/Textarea'

import s from './new-review-form.module.scss'

const reviewFormValidationSchema = {
	rating: [
		required('Rating should be filled.'),
		pattern(/^[1-5]$|^[0-4]\.5$/, 'Rating should be between 0.5-5 with 0.5 step and valid.'),
	],
	review: [
		required('Review should be filled.'),
		minLength(30, 'Review min length should be 30 characters and valid.'),
		maxLength(100, 'Review max length should be 100 characters and valid.'),
		pattern(/^[\w\s.,!?'"(){}[\]-]+$/, 'Review can only contain letters, numbers, spaces and basic punctuation.'),
	],
}

export const NewReviewForm = () => {
	const { isResponseValid, clearErrors } = useErrorContext()
	const { user } = useAuthContext()
	const { createReview, isLoading } = useReviews()
	const { slug } = useParams()
	const ratingRef = useRef(null)
	const initialFormState = {
		rating: 0,
		review: '',
	}
	const [form, setForm] = useState(initialFormState)
	const { isValid, getFieldError, resetFieldError } = useFormValidation(form, reviewFormValidationSchema, {
		validateOnChange: false,
	})

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (isValid()) {
			if (user) {
				const formData = {
					rating: form.rating,
					text: form.review,
					reviewProductSlug: slug,
				}

				const res = await createReview(formData)

				if (res && res.success) {
					setForm(initialFormState)
					handleResetRating()
				}
			}
		}
	}

	const handleChange = (field) => (e) => {
		!isValid() && resetFieldError(field)
		!isResponseValid() && clearErrors()

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
			<div className={s.rating}>
				<Text span className={cn(s.rating_text, s.required)}>
					Your rating
				</Text>
				<Space space={8} />
				<NewRating ref={ratingRef} onClick={handleSelectRating} />
				<ErrorPopover error={getFieldError('rating')} className={s.error_popover} />
			</div>
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
					error={getFieldError('review')}
				/>
				<Button htmlType='submit' type='form'>
					{isLoading ? (
						<Preloader width={20} height={20} />
					) : (
						<Text span color='white' className={s.btn_auth_text}>
							Submit
						</Text>
					)}
				</Button>
			</form>
		</div>
	)
}
