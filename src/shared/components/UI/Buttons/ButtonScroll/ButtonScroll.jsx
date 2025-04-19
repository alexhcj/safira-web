import { useEffect, useState } from 'react'

import classNames from 'classnames/bind'
import { Link, animateScroll as scroll } from 'react-scroll'

import DoubleArrowSVG from '@assets/svg/double-arrow.svg?react'


import s from './button-scroll.module.scss'

export const ButtonScroll = () => {
	const [scrollBtn, setScrollBtn] = useState(false)

	const showScroll = () => {
		if (window.scrollY >= 300) {
			setScrollBtn(true)
		} else {
			setScrollBtn(false)
		}
	}

	useEffect(() => {
		window.addEventListener('scroll', showScroll)

		return function cleanup() {
			window.removeEventListener('scroll', showScroll)
		}
	}, [scrollBtn])

	const toggleHome = () => {
		scroll.scrollToTop()
	}

	let cx = classNames.bind(s)
	let btnCN = cx(s.btn, { [s.show]: scrollBtn })

	return (
		<Link to='nav' className={btnCN} onClick={toggleHome} duration={400} spy={true}>
			<DoubleArrowSVG />
		</Link>
	)
}
