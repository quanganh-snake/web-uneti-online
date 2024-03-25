import { useNamespace, useClickOutside } from '@/Services/Hooks'
import { useRef, useImperativeHandle, forwardRef } from 'react'

import './Dialog.scss'
import { createPortal } from 'react-dom'
import { transformCls } from '@/Services/Utils/reactUtils'

export const Dialog = forwardRef((props, ref) => {
  const bem = useNamespace('dialog')

  const {
    footer,
    header,
    children,
    isOpen,
    setIsOpen,
    noPadding = false,
    headerCenter = true,
    headerClass = '',
  } = props

  const dialogRef = useRef()
  const dialogOriginalRef = useRef()

  const handleCloseDialog = () => {
    addTransitionClose()

    setTimeout(() => {
      setIsOpen(false)
    }, 140)
  }

  const addTransitionClose = () => {
    dialogRef.current?.classList.add(bem.is('close'))
  }

  useClickOutside(dialogOriginalRef, handleCloseDialog)

  useImperativeHandle(ref, () => ({
    close: handleCloseDialog,
  }))

  return createPortal(
    <>
      {isOpen && (
        <div ref={dialogRef} className={bem.b()}>
          <div ref={dialogOriginalRef} className={bem.e('original')}>
            <div
              className={transformCls([
                bem.e('header'),
                bem.is('center', headerCenter == true),
                headerClass,
              ])}
            >
              {/* Btn close */}
              <div className={bem.e('close')} onClick={handleCloseDialog}>
                <svg
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 12.75H6c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h12c.41 0 .75.34.75.75s-.34.75-.75.75Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M12 18.75c-.41 0-.75-.34-.75-.75V6c0-.41.34-.75.75-.75s.75.34.75.75v12c0 .41-.34.75-.75.75Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>

              {header}
            </div>

            <div className={bem.e('content')}>{children}</div>

            <div className={bem.e('footer')}>{footer}</div>
          </div>
        </div>
      )}
    </>,
    document.body,
  )
})

Dialog.displayName = 'Dialog'

export default Dialog
