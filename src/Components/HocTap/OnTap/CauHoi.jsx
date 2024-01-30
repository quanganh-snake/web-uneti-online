import { useContext, useState } from 'react'

import { Radio } from '@/Components/Base/Radio/Radio'
import { OnTapContext } from '@/Services/Tokens'
import Button from '@/Components/Base/Button/Button'
import Icon from '@/Components/Base/Icon/Icon'
import IconAudioPlay from '@/Components/Base/Icons/AudioPlay'
import IconAudioPause from '@/Components/Base/Icons/AudioPause'
import { createElement } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { getAudioById } from '@/Apis/HocTap/apiOnLuyenThiThu'
import { decoders } from 'audio-decode'

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
    IDCauTraLoiDung = undefined,
    color = 'primary',
    IsAudioCauHoiCon = false,
    disabled = false,
    isFinished = false,
  } = props

  const [isAudioLoaded, setIsAudioLoaded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [localSelected, setLocalSelected] = useState(null)

  const danhSachCauHoiContext = useContext(OnTapContext)

  const handleChange = (IDCauTraLoi) => {
    if (disabled || isFinished) return

    setLocalSelected(IDCauTraLoi)
    danhSachCauHoiContext.handleSelected(ID, IDCauTraLoi)
  }

  const handlePlayAudio = () => {
    if (isFinished) return

    setIsPlaying((e) => !e)
  }

  useEffect(() => {
    setIsPlaying(false)
  }, [isFinished])

  useEffect(() => {
    if (!IsAudioCauHoiCon || isAudioLoaded) return

    async function getAudio() {
      const audioResponse = await getAudioById({
        IDCauHoi: ID,
      })

      // decode AudioBuffer
      const audioBuffterDecoder = await decoders.mp3(
        audioResponse.data.body[0]?.TC_SV_OnThi_Media_DataFile.data,
      )

      console.log(audioBuffterDecoder)
    }

    // getAudio()
  }, [IsAudioCauHoiCon])

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
            checked={
              (isFinished && IDCauTraLoiDung == IDCauTraLoi1) ||
              danhSachCauHoiContext.selected[ID] == IDCauTraLoi1
            }
            name={ID}
            value={IDCauTraLoi1}
            onChange={handleChange}
            color={
              isFinished
                ? localSelected == null
                  ? 'primary'
                  : IDCauTraLoiDung === IDCauTraLoi1
                    ? 'success'
                    : 'danger'
                : color
            }
          >
            <div
              dangerouslySetInnerHTML={{
                __html: `A.  ${CauTraLoi1}`,
              }}
            />
          </Radio>

          <Radio
            id={IDCauTraLoi2}
            checked={
              (isFinished && IDCauTraLoiDung == IDCauTraLoi2) ||
              danhSachCauHoiContext.selected[ID] == IDCauTraLoi2
            }
            name={ID}
            value={IDCauTraLoi2}
            onChange={handleChange}
            color={
              isFinished
                ? localSelected == null
                  ? 'primary'
                  : IDCauTraLoiDung === IDCauTraLoi2
                    ? 'success'
                    : 'danger'
                : color
            }
          >
            <div
              dangerouslySetInnerHTML={{
                __html: `B.  ${CauTraLoi2}`,
              }}
            />
          </Radio>

          <Radio
            id={IDCauTraLoi3}
            checked={
              (isFinished && IDCauTraLoiDung == IDCauTraLoi3) ||
              danhSachCauHoiContext.selected[ID] == IDCauTraLoi3
            }
            name={ID}
            value={IDCauTraLoi3}
            onChange={handleChange}
            color={
              isFinished
                ? localSelected == null
                  ? 'primary'
                  : IDCauTraLoiDung === IDCauTraLoi3
                    ? 'success'
                    : 'danger'
                : color
            }
          >
            <div
              dangerouslySetInnerHTML={{
                __html: `C.  ${CauTraLoi3}`,
              }}
            />
          </Radio>

          <Radio
            id={IDCauTraLoi4}
            checked={
              (isFinished && IDCauTraLoiDung == IDCauTraLoi4) ||
              danhSachCauHoiContext.selected[ID] == IDCauTraLoi4
            }
            name={ID}
            value={IDCauTraLoi4}
            onChange={handleChange}
            color={
              isFinished
                ? localSelected == null
                  ? 'primary'
                  : IDCauTraLoiDung === IDCauTraLoi4
                    ? 'success'
                    : 'danger'
                : color
            }
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
