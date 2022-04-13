import { useEffect, useState } from 'react'
import s from './timer.module.css'

export const Timer = ({date}) => {
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const leading0 = (num) => {
        return num < 10 ? "0" + num : num.toString();
    };

    const calculateTime = (date) => {
        const time = Date.parse(date) - Date.parse(new Date());
        if (time < 0) {
            setDays(0);
            setHours(0);
            setMinutes(0);
            setSeconds(0);
        } else {
            setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
            setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
            setMinutes(Math.floor((time / 1000 / 60) % 60));
            setSeconds(Math.floor((time / 1000) % 60));
        }
    };

    useEffect(() => {
        setInterval(() => calculateTime(date), 1000);

        return () => calculateTime(date);
    }, [date]);

    return (
        <div className={s.timer}>
            <div className={s.item}>
                <span className={s.number}>{leading0(days)}</span>
                <span className={s.text}>Day</span>
            </div>
            <div className={s.item}>
                <span className={s.number}>{leading0(hours)}</span>
                <span className={s.text}>Hour</span>
            </div>
            <div className={s.item}>
                <span className={s.number}>{leading0(minutes)}</span>
                <span className={s.text}>Min</span>
            </div>
            <div className={s.item}>
                <span className={s.number}>{leading0(seconds)}</span>
                <span className={s.text}>Sec</span>
            </div>
        </div>
    )
}
