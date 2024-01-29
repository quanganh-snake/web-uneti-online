import { RTFJS, EMFJS, WMFJS } from 'rtf.js'
import { stringToArrayBuffer } from './stringUtils'

RTFJS.loggingEnabled(false)
WMFJS.loggingEnabled(false)
EMFJS.loggingEnabled(false)

export { RTFJS, EMFJS, WMFJS }

export function rtfToHtml(rtfFormat) {
  const doc = new RTFJS.Document(stringToArrayBuffer(rtfFormat))
  return doc.render()
}
