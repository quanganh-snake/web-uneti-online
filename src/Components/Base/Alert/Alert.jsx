import { useNamespace } from '@/Services/Hooks'

import './Alert.scss'

export const Alert = (props) => {
  const { title, content, type } = props

  const bem = useNamespace('alert')

  return (
    <>
      <div className={[bem.b(), bem.is(type)].join(' ')}>
        <p className={bem.e('title')}>{title}</p>
        <div className={bem.e('content')}>{content}</div>
      </div>
    </>
  )
}
