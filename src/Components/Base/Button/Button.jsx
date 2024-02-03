import { useNamespace } from '@/Services/Hooks'

import { transformCls } from '@/Services/Utils/reactUtils'

import './Button.scss'

export default function Button(props) {
  const {
    children,
    type,
    disabled = false,
    icon = false,
    color,
    ...attrs
  } = props

  const bem = useNamespace('button')

  return (
    <div
      {...attrs}
      className={transformCls([
        bem.b(),
        bem.is('icon', icon),
        bem.is(type),
        bem.is(`color-${color}`),
        bem.is(`disabled`, disabled),
      ])}
    >
      {children}
    </div>
  )
}
