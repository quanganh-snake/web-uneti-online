import { useNamespace } from '@/Services/Hooks'
import { transformCls } from '@/Services/Utils/reactUtils'
import { useMemo } from 'react'

import './Radio.scss'

export const Radio = (props) => {
  const bem = useNamespace('radio')

  const {
    /**
     * @value `start` | `center` | `end`
     */
    align = 'center',
    disabled,
    loading,
    value,
    modelValue,
    label,
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
      bem.is(`align-${align}`),
    ])
  }, [bem, loading, isDisabled, isChecked, color])

  const handleChange = () => {
    onClick()

    if (disabled || loading) return

    onChange(value)
  }

  return (
    <>
      <div className={radioCls} onClick={handleChange}>
        <div className={bem.b()}>
          <div className={bem.e('original')} />

          <span className={bem.e('effect')}></span>
        </div>

        {/* Ưu tiên hiển thị label, sau đó mới tới default slot */}
        <div className={bem.e('label')}>{label ? label : children}</div>
      </div>
    </>
  )
}
