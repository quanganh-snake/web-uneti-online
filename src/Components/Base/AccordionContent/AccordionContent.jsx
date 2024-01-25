import { useContext, useRef } from 'react'

import { useBem } from '@/Services/Hooks'
import { AccordionContext } from '../Accordion/constants'

import './AccordionContent.scss'
import { transformCls } from '@/Services/Utils/reactUtils'
import { useState } from 'react'
import { useEffect } from 'react'
import { useCallback } from 'react'

export default function AccordionContent({
  children,
  className = '',
  ...attrs
}) {
  const accordionCtx = useContext(AccordionContext)

  const bem = useBem('accordion')

  const contentRef = useRef()

  const [height, setHeight] = useState('0')

  const calcContentHeight = useCallback(() => {
    setHeight(accordionCtx.isOpen ? contentRef.current.scrollHeight : '0')
  }, [accordionCtx.isOpen])

  useEffect(() => {
    calcContentHeight()

    window.addEventListener('resize', calcContentHeight)

    return () => {
      window.removeEventListener('resize', calcContentHeight)
    }
  }, [accordionCtx.isOpen, calcContentHeight])

  if (!accordionCtx?.isAccordion) {
    console.warn(
      '~ Components - Accordion - Content: AccordionContent need to called inside the Accordion component',
    )
    return ''
  }

  return (
    <div
      className={transformCls([className, bem.e('wrapper')])}
      style={{
        height: height,
      }}
      {...attrs}
    >
      <div ref={contentRef} className={bem.e('content')}>
        {children}
      </div>
    </div>
  )
}
