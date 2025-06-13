import { NavLink } from 'react-router-dom'

import { payment1, payment2, payment3, payment4 } from '@assets/images/footer'

import s from './copyright.module.scss'

export const Copyright = () => {
	return (
		<div className={s.section}>
			<div className='container'>
				<div className={s.block}>
					<div className={s.copyright}>
						<div className={s.text}>
							Copyright © {new Date().getFullYear()}{' '}
							<NavLink to='/' className={s.link}>
								Safira
							</NavLink>{' '}
							.&nbsp;
						</div>
						<div className={s.text}>
							Released under MIT License . Design By{' '}
							<NavLink to='/' className={s.link}>
								Safira
							</NavLink>
						</div>
					</div>
					<div className={s.payments}>
						<img className={s.img} src={payment1} alt='' />
						<img className={s.img} src={payment2} alt='' />
						<img className={s.img} src={payment3} alt='' />
						<img className={s.img} src={payment4} alt='' />
					</div>
				</div>
			</div>
		</div>
	)
}

// NOTE: should be payment be a link? what should they translate / link to?
