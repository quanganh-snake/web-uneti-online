import { dayjs } from '@/Services/Utils/dayjs'
import { useNamespace } from '@/Services/Hooks'

import './Datepicker.scss'

export default function Datepicker(props) {
  const { modelValue, onUpdateModelValue } = props

  const ns = useNamespace('datepicker')

  const handleChangeSelectedDay = (e) => {
    onUpdateModelValue(dayjs(e.target.value))
  }

  return (
    <>
      {/* Date header */}
      <div>
        <input
          className={ns.e('input')}
          type="date"
          data-date={modelValue.format('DD-MM-YYYY')}
          value={modelValue.format('YYYY-MM-DD')}
          onChange={handleChangeSelectedDay}
        />
      </div>
    </>
  )
}
