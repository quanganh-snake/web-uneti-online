import { keys } from 'lodash-unified'

// Kiểm tra 2 object cùng key nhưng khác giá trị không?
export const checkConditionObject = (currentObject, newObject) => {
  for (let key in newObject) {
    if (key in currentObject && currentObject[key] !== newObject[key]) {
      return true
    }
  }
  return false
}

export const transformKeys = (obj, newKey) => {
  if (typeof newKey !== 'function') {
    throw 'Utils(transformKeys): [newKey] must be typeof function: (key) => newKeyValue'
  }
  return keys(obj).reduce((res, key) => {
    let _newKey = newKey(key)

    res[_newKey] = obj[key]

    return res
  }, {})
}

export const excludeKeys = (obj, keysToExclude = []) => {
  if (typeof keysToExclude === 'string') {
    keysToExclude = [keysToExclude]
  }

  return keys(obj).reduce((res, key) => {
    if (!keysToExclude.includes(key)) {
      res[key] = obj[key]
    }

    return res
  }, {})
}
