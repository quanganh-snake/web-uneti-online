import { isEmpty, isNil } from 'lodash-unified'
import Swal from 'sweetalert2'

export const required = (val, text = '', title = 'Lỗi', icon = 'error') => {
  if ((!isEmpty(val) && !isNil(val)) || val === 0) return true

  Swal.fire({
    icon,
    title,
    text,
  })
  return false
}
