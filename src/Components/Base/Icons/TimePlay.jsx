import { useEffect } from 'react'
import { useState } from 'react'

import './TimePlay.scss'

export default function TimePlay() {
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setIsActive(true)
    }, 120)
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
        d="M12 8V13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="time-play-svg-elem-1"
      ></path>
      <path
        d="M8.00977 5.46C9.20977 4.85 10.5598 4.5 11.9998 4.5C16.8298 4.5 20.7498 8.42 20.7498 13.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="time-play-svg-elem-2"
      ></path>
      <path
        d="M12 22.0002C7.17 22.0002 3.25 18.0802 3.25 13.2502C3.25 11.2702 3.91 9.45023 5.01 7.99023"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="time-play-svg-elem-3"
      ></path>
      <path
        d="M9 2H15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="time-play-svg-elem-4"
      ></path>
      <path
        d="M14.8999 18.4998V17.3398C14.8999 15.9098 15.9199 15.3198 17.1599 16.0398L18.1599 16.6198L19.1599 17.1998C20.3999 17.9198 20.3999 19.0898 19.1599 19.8098L18.1599 20.3898L17.1599 20.9698C15.9199 21.6898 14.8999 21.0998 14.8999 19.6698V18.4998Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="time-play-svg-elem-5"
      ></path>
    </svg>
  )
}
