import { useEffect, useState } from 'react'
import { hoursAPI } from '../../../api/hours-api'
import s from './hours.module.css'

export const Hours = () => {
	const [hoursLeft, setHoursLeft] = useState(0)
	const [hoursDone, setHoursDone] = useState(0)
	const [btnHover, setBtnHover] = useState(false)

	useEffect(() => {
		// date 13 june
		const timeStart = new Date('06/13/2021')
		const timeToday = new Date()
		const timeToWork = timeToday.getTime() - timeStart.getTime()
		const daysToWork = Math.ceil(timeToWork / (1000 * 60 * 60 * 24))
		const hoursToWork = daysToWork * 2

		const fetchData = async () => {
			try {
				const data = await hoursAPI.getHours('alex')
				setHoursDone(data[0].hours)
				setHoursLeft(hoursToWork - hoursDone)
			} catch (e) {
				console.log(e)
			}
		}

		fetchData()
	}, [hoursDone])

	const addHoursDone = (e) => {
		e.preventDefault()

		hoursAPI.updateHours(hoursDone + 1)
		setHoursDone(hoursDone + 1)
	}

	const btnOnMouseOver = () => {
		setBtnHover(true)
	}

	const btnOnMouseLeave = () => {
		setBtnHover(false)
	}

	return (
		<>
			<h4 className={s.title}>Hours</h4>
			<span className={s.divider}></span>
			<div className={s.stats}>
				<div className={s.worker}>Alex</div>
				<div className={s.hours}>
					Hours left:
					<span className={s.numbers}>{hoursLeft}</span>
					<button
						className={`${s.btn} ${btnHover ? `${s.active}` : ''}`}
						onClick={addHoursDone}
						onMouseOver={btnOnMouseOver}
						onMouseLeave={btnOnMouseLeave}
					>
						🔥
					</button>
				</div>
			</div>
		</>
	)
}
