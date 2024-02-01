import { useState } from 'react'
import { useEffect } from 'react'

import './AudioPause.scss'

export default function IconAudioPause() {
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    setIsActive(true)
  }, [])

  return (
    <div className="relative">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={isActive ? 'active' : null}
      >
        <path
          d="M16.23 13.27V10.73C16.23 8.61002 15.38 7.77002 13.27 7.77002H10.73C8.61002 7.77002 7.77002 8.62002 7.77002 10.73V13.27C7.77002 15.39 8.62002 16.23 10.73 16.23H12.51"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="pause-svg-elem-1"
        />
        <path
          d="M4 6C2.75 7.67 2 9.75 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2C10.57 2 9.2 2.3 7.97 2.85"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="pause-svg-elem-2"
        />
      </svg>

      <div className="bg-1"></div>
      <div className="bg-2"></div>
      <div className="bg-3"></div>
    </div>
  )
}
