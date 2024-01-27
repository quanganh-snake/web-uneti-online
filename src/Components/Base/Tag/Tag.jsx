import { useNamespace } from '@/Services/Hooks'

import './Tag.scss'

export default function Tag({ children }) {
  const bem = useNamespace('tag')

  return (
    <div className={bem.b()}>
      <span className={bem.e('content')}>{children}</span>
    </div>
  )
}
