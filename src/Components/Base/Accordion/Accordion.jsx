import { useBem } from '@/Services/Hooks'

import { useMemo, useReducer } from 'react'
import { transformCls } from '@/Services/Utils/reactUtils'

import { AccordionContext } from './constants'
import { reducer } from './reducer'

import AccordionLabel from '../AccordionLabel/AccordionLabel'
import AccordionContent from '../AccordionContent/AccordionContent'

import './Accordion.scss'

export default function Accordion({ children, className, ...attrs }) {
  const bem = useBem('accordion')

  const [state, dispatch] = useReducer(reducer, {
    isAccordion: true,
    isOpen: false,
  })

  const accordionCls = useMemo(
    () => transformCls([className, bem.b(), bem.is('open', state.isOpen)]),
    [bem, state.isOpen],
  )

  return (
    <AccordionContext.Provider value={{ ...state, dispatch }}>
      <div className={accordionCls} {...attrs}>
        {children}
      </div>
    </AccordionContext.Provider>
  )
}

Accordion.Label = AccordionLabel
Accordion.Content = AccordionContent
