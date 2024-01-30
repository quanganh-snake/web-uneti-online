import { useContext, useState } from 'react'

import { Radio } from '@/Components/Base/Radio/Radio'
import { OnTapContext } from '@/Services/Tokens'
import Button from '@/Components/Base/Button/Button'
import Icon from '@/Components/Base/Icon/Icon'
import IconAudioPlay from '@/Components/Base/Icons/AudioPlay'
import IconAudioPause from '@/Components/Base/Icons/AudioPause'

export default function CauHoi(props) {
  const {
    STT = 1,
    ID = null,
    CauHoi = undefined,
    CauTraLoi1 = undefined,
    IDCauTraLoi1 = undefined,
    CauTraLoi2 = undefined,
    IDCauTraLoi2 = undefined,
    CauTraLoi3 = undefined,
    IDCauTraLoi3 = undefined,
    CauTraLoi4 = undefined,
    IDCauTraLoi4 = undefined,
    // IDCauTraLoiDung = undefined,
    color = 'primary',
    audio = true,
    IsAudioCauHoiCon = true,
    disabled = false,
  } = props
  audio
  const [isPlaying, setIsPlaying] = useState(false)

  const danhSachCauHoiContext = useContext(OnTapContext)

  const handleChange = (IDCauTraLoi) => {
    danhSachCauHoiContext.handleSelected(ID, IDCauTraLoi)
  }

  const handlePlayAudio = () => {
    setIsPlaying((e) => !e)
  }

  return (
    <>
      <div
        id={ID}
        className={`bg-white transition-all text-vs-theme-color text-sm select-none rounded-[20px] border-2 p-5 border-slate-100 padding focus-within:border-uneti-primary hover:border-uneti-primary ${isPlaying ? 'border-uneti-primary' : ''}`}
      >
        <div className="flex items-center mb-3 text-base text-vs-text">
          <div
            className="font-semibold flex-1"
            dangerouslySetInnerHTML={{
              __html: `<span style="margin-right: 0.2rem; color: #FF4757; white-space: nowrap;">Câu hỏi ${STT}:</span> ${CauHoi}`,
            }}
          />

          {/* Audio */}
          {IsAudioCauHoiCon ? (
            <div className="flex items-center">
              <Button onClick={handlePlayAudio} type="transparent" icon>
                <Icon size={30}>
                  {isPlaying ? <IconAudioPause /> : <IconAudioPlay />}
                </Icon>
              </Button>
            </div>
          ) : null}
        </div>

        <div className="flex flex-col gap-3">
          <Radio
            id={IDCauTraLoi1}
            checked={danhSachCauHoiContext.selected[ID] == IDCauTraLoi1}
            name={ID}
            disabled={disabled}
            value={IDCauTraLoi1}
            onChange={handleChange}
            color={color}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: `A.  ${CauTraLoi1}`,
              }}
            />
          </Radio>

          <Radio
            id={IDCauTraLoi2}
            checked={danhSachCauHoiContext.selected[ID] == IDCauTraLoi2}
            name={ID}
            disabled={disabled}
            value={IDCauTraLoi2}
            onChange={handleChange}
            color={color}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: `B.  ${CauTraLoi2}`,
              }}
            />
          </Radio>

          <Radio
            id={IDCauTraLoi3}
            checked={danhSachCauHoiContext.selected[ID] == IDCauTraLoi3}
            name={ID}
            disabled={disabled}
            value={IDCauTraLoi3}
            onChange={handleChange}
            color={color}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: `C.  ${CauTraLoi3}`,
              }}
            />
          </Radio>

          <Radio
            id={IDCauTraLoi4}
            checked={danhSachCauHoiContext.selected[ID] == IDCauTraLoi4}
            name={ID}
            disabled={disabled}
            value={IDCauTraLoi4}
            onChange={handleChange}
            color={color}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: `D.  ${CauTraLoi4}`,
              }}
            />
          </Radio>
        </div>
      </div>
    </>
  )
}
