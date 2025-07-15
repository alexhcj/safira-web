import { useUnsubscribeContext } from '@context/UnsubscribeContext'

import { UnsubscribeSuccess } from '@components/Unsubscribe/UnsubscribeSuccess/UnsubscribeSuccess'

import { UnsubscribeForm } from '@shared/components/Form/UnsubscribeForm/UnsubscribeForm'

import s from './unsubscribe-feedback.module.scss'

export const UnsubscribeFeedback = () => {
	const { unsubscribeContext } = useUnsubscribeContext()

	return (
		<div className={s.box}>
			<UnsubscribeSuccess campaignType={unsubscribeContext.campaign} />
			<UnsubscribeForm />
		</div>
	)
}
