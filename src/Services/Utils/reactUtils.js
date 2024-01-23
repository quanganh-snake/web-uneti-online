export const unrefElement = (target) => {
    if (target && 'current' in target) {
        return target.current
    }
    return target
}

export const transformCls = (cls) => cls.filter((e) => e).join(' ')
