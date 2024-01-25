import { useBem } from '@/Services/Hooks'

export const RadioIcon = ({ children }) => {
  const bem = useBem('radio')

  return (
    <>
      <span className={bem.em('effect', 'icon')}>{children}</span>
    </>
  )
}
