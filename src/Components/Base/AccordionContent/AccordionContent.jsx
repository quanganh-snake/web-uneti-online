import { useContext, useRef } from 'react'

import { useBem } from '@/Services/Hooks'
import { AccordionContext } from '../Accordion/constants'

import './AccordionContent.scss'
import { transformCls } from '@/Services/Utils/reactUtils'

export default function AccordionContent({
  children,
  className = '',
  ...attrs
}) {
  const accordionCtx = useContext(AccordionContext)

  const bem = useBem('accordion')

  const contentRef = useRef()

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
        height: accordionCtx.isOpen ? contentRef.current.clientHeight : '0',
      }}
      {...attrs}
    >
      <div ref={contentRef} className={bem.e('content')}>
        {children}
      </div>
    </div>
  )
}
