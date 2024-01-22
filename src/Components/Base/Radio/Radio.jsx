import { useBem } from '@/Services/Hooks'
import { transformCls } from '@/Services/Utils/reactUtils'
import { useMemo } from 'react'

import './Radio.scss'

export const Radio = (props) => {
  const bem = useBem('radio')

  const uid = Math.floor(Math.random() * 10000)

  const {
    disabled,
    loading,
    value,
    modelValue,
    label,
    name,
    onChange,
    children,
  } = props

  const isDisabled = useMemo(() => disabled || loading, [disabled, loading])

  const checked = useMemo(() => value == modelValue, [value, modelValue])

  const radioCls = useMemo(() => {
    return transformCls([
      bem.b('wrapper'),
      bem.is('loading', loading),
      bem.is('disabled', isDisabled),
      bem.is('active', checked),
    ])
  }, [loading, isDisabled, checked])

  const handleChange = () => {
    onChange(value)
  }

  return (
    <>
      <div className={radioCls}>
        <div className={bem.b()}>
          <input
            id={uid}
            value={value}
            onChange={handleChange}
            type="radio"
            disabled={isDisabled}
            readOnly={isDisabled}
            name={name}
          />

          <span className={bem.e('effect')}>
            {loading ? (
              <span className={bem.em('effect', 'loading')}>
                <icon-loading />
              </span>
            ) : null}
          </span>
        </div>

        {/* Ưu tiên hiển thị label, sau đó mới tới default slot */}
        {label ? (
          <label htmlFor={uid} className={bem.e('label')}>
            {label}
          </label>
        ) : children ? (
          children
        ) : null}
      </div>
    </>
  )
}
