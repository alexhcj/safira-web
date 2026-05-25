import cn from 'classnames'

import PhoneIMG from '@assets/images/phone.png'

import s from './support-badge.module.scss'

export const SupportBadge = ({ className }) => {
	return (
		<div className={cn(s.support, className)}>
			<img src={PhoneIMG} alt='Phone support icon' />
			<div className={s.support_block}>
				<a className={s.support_link} href='tel:781234777999'>
					(812) 34 777 999
				</a>
				<span className={s.support_text}>Customer support</span>
			</div>
		</div>
	)
}
