import { useBem } from '@/Services/Hooks'

import './Alert.scss'

export const Alert = (props) => {
  const { title, content, type } = props

  const bem = useBem('alert')

  return (
    <>
      <div className={[bem.b(), bem.is(type)].join(' ')}>
        <p className={bem.e('title')}>{title}</p>
        <p className={bem.e('content')}>{content}</p>
      </div>
    </>
  )
}
