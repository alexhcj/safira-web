import CheckSVG from '@assets/svg/check.svg?react'

import s from './unsubscribe-success.module.scss'

export const UnsubscribeSuccess = ({ campaignType }) => {
	return (
		<div className={s.box}>
			<h3 className={s.title}>
				<CheckSVG className={s.svg} />
				Unsubscribed
			</h3>
			<p
				className={s.text}
			>{`You have been successfully unsubscribed from “${campaignType ?? 'newsletter'}” and won’t be receiving that type emails.`}</p>
		</div>
	)
}
