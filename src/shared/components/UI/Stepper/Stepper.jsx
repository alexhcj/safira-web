import cn from 'classnames'

import { useIsBelow } from '@hooks/useIsBelow'

import { BREAKPOINTS } from '@shared/data/breakpoints'

import CheckSVG from '@assets/svg/check.svg?react'

import s from './stepper.module.scss'

/**
 * @typedef {Object} BreakpointBehavior
 * @property {number}  maxWidth     - viewport width upper bound (px, exclusive)
 * @property {number}  visibleSteps - number of expanded step slots in the window
 * @property {boolean} showLabels   - whether non-active expanded steps show text labels
 * @property {boolean} showLeft     - whether the left collapsed overlay is rendered
 *                                    false for <576px (left overflow is simply hidden)
 *                                    true  for 576px+ (left overlay shown with primary bg)
 */

/**
 * Default behavior table:
 *
 *  < 576px   → window=2, no labels, no left overlay    active only; right overlay for future steps
 *  < 768px   → window=3, labels, left overlay          sliding window; overlays on either side
 *  < 1100px  → window=3, labels, left overlay          same, wider viewport
 *  ≥ 1100px  → all steps, all labels                   no entry — full view fallback
 */
const DEFAULT_BREAKPOINT_BEHAVIOR = [
	{ maxWidth: BREAKPOINTS.tabletS, visibleSteps: 2, showLabels: false, showLeft: false },
	{ maxWidth: BREAKPOINTS.tablet, visibleSteps: 3, showLabels: true, showLeft: true },
	{ maxWidth: BREAKPOINTS.laptopS, visibleSteps: 3, showLabels: true, showLeft: true },
]

/**
 * Returns the first matching behavior entry for the current viewport width,
 * or null when no entry matches (full/desktop view).
 *
 * @param {BreakpointBehavior[]} behaviors
 * @returns {BreakpointBehavior | null}
 */
const useActiveBehavior = (behaviors) => {
	const sorted = [...behaviors].sort((a, b) => a.maxWidth - b.maxWidth)

	const matches = sorted.map((entry) => ({
		entry,
		// eslint-disable-next-line react-hooks/rules-of-hooks
		isBelow: useIsBelow(entry.maxWidth),
	}))

	const match = matches.find(({ isBelow }) => isBelow)
	return match ? match.entry : null
}

// ─── Slot builder ─────────────────────────────────────────────────────────────

/**
 * Derives the sliding window + left/right overlay badge state.
 *
 * Window positioning rule:
 *   Active step sits at position [windowEnd - 2] (second-to-last) when possible,
 *   leaving the last slot for the next step.
 *   When there is no next step (active is last), active occupies the last slot.
 *
 *   windowEnd = min(activeIndex + 2, total)   -- leaves room for one future step
 *               but at least visibleSteps      -- anchors window at start for early steps
 *
 * Overlay logic:
 *   - RIGHT overlay: steps after the window exist → show on last visible item
 *     badge = count of all steps after the window (all are hidden)
 *     shown only when badge > 0; no icon inside overlay, no label
 *   - LEFT overlay: window has slid past the start (windowStart > 0)
 *     badge = windowStart (count of hidden left steps)
 *     shown only when showLeft=true and badge > 0
 *     uses primary background colour (done steps)
 *
 * finish state:
 *   windowEnd = total (show last visibleSteps done items)
 *   left overlay for any items before window
 *   no right overlay
 *
 * @param {Array}            data
 * @param {number|'finish'}  currentStep
 * @param {number}           visibleSteps
 */
const getSlots = (data, currentStep, visibleSteps) => {
	const isFinished = currentStep === 'finish'
	const total = data.length

	let windowEnd

	if (isFinished) {
		windowEnd = total
	} else {
		const activeIndex = data.findIndex(({ id }) => id === currentStep)
		// Leave room for one future step after active when the window is wide
		// enough to show it (visibleSteps >= 2). For visibleSteps=1 the active
		// step must always be the only slot, so the offset is 1 not 2.
		const futureSlots = Math.min(1, visibleSteps - 1)
		windowEnd = Math.min(Math.max(activeIndex + 1 + futureSlots, visibleSteps), total)
	}

	const windowStart = Math.max(0, windowEnd - visibleSteps)
	const windowItems = data.slice(windowStart, windowEnd)

	// Left overlay: steps hidden before the window
	const leftBadge = windowStart // 0 means no left overlay

	// Right overlay: steps hidden after the window
	const rightItems = data.slice(windowEnd)
	const rightBadge = rightItems.length // 0 means no right overlay

	const annotated = windowItems.map(({ id, title, icon }) => ({
		id,
		title,
		icon,
		isDone: isFinished || currentStep > id,
		isActive: !isFinished && currentStep === id,
	}))

	return { window: annotated, leftBadge, rightBadge }
}

