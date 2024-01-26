import Dayjs from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import weekday from 'dayjs/plugin/weekday'
import calendar from 'dayjs/plugin/calendar'

Dayjs.extend(calendar)
Dayjs.extend(weekOfYear)
Dayjs.extend(weekday)

export const dayjs = Dayjs

export const compareWeekInYear = (firstDay, sDay) => {
  if (dayjs(firstDay).year() !== dayjs(sDay).year()) return false

  return dayjs(firstDay).week() === dayjs(sDay).week()
}
