export const unrefElement = (target) => {
    if (target && 'current' in target) {
        return target.current
    }
    return target
}
