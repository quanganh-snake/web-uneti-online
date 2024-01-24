import { useNamespace } from '@/Services/Hooks'
import { transformCls } from '@/Services/Utils/reactUtils'

import { useContext } from 'react'
import { RowContext } from '@/Services/Tokens'

import './Col.scss'
import { useMemo } from 'react'
import { concat, isNumber, isObject } from 'lodash-unified'

export default function Col(props) {
  const { children } = props

  const rowProvider = useContext(RowContext)

  const ns = useNamespace('col')

  const gutter = useMemo(() => {
    return rowProvider.gutter || 0
  }, [rowProvider])

  const colClasses = useMemo(() => {
    const classes = []
    const pos = ['span', 'offset', 'pull', 'push']

    pos.forEach((prop) => {
      const size = props[prop]
      if (isNumber(size)) {
        if (prop === 'span') classes.push(ns.b(`${props[prop]}`))
        else if (size > 0) classes.push(ns.b(`${prop}-${props[prop]}`))
      }
    })

    const sizes = ['xs', 'sm', 'md', 'lg', 'xl']

    sizes.forEach((size) => {
      if (isNumber(props[size])) {
        classes.push(ns.b(`${size}-${props[size]}`))
      } else if (isObject(props[size])) {
        Object.entries(props[size]).forEach(([prop, sizeProp]) => {
          classes.push(
            prop !== 'span'
              ? ns.b(`${size}-${prop}-${sizeProp}`)
              : ns.b(`${size}-${sizeProp}`),
          )
        })
      }
    })

    if (gutter) {
      classes.push(ns.is('guttered'))
    }
    return transformCls(concat(ns.b(), classes))
  }, [gutter, props])

  return (
    <div
      className={colClasses}
      style={{
        paddingLeft: `${gutter / 2}px`,
        paddingRight: `${gutter / 2}px`,
      }}
    >
      {children}
    </div>
  )
}
