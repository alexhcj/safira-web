import { useEffect, useState } from 'react'
import s from './timer.module.css'

export const Timer = ({ time }) => {
	const [counter, setCounter] = useState(time)
    
	useEffect(() => {
		counter > 0 && setTimeout(() => setCounter(counter - 1), 1000)
	}, [counter])

	return (
		<div className={s.block}>
			<div>Countdown: {counter === 0 ? 'Time over' : counter}</div>
		</div>
	)
}
