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
import ArchiveBook from '@/Components/Base/Icons/ArchiveBook'
import { transformCls } from '@/Services/Utils/reactUtils'

import './CauHoi.scss'
import ArchiveBookFilled from '@/Components/Base/Icons/ArchiveBookFilled'

export default function CauHoi(props) {
  const {
    STT = null,
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

  const handlePlayAudio = async () => {
    if (isFinished) return

    let audioSrc = audio
    if (!audio && IsAudioCauHoiCon) {
      audioSrc = await getSourceAudio(ID)
      setAudio(audioSrc)
      audioRef.current = new Audio(audioSrc)
    }

    if (!audioSrc || !audioRef.current) return

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
      danhSachCauHoiContext.setAudioPlaying(null)
      setIsPlaying(false)
    } else {
      audioRef.current.play()
      danhSachCauHoiContext.setAudioPlaying(ID)
      setIsPlaying(true)
    }
  }

  const handleArchiveQuestion = () => {
    danhSachCauHoiContext.setQuestionsTick((prev) => {
      return {
        ...prev,
        [ID]: !prev[ID],
      }
    })
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
    if (danhSachCauHoiContext.audioPlaying !== ID) {
      setIsPlaying(false)
    }
  }, [danhSachCauHoiContext.audioPlaying])
  useEffect(() => {
    if (!isPlaying) audioRef.current?.pause()
  }, [isPlaying])
  useEffect(() => {
    setIsPlaying(false)
  }, [isFinished])

  const [transitionEnter, setTransitionEnter] = useState(false)

  useEffect(() => {
    setTransitionEnter(true)

    setTimeout(() => {
      setTransitionEnter(false)
    }, 500)
  }, [])

  return (
    <>
      <div
        id={ID}
        className={transformCls([
          ns.b(),
          ns.is('playing', isPlaying),
          ns.is('tick', danhSachCauHoiContext.questionsTick[ID]),
          transitionEnter && 'animate__animated animate__zoomIn',
        ])}
        style={{
          '--animate-duration': '0.25s',
        }}
      >
        <div className={ns.e('heading')}>
          <div
            className="font-semibold flex-1"
            dangerouslySetInnerHTML={{
              __html: `<span style="margin-right: 0.2rem; color: #FF4757; white-space: nowrap;">Câu hỏi ${STT}:</span> ${CauHoi}`,
            }}
          />

          <div className="flex items-center gap-3">
            {/* Audio */}
            {!isFinished ? (
              <>
                {IsAudioCauHoiCon ? (
                  <div
                    onClick={handlePlayAudio}
                    className="relative w-9 h-9 hover:bg-uneti-primary-lighter hover:bg-opacity-10 flex items-center justify-center transition-all rounded-full"
                    style={ns.cssVar({
                      color: `var(${ns.cssVarName('primary-lighter')})`,
                    })}
                  >
                    <Icon size={30}>
                      {isPlaying ? <IconAudioPause /> : <IconAudioPlay />}
                    </Icon>

                    {audio ? (
                      <div className="absolute transition-all rounded-full duration-1000 top-full left-0 h-1 w-full bg-slate-300">
                        <div
                          className="absolute transition-all rounded-full duration-1000 top-0 left-0 h-1 bg-uneti-primary"
                          style={{
                            width: `${(audioDurationCount / audioRef.current.duration) * 100}%`,
                          }}
                        />
                      </div>
                    ) : null}
                  </div>
                ) : null}

                <div className={ns.e('tick')} onClick={handleArchiveQuestion}>
                  <Icon size={30}>
                    {danhSachCauHoiContext.questionsTick[ID] ? (
                      <ArchiveBookFilled />
                    ) : (
                      <ArchiveBook />
                    )}
                  </Icon>
                </div>
              </>
            ) : null}
          </div>
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
                ? IDCauTraLoiDung === IDCauTraLoi1
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
                ? IDCauTraLoiDung === IDCauTraLoi2
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
                ? IDCauTraLoiDung === IDCauTraLoi3
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

          {IDCauTraLoi4 ? (
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
                  ? IDCauTraLoiDung === IDCauTraLoi4
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
          ) : null}
        </div>
      </div>
    </>
  )
}
