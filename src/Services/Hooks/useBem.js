const statePrefix = 'is-'
const defaultNamespace = 'uneti'

const _bem = (namespace, block, blockSuffix, element, modifier) => {
  let cls = `${namespace}-${block}`
  if (blockSuffix) {
    cls += `-${blockSuffix}`
  }
  if (element) {
    cls += `__${element}`
  }
  if (modifier) {
    cls += `--${modifier}`
  }
  return cls
}

export const useBem = (block, namespaceOverrides = '') => {
  const namespace = namespaceOverrides || defaultNamespace
  const b = (blockSuffix = '') => _bem(namespace, block, blockSuffix, '', '')
  const e = (element = '') =>
    element ? _bem(namespace, block, '', element, '') : ''
  const m = (modifier = '') =>
    modifier ? _bem(namespace, block, '', '', modifier) : ''
  const be = (blockSuffix = '', element = '') =>
    blockSuffix && element
      ? _bem(namespace, block, blockSuffix, element, '')
      : ''
  const em = (element = '', modifier = '') =>
    element && modifier ? _bem(namespace, block, '', element, modifier) : ''
  const bm = (blockSuffix = '', modifier = '') =>
    blockSuffix && modifier
      ? _bem(namespace, block, blockSuffix, '', modifier)
      : ''
  const bem = (blockSuffix = '', element = '', modifier = '') =>
    blockSuffix && element && modifier
      ? _bem(namespace, block, blockSuffix, element, modifier)
      : ''
  const is = (name, ...args) => {
    const state = args.length >= 1 ? args[0] : true
    return name && state ? `${statePrefix}${name}` : ''
  }

  // for css var
  // { 'color': #adcc }
  // --uneti-color: #adcc;
  const cssVar = (object) => {
    const styles = {}
    for (const key in object) {
      if (object[key]) {
        styles[`--${namespace}-${key}`] = object[key]
      }
    }
    return styles
  }
  // with block
  const cssVarBlock = (object) => {
    const styles = {}
    for (const key in object) {
      if (object[key]) {
        styles[`--${namespace}-${block}-${key}`] = object[key]
      }
    }
    return styles
  }
  const cssVarName = (name) => `--${namespace}-${name}`
  const cssVarBlockName = (name) => `--${namespace}-${block}-${name}`

  return {
    b,
    e,
    m,
    be,
    em,
    bm,
    bem,
    is,
    // css
    cssVar,
    cssVarName,
    cssVarBlock,
    cssVarBlockName,
  }
}
