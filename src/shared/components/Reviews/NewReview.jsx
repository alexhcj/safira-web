import React, { useEffect, useState } from 'react'
import { Space } from '../UI/Spacing/Space'
import { Text } from '../UI/Text/Text'
import { NewRating } from '../Rating/NewRating'
import { Button } from '../UI/Buttons/Button/Button'
import { getUserStorage } from '../../../api/storage'
import { reviewsAPI } from '../../../api/reviews'
import { useParams } from 'react-router-dom'
import s from './reviews.module.scss'

export const NewReview = () => {
	const [textarea, setTextarea] = useState('')
	const [rating, setRating] = useState(0)
	const [user, setUser] = useState('')
	const { slug } = useParams()

	useEffect(() => {
		const user = getUserStorage()
		setUser(user)
	}, [])

	const handleControl = (e, fn) => {
		fn(e.target.value)
	}

	const handleRating = (rating) => {
		setRating(rating)
	}

	const handleSubmit = (e) => {
		e.preventDefault()

		const form = {
			text: textarea,
			rating: rating,
			reviewProductSlug: slug,
		}

		reviewsAPI.create(form)
	}

	return (
		<div className={s.review_new}>
			<h4 className={s.title}>Add a review</h4>
			<Space space={8} />
			<Text className={s.text}>Your email address will not be published. Required fields are marked</Text>
			<Space space={20} />
			{user ? (
				<>
					<Text span className={s.rating}>
						Your rating
					</Text>
					<Space space={8} />
					<NewRating onClick={handleRating} />
					<Space space={20} />
					<form onSubmit={handleSubmit}>
						<div className={s.textarea}>
							<label className={s.label} htmlFor='textarea'>
								Your review
							</label>
							<textarea
								className={s.input}
								name='textarea'
								id='textarea'
								value={textarea}
								onChange={(e) => handleControl(e, setTextarea)}
							></textarea>
						</div>
						<Space space={14} />
						<Space space={20} />
						<Button type='form' htmlType='submit'>
							<Text className={s.btn_text} span>
								Submit
							</Text>
						</Button>
					</form>
				</>
			) : (
				<div>
					<h3>Please login to left comment</h3>
					<div>Login icon (throw modal)</div>
				</div>
			)}
		</div>
	)
}
