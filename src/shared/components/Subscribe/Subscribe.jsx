import cn from 'classnames'

import { SubscribeForm } from '@shared/components/Form/SubscribeForm/SubscribeForm'

import s from './subscribe.module.scss'

export const Subscribe = ({ className }) => {
	return (
		<div className={cn(s.box, className)}>
			<h3 className={s.title}>Sign Up Newsletter</h3>
			<p className={s.text}>Subscribe to receive our weekly updates</p>
			<SubscribeForm />
		</div>
	)
}
