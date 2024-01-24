import { useNamespace } from '@/Services/Hooks'
import { RowContext } from '@/Services/Tokens'

import './Row.scss'
import { transformCls } from '@/Services/Utils/reactUtils'

export default function Row(props) {
  const ns = useNamespace('row')

  const { children, gutter = 0, justify = 'start', align } = props

  return (
    <>
      <RowContext.Provider
        value={{
          gutter,
        }}
      >
        <div
          className={transformCls([
            ns.b(),
            ns.is(`justify-${justify}`, justify !== 'start'),
            ns.is(`align-${align}`, !!align),
          ])}
          style={{
            marginLeft: `-${gutter / 2}px`,
            marginRight: `-${gutter / 2}px`,
          }}
        >
          {children}
        </div>
      </RowContext.Provider>
    </>
  )
}
