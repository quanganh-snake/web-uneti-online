import { useBem } from '@/Services/Hooks'

import { transformCls } from '@/Services/Utils/reactUtils'

import './Button.scss'

export default function Button(props) {
  const { children, type, icon = false, color, ...attrs } = props

  const bem = useBem('button')

  return (
    <div
      {...attrs}
      className={transformCls([
        bem.b(),
        bem.is('icon', icon),
        bem.is(type),
        bem.is(`color-${color}`),
      ])}
    >
      {children}
    </div>
  )
}
