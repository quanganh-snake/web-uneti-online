import { useMemo } from 'react'
import { useContext, useState } from 'react'
import { createElement } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { useInterval } from 'react-use'

import { Radio } from '@/Components/Base/Radio/Radio'
import { OnTapContext } from '@/Services/Tokens'
import Button from '@/Components/Base/Button/Button'
import Icon from '@/Components/Base/Icon/Icon'
import IconAudioPlay from '@/Components/Base/Icons/AudioPlay'
import IconAudioPause from '@/Components/Base/Icons/AudioPause'
import { getAudioById } from '@/Apis/HocTap/apiOnLuyenThiThu'
import {
  convertBase64ToArrayBuffer,
  convertBufferToBase64,
} from '@/Services/Utils/stringUtils'
import { retries } from '@/Services/Utils/requestUtils'
import { useNamespace } from '@/Services/Hooks'
import Swal from 'sweetalert2'

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

  const ns = useNamespace('question')

  const [isAudioLoaded, setIsAudioLoaded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [audio, setAudio] = useState(null)
  const [audioDurationCount, setAudioDurationCount] = useState(0)
  const [audioPlayCount, setAudioPlayCount] = useState(0)

  const audioRef = useRef(null)

  const danhSachCauHoiContext = useContext(OnTapContext)

  useInterval(
    () => {
      if (
        isFinished ||
        !audio ||
        !audioRef.current ||
        audioRef.current.duration <= audioDurationCount
      ) {
        setAudioDurationCount(0)
        setIsPlaying(false)
        setAudioPlayCount((prev) => prev + 1)
        return
      }
      setAudioDurationCount((prev) => prev + 1)
    },
    isPlaying ? 1000 : null,
  )

  const handleChange = (IDCauTraLoi) => {
    if (disabled || isFinished) return

    danhSachCauHoiContext.handleSelected(ID, IDCauTraLoi)
  }

  const handlePlayAudio = () => {
    if (isFinished) return

    if (!audio || !audioRef.current) return

    if (audioPlayCount == 2) {
      Swal.fire({
        title: 'Thông báo',
        text: 'Mỗi câu chỉ được nghe 2 lần',
        icon: 'info',
        confirmButtonText: 'Đóng',
      })
      return
    }

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  const getSourceAudio = async (IDCauHoi) => {
    const audioResponse = await getAudioById({
      IDCauHoi: ID,
    })

    if (!audioResponse.data.body || audioResponse.data.body.length === 0) {
      throw new Error('Audio data not found')
    }

    const audioData = audioResponse.data.body[0].TC_SV_OnThi_Media_DataFile.data
    if (!audioData) {
      throw new Error('Audio data is empty')
    }

    const dataConvert = convertBufferToBase64(audioData)
    const arrayBufferView = convertBase64ToArrayBuffer(dataConvert)

    if (!arrayBufferView) {
      throw new Error('Error converting base64 to ArrayBuffer')
    }

    const blob = new Blob([arrayBufferView], { type: 'audio/mpeg' })
    const audioURL = URL.createObjectURL(blob)

    if (!audioURL) {
      throw new Error('Error creating Object URL for audio')
    }

    return audioURL
  }

  useEffect(() => {
    setIsPlaying(false)
  }, [isFinished])
  useEffect(() => {
    if (!IsAudioCauHoiCon || isAudioLoaded) return

    const getAudio = async () => {
      const audioSrc = await getSourceAudio(ID)
      setAudio(audioSrc)
      audioRef.current = new Audio(audioSrc)
    }

    retries(getAudio)
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
          {!isFinished && IsAudioCauHoiCon && audio ? (
            <div className="flex items-center">
              <div
                onClick={handlePlayAudio}
                className="relative w-[36px] h-[36px] hover:bg-uneti-primary-lighter hover:bg-opacity-10 flex items-center justify-center transition-all rounded-full"
                style={ns.cssVar({
                  color: `var(${ns.cssVarName('primary-lighter')})`,
                })}
              >
                <Icon size={30}>
                  {isPlaying ? <IconAudioPause /> : <IconAudioPlay />}
                </Icon>

                <div className="absolute transition-all rounded-full duration-1000 top-full left-0 h-1 w-full bg-slate-300">
                  <div
                    className="absolute transition-all rounded-full duration-1000 top-0 left-0 h-1 bg-uneti-primary"
                    style={{
                      width: `${(audioDurationCount / audioRef.current.duration) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <div className="flex flex-col gap-3">
          <Radio
            id={IDCauTraLoi1}
            checked={
              danhSachCauHoiContext.selected[ID] == IDCauTraLoi1 ||
              (isFinished && IDCauTraLoiDung == IDCauTraLoi1)
            }
            name={ID}
            value={IDCauTraLoi1}
            onChange={handleChange}
            color={
              isFinished
                ? !danhSachCauHoiContext.selected[ID]
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
              danhSachCauHoiContext.selected[ID] == IDCauTraLoi2 ||
              (isFinished && IDCauTraLoiDung == IDCauTraLoi2)
            }
            name={ID}
            value={IDCauTraLoi2}
            onChange={handleChange}
            color={
              isFinished
                ? !danhSachCauHoiContext.selected[ID]
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
              danhSachCauHoiContext.selected[ID] == IDCauTraLoi3 ||
              (isFinished && IDCauTraLoiDung == IDCauTraLoi3)
            }
            name={ID}
            value={IDCauTraLoi3}
            onChange={handleChange}
            color={
              isFinished
                ? !danhSachCauHoiContext.selected[ID]
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
              danhSachCauHoiContext.selected[ID] == IDCauTraLoi4 ||
              (isFinished && IDCauTraLoiDung == IDCauTraLoi4)
            }
            name={ID}
            value={IDCauTraLoi4}
            onChange={handleChange}
            color={
              isFinished
                ? !danhSachCauHoiContext.selected[ID]
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
