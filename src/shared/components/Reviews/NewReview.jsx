import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { reviewsAPI } from '../../../api/reviews'
import { getUserStorage } from '../../../api/storage'
import { NewRating } from '../Rating/NewRating'
import { UserActions } from '../UserActions/UserActions'
import { Space } from '../UI/Spacing/Space'
import { Text } from '../UI/Text/Text'
import { Button } from '../UI/Buttons/Button/Button'
import { ReactComponent as MessageSVG } from '../../../assets/svg/message.svg'
import s from './reviews.module.scss'

export const NewReview = () => {
	const [textarea, setTextarea] = useState('')
	const [rating, setRating] = useState(0)
	const [user, setUser] = useState('')
	const { slug } = useParams()
	const navigate = useNavigate()
	const location = useLocation()

	const navigateToLogin = () => {
		navigate('/login', { state: { from: location.pathname } })
	}

	const navigateToRegister = () => {
		navigate('/register')
	}

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
		<>
			<div className={s.review_new}>
				<h4 className={s.title}>Add a review</h4>
				{!user ? (
					<div className={s.user_actions}>
						<UserActions
							icon={<MessageSVG />}
							message='Wanna left review?'
							actionMessage='Click here to login'
							onClick={navigateToLogin}
							className={s.message_icon}
						/>
						<UserActions
							message='Don`t have profile?'
							onClick={navigateToRegister}
							actionMessage='Click here to register'
						/>
					</div>
				) : (
					<>
						<Text className={s.text}>Select rating or write something about product</Text>
						<Space space={20} />
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
				)}
			</div>
		</>
	)
}
