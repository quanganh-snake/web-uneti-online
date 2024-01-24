import { Radio } from '@/Components/Base/Radio/Radio'
import { OnTapContext } from '@/Services/Tokens'
import { convertRtfToText } from '@/Services/Utils/stringUtils'
import { useContext } from 'react'

export default function CauHoi(props) {
  const {
    STT = 1,
    ID = null,
    CauHoi = undefined,
    CauHoiCha = undefined,
    CauTraLoi1 = undefined,
    IDCauTraLoi1 = undefined,
    CauTraLoi2 = undefined,
    IDCauTraLoi2 = undefined,
    CauTraLoi3 = undefined,
    IDCauTraLoi3 = undefined,
    CauTraLoi4 = undefined,
    IDCauTraLoi4 = undefined,
    IDCauTraLoiDung = undefined,
  } = props

  const danhSachCauHoiContext = useContext(OnTapContext)

  const handleChange = (IDCauTraLoi) => {
    danhSachCauHoiContext.handleSelected(ID, IDCauTraLoi)
  }

  return (
    <>
      <div className="bg-white text-vs-theme-color text-sm select-none rounded-[20px] border-2 p-5 border-slate-200 padding">
        {CauHoiCha ? (
          <div
            dangerouslySetInnerHTML={{
              __html: convertRtfToText(CauHoiCha),
            }}
          />
        ) : null}
        <div className="flex mb-3 text-base text-vs-text">
          <span
            className="font-semibold"
            dangerouslySetInnerHTML={{
              __html: `<span style="margin-right: 0.2rem; color: #FF4757;">Câu hỏi ${STT}:</span> ${convertRtfToText(CauHoi)}`,
            }}
          />
        </div>

        <div className="flex flex-col gap-3">
          <Radio
            id={IDCauTraLoi1}
            checked={danhSachCauHoiContext.selected[ID] == IDCauTraLoi1}
            name={ID}
            value={IDCauTraLoi1}
            onChange={handleChange}
            color={IDCauTraLoiDung == IDCauTraLoi1 ? 'success' : 'danger'}
          >
            <div
              dangerouslySetInnerHTML={{ __html: convertRtfToText(CauTraLoi1) }}
            />
          </Radio>

          <Radio
            id={IDCauTraLoi2}
            checked={danhSachCauHoiContext.selected[ID] == IDCauTraLoi2}
            name={ID}
            value={IDCauTraLoi2}
            onChange={handleChange}
            color={IDCauTraLoiDung == IDCauTraLoi2 ? 'success' : 'danger'}
          >
            <div
              dangerouslySetInnerHTML={{ __html: convertRtfToText(CauTraLoi2) }}
            />
          </Radio>

          <Radio
            id={IDCauTraLoi3}
            checked={danhSachCauHoiContext.selected[ID] == IDCauTraLoi3}
            name={ID}
            value={IDCauTraLoi3}
            onChange={handleChange}
            color={IDCauTraLoiDung == IDCauTraLoi3 ? 'success' : 'danger'}
          >
            <div
              dangerouslySetInnerHTML={{ __html: convertRtfToText(CauTraLoi3) }}
            />
          </Radio>

          <Radio
            id={IDCauTraLoi4}
            checked={danhSachCauHoiContext.selected[ID] == IDCauTraLoi4}
            name={ID}
            value={IDCauTraLoi4}
            onChange={handleChange}
            color={IDCauTraLoiDung == IDCauTraLoi4 ? 'success' : 'danger'}
          >
            <div
              dangerouslySetInnerHTML={{ __html: convertRtfToText(CauTraLoi4) }}
            />
          </Radio>
        </div>
      </div>
    </>
  )
}
