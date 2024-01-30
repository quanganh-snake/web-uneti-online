import { useNamespace } from '@/Services/Hooks'

import './Icon.scss'

export default function Icon(props) {
  const { size = 18, children } = props

  const ns = useNamespace('icon')

  return (
    <i className={ns.b()} style={{ fontSize: `${size}px` }}>
      {children}
    </i>
  )
}
