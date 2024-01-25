import { Radio } from '@/Components/Base/Radio/Radio'
import { convertRtfToText } from '@/Services/Utils/stringUtils'
import { useMemo, useState } from 'react'

export default function CauHoi(props) {
  const {
    STT = 1,
    ID,
    CauHoi,
    CauTraLoi1,
    IDCauTraLoi1,
    CauTraLoi2,
    IDCauTraLoi2,
    CauTraLoi3,
    IDCauTraLoi3,
    CauTraLoi4,
    IDCauTraLoi4,
  } = props

  const [selected, setSelected] = useState(null)

  const doc = useMemo(() => convertRtfToText(CauHoi), [CauHoi])

  return (
    <>
      <div className="bg-white text-vs-theme-color text-sm select-none rounded-[20px] border-2 p-5 border-slate-200 padding">
        <div className="flex mb-3 text-base text-vs-text">
          <span
            className="font-semibold"
            dangerouslySetInnerHTML={{
              __html: `<span style="margin-right: 0.2rem; color: #FF4757;">Câu hỏi ${STT}:</span> ${doc}`,
            }}
          />
        </div>

        <div className="flex flex-col gap-3">
          <Radio
            id={IDCauTraLoi1}
            modelValue={selected}
            name={ID}
            value={IDCauTraLoi1}
            onChange={(id) => setSelected(id)}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: convertRtfToText(CauTraLoi1),
              }}
            />
          </Radio>

          <Radio
            id={IDCauTraLoi2}
            modelValue={selected}
            name={ID}
            value={IDCauTraLoi2}
            onChange={(id) => setSelected(id)}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: convertRtfToText(CauTraLoi2),
              }}
            />
          </Radio>

          <Radio
            id={IDCauTraLoi3}
            modelValue={selected}
            name={ID}
            value={IDCauTraLoi3}
            onChange={(id) => setSelected(id)}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: convertRtfToText(CauTraLoi3),
              }}
            />
          </Radio>

          <Radio
            id={IDCauTraLoi4}
            modelValue={selected}
            name={ID}
            value={IDCauTraLoi4}
            onChange={(id) => setSelected(id)}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: convertRtfToText(CauTraLoi4),
              }}
            />
          </Radio>
        </div>
      </div>
    </>
  )
}
