import { dayjs } from '@/Services/Utils/dayjs'

export const getDate = (curr) => {
  return dayjs(curr.NgayBatDau || curr.NgayThi)
}

export const isDateInWeek = (currDate, otherDate) => {
  const startOfWeek = getStartOfWeek(currDate)
  const endOfWeek = startOfWeek.add(6, 'day')

  return dayjs(otherDate).isBetween(startOfWeek, endOfWeek, null, '[]')
}

// chuẩn iosWeek, sử dụng chuẩn ISO 8601 với tuần bắt đầu vào Thứ 2, kết thúc Chủ Nhật
export const getStartOfWeek = (currDate) => dayjs(currDate).startOf('isoWeek')

export const buildTableRow = (listLich) => {
  let res = new Array(7)
  for (let i = 0; i < 7; i++) res[i] = []

  listLich.forEach((curr) => {
    const weekDay = getDate(curr).isoWeekday() - 1
    res[weekDay].push(curr)
  })

  return res
}
