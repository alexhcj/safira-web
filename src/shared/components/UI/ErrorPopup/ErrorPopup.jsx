import { useEffect, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import s from './error-popup.module.scss'

export const ErrorPopup = ({ error, toggle }) => {
	const [errorText, setErrorText] = useState('')
	const nodeRef = useRef(null)

	useEffect(() => {
		const errorTypes = [
			{ id: 1, type: 'text', text: 'Use only upper and lower case characters.' },
			{ id: 2, type: 'empty', text: 'Enter product or select from list.' },
			{ id: 3, type: 'length', text: 'Maximum characters are 35.' },
			{ id: 4, type: 'noresult', text: 'Nothing has found on this search. Please try to find something else.' },
		]

		if (error) {
			setErrorText(errorTypes.filter((e) => e.type === error)[0].text)
		}
	}, [error])

	return (
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
			<span ref={nodeRef} className={s.validation}>
				{errorText}
			</span>
		</CSSTransition>
	)
}
