import { keys } from 'lodash-unified'

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

// TODO: create utils: excludeKeys
