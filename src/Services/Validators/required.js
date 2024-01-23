import { isEmpty, isNil } from 'lodash-unified'
import Swal from 'sweetalert2'

export const required = (val, text = '', title = 'Lỗi', icon = 'error') => {
    if (val === 0) return true

    if (!isEmpty(val) && !isNil(val)) return true

    Swal.fire({
        icon,
        title,
        text,
    })
    return false
}
