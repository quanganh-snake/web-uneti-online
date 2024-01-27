import { useNamespace } from '@/Services/Hooks'

export const RadioIcon = ({ children }) => {
  const bem = useNamespace('radio')

  return (
    <>
      <span className={bem.em('effect', 'icon')}>{children}</span>
    </>
  )
}