// ─── Sub-components ───────────────────────────────────────────────────────────

const StepIcon = ({ isDone, icon }) => <div className={s.icon}>{isDone ? <CheckSVG /> : icon}</div>

const StepText = ({ label, title }) => (
	<div className={s.text}>
		<span className={s.step}>{label}</span>
		<p className={s.title}>{title}</p>
	</div>
)

// ─── Component ────────────────────────────────────────────────────────────────

export const Stepper = ({ data, currentStep, breakpointBehavior = DEFAULT_BREAKPOINT_BEHAVIOR }) => {
	const activeBehavior = useActiveBehavior(breakpointBehavior)
	const isFinished = currentStep === 'finish'
	const totalSteps = data.length

	// ── Full view ─────────────────────────────────────────────────────────────
	if (!activeBehavior) {
		return (
			<div className={s.box}>
				<ul className={s.list}>
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
								<StepIcon isDone={isDone} icon={icon} />
								<StepText label={`step ${id + 1}`} title={title} />
							</li>
						)
					})}
				</ul>
			</div>
		)
	}

	// ── Mobile finish: single centred done item, label only (no title) ──────────
	// Shown at <576px (showLabels=false) when currentStep='finish'.
	// Separate from the sliding window — finish has no "active" step to anchor.
	if (isFinished && !activeBehavior.showLabels) {
		const lastItem = data[totalSteps - 1]

		return (
			<div className={s.box}>
				<ul className={s.list}>
					<li className={cn(s.item, s.done, s.no_line)}>
						<StepIcon isDone icon={lastItem.icon} />
						<div className={s.text}>
							<span className={s.step}>finished</span>
							{/* No title — mobile finish communicates completion
							    via icon + label only, keeping it minimal. */}
						</div>
					</li>
				</ul>
			</div>
		)
	}

	// ── Sliding window view ───────────────────────────────────────────────────
	const { window: slots, leftBadge, rightBadge } = getSlots(data, currentStep, activeBehavior.visibleSteps)
	const { showLabels, showLeft } = activeBehavior

	const firstSlot = slots[0]
	const lastSlot = slots[slots.length - 1]

	return (
		<div className={s.box}>
			<ul className={s.list}>
				{slots.map(({ id, title, icon, isDone, isActive }) => {
					const isFirst = id === firstSlot.id
					const isLast = id === lastSlot.id

					const hasLeftOverlay = isFirst && showLeft && leftBadge > 0
					const hasRightOverlay = isLast && rightBadge > 0

					// Label text:
					//   showLabels=true  (576px+) → always "step N", even on finish —
					//                               keeps visual consistency across done steps
					//   showLabels=false (<576px) → "step N of T" on active;
					//                               finish is handled above, never reaches here
					const labelText = showLabels ? `step ${id + 1}` : `step ${id + 1} of ${totalSteps}`

					return (
						<li
							key={id}
							className={cn(s.item, {
								[s.active]: isActive,
								[s.done]: isDone,
								[s.no_line]: isLast || hasRightOverlay,
							})}
						>
							{hasLeftOverlay && (
								<div className={cn(s.overlay, s.overlay_left, s.overlay_done)}>
									<span className={s.badge_left}>+{leftBadge}</span>
								</div>
							)}

							<StepIcon isDone={isDone} icon={icon} />

							{(isActive || isDone || showLabels) && <StepText label={labelText} title={title} />}

							{hasRightOverlay && (
								<div className={cn(s.overlay, s.overlay_right)}>
									{rightBadge >= 1 && <span className={s.badge_right}>+{rightBadge}</span>}
								</div>
							)}
						</li>
					)
				})}
			</ul>
		</div>
	)
}
