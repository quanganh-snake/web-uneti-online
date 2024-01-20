const statePrefix = 'is-'

const _bem = (block, blockSuffix, element, modifier) => {
    let cls = `${block}`
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

export const useBem = (block) => {
    const b = (blockSuffix = '') => _bem(block, blockSuffix, '', '')
    const e = (element = '') => (element ? _bem(block, '', element, '') : '')
    const m = (modifier = '') => (modifier ? _bem(block, '', '', modifier) : '')
    const be = (blockSuffix = '', element = '') =>
        blockSuffix && element ? _bem(block, blockSuffix, element, '') : ''
    const em = (element = '', modifier = '') =>
        element && modifier ? _bem(block, '', element, modifier) : ''
    const bm = (blockSuffix = '', modifier = '') =>
        blockSuffix && modifier ? _bem(block, blockSuffix, '', modifier) : ''
    const bem = (blockSuffix = '', element = '', modifier = '') =>
        blockSuffix && element && modifier
            ? _bem(block, blockSuffix, element, modifier)
            : ''
    const is = (name, ...args) => {
        const state = args.length >= 1 ? args[0] : true
        return name && state ? `${statePrefix}${name}` : ''
    }

    // for css var
    // { 'color': #adcc }
    // --color: #adcc;
    const cssVar = (object) => {
        const styles = {}
        for (const key in object) {
            if (object[key]) {
                styles[`--${key}`] = object[key]
            }
        }
        return styles
    }
    // with block
    const cssVarBlock = (object) => {
        const styles = {}
        for (const key in object) {
            if (object[key]) {
                styles[`--${block}-${key}`] = object[key]
            }
        }
        return styles
    }

    const cssVarName = (name) => `--${name}`
    const cssVarBlockName = (name) => `--${block}-${name}`

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
