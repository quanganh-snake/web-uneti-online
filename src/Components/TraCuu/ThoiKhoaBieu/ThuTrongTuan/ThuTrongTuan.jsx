import { dayjs } from '@/Services/Utils/dayjs'
import { useMemo } from 'react'

const THU = ['2', '3', '4', '5', '6', '7', '0']

export default function ThuTrongTuan(props) {
  const { startOfWeek } = props || {}

  const list = useMemo(() => {
    const daysInWeek = []

    for (let i = 0; i < 7; i++) {
      const day = startOfWeek.add(i, 'day')
      daysInWeek.push(day)
    }

    // daysInWeek: { name: 'T2', date: Date }[]
    const result = daysInWeek.map((day, index) => ({
      name: `${THU[index]}`,
      date: day,
    }))

    return result
  }, [startOfWeek])

  return (
    <div>
      <div className="flex">
        <div className="flex flex-col w-60">
          <div className="w-[100px] font-semibold flex justify-center items-center h-full border-b border-r border-uneti-primary border-opacity-30">
            Ca
          </div>
        </div>
        {list.map((e, i) => {
          return (
            <div
              className="flex flex-col w-60 min-w-[220px] px-2 border-b border-r border-uneti-primary border-opacity-30 last:border-r-0"
              key={`s-col-${i}`}
            >
              <div className="flex flex-col justify-center items-center font-semibold text-uneti-primary py-2">
                <span>{e.name}</span>
                <span>{dayjs(e.date).format('DD/MM/YYYY')}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
