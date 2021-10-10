import { useEffect, useState } from 'react'
import { timerAPI } from '../../../api/timer-api'
import { Preloader } from '../../UI/Preloader'
import s from './timer.module.css'

export const Timer = () => {
    const [seconds, setSeconds] = useState(0)
    const [counters, setCounters] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)

            try {
                const data = await timerAPI.getDate()
                setSeconds(calculateDatesDelta(...data))
            } catch (e) {
                console.log(e)
            }

            setIsLoading(false)
        }

        fetchData()
    }, [])

    useEffect(() => {
        const worker = new Worker('timerWebWorker.js')
        worker.postMessage(seconds)

        worker.onmessage = e => {
            setCounters(e.data)
        }

        if (seconds > 0) setSeconds(seconds - 1)

        return () => {
            worker.terminate()
        }

        // triggers render via worker data
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [counters])

    const calculateDatesDelta = (date) => {
        const dateNow = new Date()
        const dateEnd = new Date(date.dateEnd)
        return Math.floor((dateEnd.getTime() - dateNow.getTime()) / 1000) // total seconds between dates
    }

    return (
        <div className={s.timer}>
            {isLoading ? <Preloader /> : counters.map((counter, index) => {
                const { count, divider } = counter

                return (
                    <div className={s.item} key={index}>
                        <span className={s.divider}>{divider}</span>
                        <span className={s.count}>{count}</span>
                    </div>
                )
            })}
        </div>
    )
}

// TODO: fix timer delay apper