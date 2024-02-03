import { rtfToHtml } from '@/Services/Utils/rtfjs'
import { convertBufferToBase64 } from '@/Services/Utils/stringUtils'
import { isArray } from 'lodash-unified'

// icon Loa ở trong câu hỏi, xoá đi vì nó ....xấu
const str = `<svg viewBox="0 0 529 529" preserveAspectRatio="none" width="15pt" height="15pt"><svg x="0" y="0" width="529" height="529" viewBox="0 0 529 529" preserveAspectRatio="none"><image x="0" y="0" width="529" height="529" xlink:href="data:image/bmp;base64,Qk3mBAAAAAAAADYAAAAoAAAAFAAAABQAAAABABgAAAAAALAEAADEDgAAxA4AAAAAAAAAAAAA09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PTubm5ZWVlsLCw09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PTsLCwLCwshISES0tL09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PTtLS0KSkpr6+vwsLCPT0909PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PTs7OzKSkpsLCw09PTwsLCPT0909PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PTsrKyKCgosLCw09PT09PTwsLCPT0909PT09PTjY2NT09Py8vL09PT09PT09PT09PTqKiocXFxcXFxXl5eJycnt7e309PT09PT09PTwsLCPT0909PT09PT09PTi4uLPz8/0dHR09PT09PT09PTJiYmjIyMjY2NLCwstbW109PT09PT09PT09PTwsLCPT09wsLCg4ODzc3N09PTampqf39/09PT09PT09PTKCgo09PT09PTLS0t09PT09PT09PT09PT09PTwsLCPT09zs7OcXFxQkJC09PTx8fHMTEx09PT09PT09PTKCgo09PT09PTLS0t09PT09PT09PT09PT09PTwsLCPT0909PT09PTS0tLra2t09PTLS0t0dHR09PT09PTKCgo09PT09PTLS0t09PT09PT09PT09PT09PTwsLCPT0909PT09PTVFRUpaWl09PTLy8vz8/P09PT09PTKCgo09PT09PTLS0t09PT09PT09PT09PT09PTwsLCPT090tLSjY2NLi4u0dHRzMzMLS0t09PT09PT09PTJCQktLS0t7e3MjIyx8fH09PT09PT09PT09PTwsLCPT09vb29WlpawsLC09PTenp6cnJy09PT09PT09PTj4+PPDw8ODg4Li4uNjY2x8fH09PT09PT09PTwsLCPT0909PT09PT09PTqqqqMTExy8vL09PT09PT09PT09PT09PT09PT09PTkJCQOzs7y8vL09PT09PTwsLCPT0909PT09PTkpKSNzc3vLy809PT09PT09PT09PT09PT09PT09PT09PT09PTkZGROzs7y8vL09PTwsLCPT0909PT09PTxMTE0dHR09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PTkZGROzs7ysrKwsLCPT0909PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PTmJiYNDQ0q6urRERE09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PTn5+fMDAwmpqa09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT"></image></svg></svg>`

export const convertQuestionToHtml = async (question) => {
  const [CauHoi, CauHoiCha, CauTraLoi1, CauTraLoi2, CauTraLoi3, CauTraLoi4] =
    await Promise.all([
      await rtfToHtml(question.CauHoi),
      await rtfToHtml(question.CauHoiCha),
      await rtfToHtml(question.CauTraLoi1),
      await rtfToHtml(question.CauTraLoi2),
      await rtfToHtml(question.CauTraLoi3),
      await rtfToHtml(question.CauTraLoi4),
    ]).then(([...res]) => {
      return res.map((e) => {
        const arr = isArray(e) ? e : [e]

        return (
          arr
            .map((element) => element.innerHTML)
            .join('')
            .replace(str, '')
            // replace [Img_xxxxx.xxx] or [Audio_xxxxx.xxx] from questions
            .replace(/\[(Img|Audio)_[^\]]+\]/g, '')
        )
      })
    })

  return {
    ...question,
    CauHoi,
    CauHoiCha,
    CauTraLoi1,
    CauTraLoi2,
    CauTraLoi3,
    CauTraLoi4,
    AnhCauHoiCon_1: convertBufferToBase64(question.AnhCauHoiCon_1?.data),
    AnhCauHoiCon_2: convertBufferToBase64(question.AnhCauHoiCon_2?.data),
    AnhCauHoiCon_3: convertBufferToBase64(question.AnhCauHoiCon_3?.data),
    AnhCauHoiCon_4: convertBufferToBase64(question.AnhCauHoiCon_4?.data),
    AnhCauHoiCon_5: convertBufferToBase64(question.AnhCauHoiCon_5?.data),

    AnhCauHoiCha_1: convertBufferToBase64(question.AnhCauHoiCha_1?.data),
    AnhCauHoiCha_2: convertBufferToBase64(question.AnhCauHoiCha_2?.data),
    AnhCauHoiCha_3: convertBufferToBase64(question.AnhCauHoiCha_3?.data),
    AnhCauHoiCha_4: convertBufferToBase64(question.AnhCauHoiCha_4?.data),
    AnhCauHoiCha_5: convertBufferToBase64(question.AnhCauHoiCha_5?.data),
  }
}
