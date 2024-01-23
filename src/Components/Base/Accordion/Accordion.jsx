import { useBem } from '@/Services/Hooks'

import { forwardRef, useMemo, useReducer } from 'react'
import { transformCls } from '@/Services/Utils/reactUtils'

import { AccordionContext } from './constants'
import { AccordionAction, reducer } from './reducer'

import AccordionLabel from '../AccordionLabel/AccordionLabel'
import AccordionContent from '../AccordionContent/AccordionContent'

import './Accordion.scss'
import { useImperativeHandle } from 'react'

export const Accordion = forwardRef(
    ({ children, className, ...attrs }, ref) => {
        const bem = useBem('accordion')

        const [state, dispatch] = useReducer(reducer, {
            isAccordion: true,
            isOpen: false,
        })

        const accordionCls = useMemo(
            () =>
                transformCls([
                    className,
                    bem.b(),
                    bem.is('open', state.isOpen),
                ]),
            [bem, state.isOpen],
        )

        const onToggle = () => {
            dispatch(AccordionAction.TOGGLE)
        }

        const open = () => {
            dispatch(AccordionAction.OPEN)
        }

        const close = () => {
            dispatch(AccordionAction.CLOSE)
        }

        useImperativeHandle(ref, () => ({
            isOpen: state.isOpen,
            toggle: onToggle,
            open,
            close,
        }))

        return (
            <AccordionContext.Provider value={{ ...state, dispatch }}>
                <div className={accordionCls} {...attrs}>
                    {children}
                </div>
            </AccordionContext.Provider>
        )
    },
)

Accordion.Label = AccordionLabel
Accordion.Content = AccordionContent

export default Accordion
