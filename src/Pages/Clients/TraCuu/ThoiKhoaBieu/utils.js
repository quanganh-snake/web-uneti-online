import { dayjs } from '@/Services/Utils/dayjs'

export const getDate = (curr) => {
  return dayjs(curr.NgayBatDau || curr.NgayThi)
}

export const buildTableRow = (listLich) => {
  let res = new Array(7)
  for (let i = 0; i < 7; i++) res[i] = []

  listLich.forEach((curr) => {
    const weekDay = getDate(curr).weekday()
    res[weekDay].push(curr)
  })

  return res
}
