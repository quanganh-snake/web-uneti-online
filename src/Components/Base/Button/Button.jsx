import { useBem } from '@/Services/Hooks'

import './Button.scss'

export default function Button(props) {
  const { children } = props

  const bem = useBem('button')

  return <div className={bem.b()}>{children}</div>
}
