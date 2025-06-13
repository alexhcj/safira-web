import { useEffect, useRef, useState } from 'react'

import cn from 'classnames'
import { CSSTransition } from 'react-transition-group'

import s from './password-strength.module.scss'

/**
 * Calculates password strength based on length and character types
 * @param {string} password - The password to evaluate
 * @returns {{status: string, value: number}} Object containing strength status and progress value
 */
const calcStrength = (password) => {
	let score = 0
	if (password.length > 5) score++
	if (/[A-Z]/.test(password)) score++
	if (/[0-9]/.test(password)) score++
	if (/[!@#$%^&*]/.test(password)) score++

	if (score <= 1) return { status: 'weak', value: 25 }
	if (score === 2 || score === 3) return { status: 'average', value: 60 }
	return { status: 'good', value: 100 }
}

export const PasswordStrength = ({ value = '', isActive, classNames }) => {
	const [toggle, setToggle] = useState(false)
	const nodeRef = useRef(null)

	useEffect(() => {
		isActive ? setToggle(true) : setToggle(false)
	}, [isActive])

	const { status, value: progress } = calcStrength(value)

	return (
		<>
			{isActive && (
				<CSSTransition
					in={toggle}
					timeout={300}
					classNames={{
						enter: s.animateEnter,
						enterActive: s.animateEnterActive,
						enterDone: s.animateEnterDone,
						exit: s.animateExit,
						exitActive: s.animateExitActive,
						exitDone: s.animateExitDone,
					}}
					mountOnEnter
					unmountOnExit
					nodeRef={nodeRef}
				>
					<div ref={nodeRef} className={cn(s.strength, classNames)}>
						<div className={cn(s.fill, { [s[status]]: status })} style={{ width: `${progress}%` }} />
						<div className={s.text}>
							<span>Password strength:</span>
							<span className={s.status}>{status}</span>
						</div>
					</div>
				</CSSTransition>
			)}
		</>
	)
}
