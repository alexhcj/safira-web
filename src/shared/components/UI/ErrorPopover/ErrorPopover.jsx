import { useEffect, useRef, useState } from 'react'

import cn from 'classnames'
import { CSSTransition } from 'react-transition-group'

import s from './error-popover.module.scss'

const defaultTransition = {
	enter: s.animateEnter,
	enterActive: s.animateEnterActive,
	enterDone: s.animateEnterDone,
	exit: s.animateExit,
	exitActive: s.animateExitActive,
	exitDone: s.animateExitDone,
}

// types: 'text'
export const ErrorPopover = ({ type, error, transitionClasses = defaultTransition, className }) => {
	const [toggle, setToggle] = useState(false)
	const nodeRef = useRef(null)

	useEffect(() => {
		error ? setToggle(true) : setToggle(false)
	}, [error])

	return (
		<>
			{error && (
				<CSSTransition
					in={toggle}
					timeout={300}
					classNames={transitionClasses}
					mountOnEnter
					unmountOnExit
					nodeRef={nodeRef}
				>
					<span
						ref={nodeRef}
						className={cn(s.validation, type && s[`type_${type}`], { [s.no_result]: error.id === 4 }, className)}
					>
						{error}
					</span>
				</CSSTransition>
			)}
		</>
	)
}
