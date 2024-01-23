export const retries = async (callback, numRetries = 3) => {
    try {
        await callback()
    } catch (e) {
        if (numRetries > 0) {
            retries(callback, numRetries - 1)
        } else {
            throw e
        }
    }
}
