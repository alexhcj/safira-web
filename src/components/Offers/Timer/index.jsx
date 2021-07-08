import s from "./timer.module.css"
import React from "react";


export const Timer = ({time}) => {
  const [counter, setCounter] = React.useState(time);
  React.useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  return (
    <div className={s.block}>
      <div>Countdown: {counter === 0 ? "Time over" : counter}</div>
    </div>
  );
}