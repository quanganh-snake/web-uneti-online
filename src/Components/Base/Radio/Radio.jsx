import { useNamespace } from '@/Services/Hooks'
import { transformCls } from '@/Services/Utils/reactUtils'
import { useMemo } from 'react'

import './Radio.scss'

export const Radio = (props) => {
  const bem = useNamespace('radio')

  const uid = Math.floor(Math.random() * 10000)

  const {
    id,
    disabled,
    loading,
    value,
    modelValue,
    label,
    name,
    onChange = () => null,
    children,
    checked,
    onClick = () => null,
    color = 'primary',
  } = props

  const isDisabled = useMemo(() => disabled || loading, [disabled, loading])

  const isChecked = useMemo(
    () => checked || value == modelValue,
    [checked, value, modelValue],
  )

  const radioCls = useMemo(() => {
    return transformCls([
      bem.b('wrapper'),
      bem.is('loading', loading),
      bem.is('disabled', isDisabled),
      bem.is('active', isChecked),
      bem.is(`color-${color}`),
    ])
  }, [bem, loading, isDisabled, isChecked, color])

  const handleChange = () => {
    onChange(value)
  }

  return (
    <>
      <div className={radioCls} onClick={onClick}>
        <div className={bem.b()}>
          <input
            id={id ?? uid}
            onChange={handleChange}
            type="radio"
            disabled={isDisabled}
            readOnly={isDisabled}
            name={name}
            value={value}
            checked={isChecked}
          />

          <span className={bem.e('effect')}>
            {/* {loading ? (
              <span className={bem.em('effect', 'loading')}>
                <icon-loading />
              </span>
            ) : null} */}
          </span>
        </div>

        {/* Ưu tiên hiển thị label, sau đó mới tới default slot */}
        <label htmlFor={id ?? uid} className={bem.e('label')}>
          {label ? label : children}
        </label>
      </div>
    </>
  )
}
