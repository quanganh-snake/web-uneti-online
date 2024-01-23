import { useBem } from '@/Services/Hooks'

import './Button.scss'
import { useMemo } from 'react'

export default function Button(props) {
  const { children, type, icon = false, ...attrs } = props

  const bem = useBem('button')

  const className = useMemo(() => {
    return [bem.b(), bem.is('icon', icon), bem.is(type)]
      .filter((e) => e)
      .join(' ')
  }, [bem, type, icon])

  return (
    <div {...attrs} className={className}>
      {children}
    </div>
  )
}
