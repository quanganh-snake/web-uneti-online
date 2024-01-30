import { useState } from 'react'
import { useEffect } from 'react'

import './TimePause.scss'

export default function TimePause() {
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setIsActive(true)
    }, 350)
  }, [])

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={isActive ? 'active' : null}
    >
      <path
        d="M8.00977 5.46C9.20977 4.85 10.5598 4.5 11.9998 4.5C16.8298 4.5 20.7498 8.42 20.7498 13.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="time-pause-svg-elem-1"
      ></path>
      <path
        d="M12 22.0002C7.17 22.0002 3.25 18.0802 3.25 13.2502C3.25 11.2702 3.91 9.45023 5.01 7.99023"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="time-pause-svg-elem-2"
      ></path>
      <path
        d="M12 8C12 8 12 11.0474 12 13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="time-pause-svg-elem-3"
      ></path>
      <path
        d="M9 2H15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="time-pause-svg-elem-4"
      ></path>
      <path
        d="M19 17V21"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="time-pause-svg-elem-5"
      ></path>
      <path
        d="M16 17V21"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="time-pause-svg-elem-6"
      ></path>
    </svg>
  )
}
