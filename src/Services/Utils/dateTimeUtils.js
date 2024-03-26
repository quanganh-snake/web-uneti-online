export const compareDateTime = (dateTime1, dateTime2) => {
  let newDateTime1 = new Date(dateTime1)

  console.log(
    '🚀 ~ file: dateTimeUtils.js:4 ~ compareDateTime ~ newDateTime1:',
    newDateTime1,
  )

  let newDateTime2 = new Date(dateTime2)

  console.log(
    '🚀 ~ file: dateTimeUtils.js:8 ~ compareDateTime ~ newDateTime2:',
    newDateTime2,
  )

  if (newDateTime1 < newDateTime2) {
    return -1
  } else if (newDateTime1 === newDateTime2) {
    return 0
  } else {
    return 1
  }
}

export const compareDateWithoutTime = (dateTime1, dateTime2) => {
  let newDateTime1 = new Date(dateTime1)
  newDateTime1.setHours(0, 0, 0, 0)
  let newDateTime2 = new Date(dateTime2)
  newDateTime2.setHours(0, 0, 0, 0)

  if (newDateTime1 < newDateTime2) {
    return -1
  } else if (newDateTime1 === newDateTime2) {
    return 0
  } else {
    return 1
  }
}
