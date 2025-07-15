import { useNavigate, useSearchParams } from 'react-router-dom'

import { useUnsubscribeContext } from '@context/UnsubscribeContext'

import { useAuth } from '@hooks/services/useAuth'
import { useEmailer } from '@hooks/services/useEmailer'

import { Preloader } from '@shared/components/common/Preloader/Preloader'
import { Button } from '@shared/components/UI/Buttons/Button/Button'
import { UserActions } from '@shared/components/UserActions/UserActions'

import EmailSVG from '@assets/svg/email.svg?react'

import s from './unsubscribe.module.scss'

export const Unsubscribe = () => {
	const [params, _] = useSearchParams()
	const navigate = useNavigate()
	const { user } = useAuth()
	const { unsubscribe, isLoading } = useEmailer()
	const { setUnsubscribeContext } = useUnsubscribeContext()

	const handleAction = () => {
		!user
			? navigate('/login', { state: { email: params.get('email'), from: '/unsubscribe' } })
			: navigate('/profile/subscriptions')
	}

	const handleUnsubscribe = async () => {
		const subType = params.get('category')
		const campaign = subType === 'ALL' ? 'ALL' : `${subType}`

		const subsToUpdate =
			subType === 'ALL'
				? {
						devNews: false,
						marketingNews: false,
						blogNews: false,
					}
				: {
						devNews: subType === 'DEV_NEWS',
						marketingNews: subType === 'MARKETING_NEWS',
						blogNews: subType === 'STORE_NEWS',
					}

		const res = await unsubscribe({
			email: params.get('email'),
			campaigns: subsToUpdate,
		})

		if (res && res.success) {
			setUnsubscribeContext({ step: 1, campaign })
		}
	}

	return (
		<div className={s.content}>
			<p className={s.text}>
				Unsubscribing for <span className={s.email}>{params.get('email') ?? 'your email'}</span> from “Tech news”
				category newsletters receiving.
			</p>
			<UserActions
				className={s.actions}
				icon={<EmailSVG className={s.svg} />}
				message='Wanna customize your subscriptions?'
				actionMessage='Manage all subscriptions'
				onClick={handleAction}
			/>
			<Button className={s.button} type='profile' onClick={handleUnsubscribe}>
				{isLoading ? <Preloader width={20} height={20} /> : 'Unsubscribe'}
			</Button>
		</div>
	)
}
