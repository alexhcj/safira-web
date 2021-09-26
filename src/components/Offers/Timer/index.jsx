import s from "./timer.module.css"
import React from "react";


export const Timer = ({time}) => {
  const [counter, setCounter] = React.useState(time);
  React.useEffect(() => {
    const timer = setTimeout(() => setCounter(counter - 1), 1000); 
    return () => clearTimeout(timer)
  }, [counter]);

  return (
    <div className={s.block}>
      <div>Countdown: {counter === 0 ? "Time over" : counter}</div>
    </div>
  );
}