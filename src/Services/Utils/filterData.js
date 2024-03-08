export const filterData = (array, filters) => {
  return array?.filter((item) => {
    for (const key in filters) {
      const filterValue = filters[key]
      const itemValue = item[key]

      if (
        filterValue &&
        String(itemValue)
          .toLowerCase()
          .indexOf(String(filterValue).toLowerCase()) === -1
      ) {
        return false
      }
    }
    return true
  })
}

export const isDuplicateValueObjectInArray = (
  newObject,
  array = [],
  keyObject,
) => {
  return array.some((item) => item[keyObject] === newObject[keyObject])
}
