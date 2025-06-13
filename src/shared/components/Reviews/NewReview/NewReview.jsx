import { useLocation, useNavigate } from 'react-router-dom'

import { useAuthContext } from '@context/AuthContext'

import { NewReviewForm } from '../../Form/NewReviewForm/NewReviewForm'
import { UserActions } from '../../UserActions/UserActions'

import MessageSVG from '@assets/svg/message.svg?react'

import s from './new-review.module.scss'

export const NewReview = () => {
	const { user } = useAuthContext()
	const navigate = useNavigate()
	const location = useLocation()

	const navigateToLogin = () => {
		navigate('/login', { state: { from: location.pathname } })
	}

	const navigateToRegister = () => {
		navigate('/register')
	}

	return (
		<>
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
				<NewReviewForm />
			)}
		</>
	)
}
