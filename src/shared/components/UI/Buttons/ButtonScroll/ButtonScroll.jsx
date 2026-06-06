import { useEffect, useState } from 'react'

import cn from 'classnames'
import { Link, animateScroll as scroll } from 'react-scroll'

import { useIntersection } from '@hooks/useIntersection'

import DoubleArrowSVG from '@assets/svg/double-arrow.svg?react'

import s from './button-scroll.module.scss'

const BUTTON_TRIGGER = 300

export const ButtonScroll = () => {
	const isFooterReached = useIntersection('#copyright')
	const [isBtnShown, setIsBtnShown] = useState(false)

	useEffect(() => {
		const handleScroll = () => {
			setIsBtnShown(window.scrollY >= BUTTON_TRIGGER)
		}

		window.addEventListener('scroll', handleScroll)

		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])

	const toggleHome = () => {
		scroll.scrollToTop()
	}

	return (
		<Link
			to='nav'
			className={cn(s.btn, { [s.show]: isBtnShown, [s.footer_reached]: isFooterReached })}
			onClick={toggleHome}
			duration={400}
			spy={true}
		>
			<DoubleArrowSVG />
		</Link>
	)
}
