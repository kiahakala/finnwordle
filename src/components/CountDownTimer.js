import React from 'react'
import { useCountdown } from '../hooks/useCountDown'
import TimeDisplay from './TimeDisplay'

const ShowCounter = ({ hours, minutes, seconds }) => {
    return (
      <div className="grid grid-flow-col">
          <TimeDisplay value={hours} type={'tuntia'} />
          <p>:</p>
          <TimeDisplay value={minutes} type={'minuuttia'} />
          <p>:</p>
          <TimeDisplay value={seconds} type={'sekuntia'} />
      </div>
    )
  }

const CountdownTimer = ({ targetDate }) => {
    const [hours, minutes, seconds] = useCountdown(targetDate)

    return (
        <ShowCounter
          hours={hours}
          minutes={minutes}
          seconds={seconds}
        />
      )
    }

export default CountdownTimer