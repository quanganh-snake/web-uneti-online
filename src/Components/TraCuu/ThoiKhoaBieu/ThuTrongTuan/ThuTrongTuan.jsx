import { getStartOfWeek } from '@/Pages/Clients/TraCuu/ThoiKhoaBieu/utils'
import { dayjs } from '@/Services/Utils/dayjs'
import { useMemo } from 'react'

const THU = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ Nhật']

export default function ThuTrongTuan(props) {
  const { currentDate } = props || {}

  const list = useMemo(() => {
    const startOfWeek = getStartOfWeek(currentDate)
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
  }, [currentDate])

  return (
    <div>
      <div className="flex">
        <div className="flex flex-col w-60">
          <div className="w-[100px] bg-uneti-primary text-white font-semibold flex justify-center items-center h-full border-b border-r border-white border-opacity-30">
            Ca
          </div>
        </div>
        {list.map((e, i) => {
          return (
            <div
              className="flex flex-col bg-uneti-primary text-white w-60 min-w-[220px] px-2 border-b border-r border-white border-opacity-30 last:border-r-0"
              key={`s-col-${i}`}
            >
              <div className="flex flex-col justify-center items-center font-semibold  py-2">
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
