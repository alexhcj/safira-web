import { useEffect, useRef, useState } from 'react'

import cn from 'classnames'
import { CSSTransition } from 'react-transition-group'

import s from './error-popover.module.scss'

export const ErrorPopover = ({ error, className }) => {
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
					<span ref={nodeRef} className={cn(s.validation, { [s.no_result]: error.id === 4 }, className)}>
						{error}
					</span>
				</CSSTransition>
			)}
		</>
	)
}
