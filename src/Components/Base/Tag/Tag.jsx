import { useBem } from '@/Services/Hooks'

import './Tag.scss'

export default function Tag({ children }) {
  const bem = useBem('tag')

  return (
    <div className={bem.b()}>
      <span className={bem.e('content')}>{children}</span>
    </div>
  )
}
