import cn from 'classnames'
import { useNavigate } from 'react-router-dom'

import { useAuthContext } from '@context/AuthContext'

import { ReplyForm } from '@shared/components/Form/ReplyForm/ReplyForm'
import { Space } from '@shared/components/UI/Spacing/Space'
import { UserActions } from '@shared/components/UserActions/UserActions'

import MessageSVG from '@assets/svg/message.svg?react'

import s from './reply.module.scss'

// action: 'create' (create new entity) | 'update' (updates comments array)
// type: 'short'
export const Reply = ({ nestedLvl = '', type, action = 'create' }) => {
	const { user } = useAuthContext()
	const navigate = useNavigate()

	const navigateToLogin = () => {
		navigate('/login')
	}

	const navigateToRegister = () => {
		navigate('/register')
	}

	return (
		<div className={cn(s.reply, type && s[`reply_${type}`])}>
			{type !== 'short' && <h3 className={s.title}>Leave a reply</h3>}

			{!user ? (
				<>
					<div className={s.user_actions}>
						<UserActions
							icon={<MessageSVG />}
							message='Wanna left comment?'
							onClick={navigateToLogin}
							actionMessage='Click here to login'
							className={s.message_icon}
						/>
						<UserActions
							message='Don`t have profile?'
							onClick={navigateToRegister}
							actionMessage='Click here to register'
						/>
					</div>
					<Space size='l' />
				</>
			) : (
				<ReplyForm nestedLvl={nestedLvl} type={type} action={action} />
			)}
		</div>
	)
}
