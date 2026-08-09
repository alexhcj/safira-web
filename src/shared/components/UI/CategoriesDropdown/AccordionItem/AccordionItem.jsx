import cn from 'classnames'

import MinusSVG from '@assets/svg/minus.svg?react'
import PlusSVG from '@assets/svg/plus.svg?react'

import s from './accordion-item.module.scss'

export const AccordionItem = ({
	label,
	isLeaf = false,
	isOpen = false,
	isPending = false,
	onRowTap, // fires for both expand and collapse — parent decides state
	onCollapse, // fires only when − icon tapped while open
	children,
}) => {
	const handleRowTap = (e) => {
		e.stopPropagation()
		onRowTap?.()
	}

	const handleMinusTap = (e) => {
		e.stopPropagation() // prevent row tap from also firing
		onCollapse?.()
	}

	return (
		<li className={s.item}>
			<div className={s.row} onPointerUp={handleRowTap}>
				<span className={cn(s.label, isPending && s.pending, isLeaf && s.leaf)}>{label}</span>
				{!isLeaf &&
					(isOpen ? (
						<span className={cn(s.icon, isPending && s.pending)} onPointerUp={handleMinusTap}>
							<MinusSVG />
						</span>
					) : (
						<span className={s.icon}>
							<PlusSVG />
						</span>
					))}
			</div>

			{!isLeaf && (
				<ul className={s.children} style={{ maxHeight: isOpen ? '600px' : '0px' }}>
					{children}
				</ul>
			)}
		</li>
	)
}
