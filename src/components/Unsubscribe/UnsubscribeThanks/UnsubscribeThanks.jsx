import { useNavigate } from 'react-router-dom'

import { useUnsubscribeContext } from '@context/UnsubscribeContext'

import { Button } from '@shared/components/UI/Buttons/Button/Button'

import HeartSVG from '@assets/svg/heart.svg?react'

import s from './unsubscribe-thanks.module.scss'

export const UnsubscribeThanks = () => {
	const navigate = useNavigate()
	const { unsubscribeContext, setUnsubscribeContext } = useUnsubscribeContext()

	const navigateToStore = () => {
		setUnsubscribeContext({ step: 0 })
		setTimeout(() => navigate('/'), 0)
	}

	const renderFeedbackSuccess = () => (
		<div className={s.box}>
			<div className={s.content}>
				<HeartSVG className={s.svg} />
				<p>Thanks for your feedback! This helps us improve.</p>
			</div>
			<Button className={s.button} type='profile' onClick={navigateToStore}>
				Back to store
			</Button>
			<p className={s.close_text}>You can close this tab when you&apos;re ready.</p>
		</div>
	)

	const renderFeedbackFailure = () => (
		<div className={s.box}>
			<div className={s.content}>
				<p>Thanks anyway!</p>
			</div>
			<div className={s.actions}>
				<Button className={s.button} type='profile' onClick={navigateToStore}>
					Back to store
				</Button>
			</div>
			<p className={s.close_text}>You can close this tab when you&apos;re ready.</p>
		</div>
	)

	return <div>{unsubscribeContext.feedback ? renderFeedbackSuccess() : renderFeedbackFailure()}</div>
}
