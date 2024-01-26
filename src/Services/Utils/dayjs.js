import Dayjs from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import weekday from 'dayjs/plugin/weekday'
import calendar from 'dayjs/plugin/calendar'
import isBetween from 'dayjs/plugin/isBetween'
import isoWeek from 'dayjs/plugin/isoWeek'

Dayjs.extend(isoWeek)
Dayjs.extend(isBetween)
Dayjs.extend(calendar)
Dayjs.extend(weekOfYear)
Dayjs.extend(weekday)

export const dayjs = Dayjs
