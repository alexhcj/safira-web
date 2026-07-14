import { Badge } from '@shared/components/UI/Badge/Badge'

import ArrowSVG from '@assets/svg/arrow.svg?react'

import s from './meta-popup.module.scss'

export const MetaPopup = ({ text = 'Meta text', data = [], getLabel }) => {
	return (
		<div className={s.list}>
			{text}
			<ArrowSVG className={s.svg} />
			<div className={s.popup}>
				{data.map((item) => (
					<div key={item.id} className={s.item}>
						<a
							className={s.link}
							href={item.badge ? undefined : '/src/pages'}
							aria-disabled={item.badge}
							onClick={item.badge ? (e) => e.preventDefault() : undefined}
						>
							{getLabel(item)}
						</a>
						{item.badge && <Badge text={item.badge} />}
					</div>
				))}
			</div>
		</div>
	)
}
