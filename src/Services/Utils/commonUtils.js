// Kiểm tra 2 object cùng key nhưng khác giá trị không?
export const checkConditionObject = (currentObject, newObject) => {
  for (let key in newObject) {
    if (key in currentObject && currentObject[key] !== newObject[key]) {
      return true
    }
  }
  return false
}

// Kiểm tra object chứa giá trị rỗng hay không
export const isEmptyKeyObject = (currentObject = {}) => {
  for (var key in currentObject) {
    if (currentObject.hasOwnProperty(key)) {
      if (
        currentObject[key] === null ||
        currentObject[key] === undefined ||
        currentObject[key] === ''
      ) {
        return true
      }
    }
  }
  return false
}
