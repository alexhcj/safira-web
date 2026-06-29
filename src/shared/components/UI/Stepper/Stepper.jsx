import cn from 'classnames'

import { useIsBelow } from '@hooks/useIsBelow'

import { BREAKPOINTS } from '@shared/data/breakpoints'

import CheckSVG from '@assets/svg/check.svg?react'

import s from './stepper.module.scss'

/**
 * Derives the two slots rendered in the mobile (320–576px) view.
 *
 * Rules (3-step example, 0-indexed ids):
 *   step=0  → [active(0), collapsed(1,2)]  badge=+1 (all remaining after the first collapsed)
 *   step=1  → [active(1), collapsed(2)]    no badge (only one collapsed left)
 *   step=2  → [active(2)]                  no line, no collapsed slot
 *  'finish' → [finished(last)]             no line, no collapsed slot
 *
 * "Collapsed slot" is always the very last item in data[] regardless of how
 * many steps are hidden — only the badge count changes.
 */
const getMobileSlots = (data, currentStep) => {
	const isFinished = currentStep === 'finish'
	const lastItem = data[data.length - 1]

	if (isFinished) {
		return { primary: lastItem, collapsed: null, badge: 0 }
	}

	const activeIndex = data.findIndex(({ id }) => id === currentStep)
	const primary = data[activeIndex]

	// Steps that come after the active one
	const remaining = data.slice(activeIndex + 1)

	if (remaining.length === 0) {
		// Last step active — no connector, no collapsed slot
		return { primary, collapsed: null, badge: 0 }
	}

	// The collapsed placeholder is always the last item visually
	const collapsed = lastItem
	// Badge = how many steps are hidden behind the collapsed icon
	// (remaining steps minus the one that IS shown as the collapsed icon)
	const badge = remaining.length - 1

	return { primary, collapsed, badge }
}

export const Stepper = ({ data, currentStep }) => {
	const isTabletS = useIsBelow(BREAKPOINTS.tabletS)
	const isFinished = currentStep === 'finish'
	const totalSteps = data.length
	const { primary, collapsed, badge } = getMobileSlots(data, currentStep)

	return (
		<div className={s.box}>
			{!isTabletS && (
				<ul className={cn(s.list, s.list_full)}>
					{data.map(({ id, title, icon }) => {
						const isDone = currentStep > id || isFinished
						const isActive = currentStep === id

						return (
							<li
								key={id}
								className={cn(s.item, {
									[s.active]: isActive,
									[s.done]: isDone,
								})}
							>
								<div className={s.icon}>{isDone ? <CheckSVG /> : icon}</div>
								<div className={s.text}>
									<span className={s.step}>step {id + 1}</span>
									<p className={s.title}>{title}</p>
								</div>
							</li>
						)
					})}
				</ul>
			)}

			{isTabletS && (
				<ul className={cn(s.list, s.list_mobile)}>
					{/* Primary slot — always the active (or finished) step */}
					<li
						className={cn(s.item, s.item_mobile, {
							[s.active]: !isFinished,
							[s.done]: isFinished,
							[s.has_line]: collapsed !== null,
						})}
					>
						<div className={s.icon}>{isFinished ? <CheckSVG /> : primary.icon}</div>
						<div className={s.text}>
							<span className={s.step}>{isFinished ? 'finished' : `step ${primary.id + 1} of ${totalSteps}`}</span>
							<p className={s.title}>{primary.title}</p>
						</div>
					</li>

					{/* Collapsed slot — last step icon only, with optional badge */}
					{collapsed !== null && (
						<li className={cn(s.item, s.item_mobile, s.item_collapsed)}>
							<div className={cn(s.icon_wrap, { [s.layer]: badge > 0 })}>
								<div className={s.icon}>{collapsed.icon}</div>
								{badge > 0 && <span className={s.badge}>+{badge}</span>}
							</div>
						</li>
					)}
				</ul>
			)}
		</div>
	)
}
