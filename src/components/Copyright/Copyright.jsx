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
							© {new Date().getFullYear()}{' '}
							<NavLink to='/' className={s.link}>
								Safira
							</NavLink>{' '}
							. Code and custom features by{' '}
							<Link className={s.link} target='_blank' to='https://t.me/alexhcj'>
								alexhcj
							</Link>{' '}
							. Visual design based on the Safira template by{' '}
							<Link className={s.link} target='_blank' to='https://template.hasthemes.com/safira/index.html'>
								HasThemes
							</Link>
							&nbsp;. MIT License
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
