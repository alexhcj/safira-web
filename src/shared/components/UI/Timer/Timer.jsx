import { useEffect, useState } from 'react'

import cn from 'classnames'

import s from './timer.module.scss'

/**
 * Timer granularity types with their display priority
 * Higher numbers include the display of lower numbered units
 */
const TIMER_GRANULARITY = {
	seconds: 1,
	minutes: 2,
	hours: 3,
	days: 4,
}

export const Timer = ({ type, date, className }) => {
	const [seconds, setSeconds] = useState(0)
	const [minutes, setMinutes] = useState(0)
	const [hours, setHours] = useState(0)
	const [days, setDays] = useState(0)

	const leading0 = (num) => {
		return num < 10 ? '0' + num : num.toString()
	}

	const calculateTime = (date) => {
		const time = Date.parse(date.toString()) - Date.now()

		if (time < 0) {
			setDays(0)
			setHours(0)
			setMinutes(0)
			setSeconds(0)
		} else {
			setDays(Math.floor(time / (1000 * 60 * 60 * 24)))
			setHours(Math.floor((time / (1000 * 60 * 60)) % 24))
			setMinutes(Math.floor((time / 1000 / 60) % 60))
			setSeconds(Math.floor((time / 1000) % 60))
		}
	}

	useEffect(() => {
		calculateTime(date)
		const interval = setInterval(() => calculateTime(date), 1000)

		return () => clearInterval(interval)
	}, [date])

	return (
		<div className={cn(s.timer, className)}>
			{TIMER_GRANULARITY[type] >= TIMER_GRANULARITY.days && (
				<div className={s.item}>
					<span className={s.number}>{leading0(days)}</span>
					<span className={s.text}>Day</span>
				</div>
			)}
			{TIMER_GRANULARITY[type] >= TIMER_GRANULARITY.hours && (
				<div className={s.item}>
					<span className={s.number}>{leading0(hours)}</span>
					<span className={s.text}>Hour</span>
				</div>
			)}
			{TIMER_GRANULARITY[type] >= TIMER_GRANULARITY.minutes && (
				<div className={s.item}>
					<span className={s.number}>{leading0(minutes)}</span>
					<span className={s.text}>Min</span>
				</div>
			)}
			{TIMER_GRANULARITY[type] >= TIMER_GRANULARITY.seconds && (
				<div className={s.item}>
					<span className={s.number}>{leading0(seconds)}</span>
					<span className={s.text}>Sec</span>
				</div>
			)}
		</div>
	)
}
