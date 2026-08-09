import { Link, NavLink } from 'react-router-dom'

import { PaymentMethods } from '@shared/components/PaymentMethods/PaymentMethods'

import s from './copyright.module.scss'

export const Copyright = () => {
	return (
		<div className={s.section} id='copyright'>
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
					<PaymentMethods className={s.payment} variant='white' />
					<span className={s.version}>
						<Link className={s.link} target='_blank' to='https://safira-store.online'>
							v{import.meta.env.VITE_APP_VERSION}
						</Link>
					</span>
				</div>
			</div>
		</div>
	)
}

// NOTE: should be payment be a link? what should they translate / link to?
