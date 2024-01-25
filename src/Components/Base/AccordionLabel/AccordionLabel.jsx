import { useContext } from 'react'

import { useBem } from '@/Services/Hooks'

import { AccordionContext } from '../Accordion/constants'
import { AccordionAction } from '../Accordion/reducer'

import ArrowRight from '../Icons/ArrowRight'

import './AccordionLabel.scss'
import { transformCls } from '@/Services/Utils/reactUtils'

export default function AccordionLabel({ children, className = '', ...attrs }) {
  const accordionCtx = useContext(AccordionContext)

  const bem = useBem('accordion')

  if (!accordionCtx?.isAccordion) {
    console.warn(
      '~ Components - Accordion - Label: AccordionLabel need to called inside the Accordion component',
    )
    return ''
  }

  return (
    <>
      <div
        onClick={() => accordionCtx.dispatch(AccordionAction.TOGGLE)}
        className={transformCls([className, bem.e('label')])}
        {...attrs}
      >
        <ArrowRight className={bem.e('icon')} />

        <h3>{children}</h3>
      </div>
    </>
  )
}
