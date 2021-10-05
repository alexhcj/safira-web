import { useEffect, useState } from 'react'
import s from './timer.module.css'

export const Timer = ({ time }) => {
    const [counter, setCounter] = useState(time)
    useEffect(() => {
        const timer = setTimeout(() => setCounter(counter - 1), 1000)
        return () => clearTimeout(timer)
    }, [counter])

    return (
        <div className={s.block}>
            <div>Countdown: {counter === 0 ? 'Time over' : counter}</div>
        </div>
    )
}
