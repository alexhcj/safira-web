import { useEffect, useState } from 'react'

import cn from 'classnames'
import { Link, animateScroll as scroll } from 'react-scroll'

import { useIntersection } from '@hooks/useIntersection'

import DoubleArrowSVG from '@assets/svg/double-arrow.svg?react'

import s from './button-scroll.module.scss'

export const ButtonScroll = () => {
	const isFooterReached = useIntersection('#copyright')
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

	return (
		<Link
			to='nav'
			className={cn(s.btn, { [s.show]: scrollBtn, [s.footer_reached]: isFooterReached })}
			onClick={toggleHome}
			duration={400}
			spy={true}
		>
			<DoubleArrowSVG />
		</Link>
	)
}
