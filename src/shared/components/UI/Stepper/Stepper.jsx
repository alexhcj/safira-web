import cn from 'classnames'

import { ReactComponent as CheckSVG } from '@assets/svg/check.svg'

import s from './stepper.module.scss'

export const Stepper = ({ data, currentStep }) => {
	return (
		<div className={s.box}>
			<ul className={s.list}>
				{data.map(({ id, title, icon }) => (
					<li
						key={id}
						className={cn(s.item, {
							[s.active]: currentStep === id,
							[s.done]: currentStep > id || currentStep === 'finish',
						})}
					>
						<div className={s.icon}>{currentStep > id || currentStep === 'finish' ? <CheckSVG /> : icon}</div>
						<div className={s.text}>
							<span className={s.step}>step {id + 1}</span>
							<p className={s.title}>{title}</p>
						</div>
					</li>
				))}
			</ul>
		</div>
	)
}
