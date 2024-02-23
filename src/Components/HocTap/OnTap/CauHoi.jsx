import { useContext, useState } from 'react'
import { useEffect } from 'react'

import { Radio } from '@/Components/Base/Radio/Radio'
import { OnTapContext } from '@/Services/Tokens'
import Icon from '@/Components/Base/Icon/Icon'
import { useNamespace } from '@/Services/Hooks'
import { transformCls } from '@/Services/Utils/reactUtils'

import './CauHoi.scss'
import UAudio from './Audio'
import { BsFlag, BsFlagFill } from 'react-icons/bs'
import { getSourceAudio } from '@/Pages/Clients/HocTap/OnLuyen/utils'

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
    AnhCauHoiCon_1 = null,
    AnhCauHoiCon_2 = null,
    AnhCauHoiCon_3 = null,
    AnhCauHoiCon_4 = null,
    AnhCauHoiCon_5 = null,
  } = props

  const ns = useNamespace('question')
  const [isPlaying, setIsPlaying] = useState(false)
  const [isAudioLoading, setIsAudioLoading] = useState(false)

  const danhSachCauHoiContext = useContext(OnTapContext)

  const handleChange = (IDCauTraLoi) => {
    if (disabled) return

    danhSachCauHoiContext.handleSelected(
      ID,
      IDCauTraLoi == danhSachCauHoiContext.selected[ID]
        ? undefined
        : IDCauTraLoi,
    )
  }

  const handlePlayAudio = async (ID) => {
    if (ID !== null && !danhSachCauHoiContext.listAudio[ID]) {
      const obj = {
        ID,
        src: null,
        playCount: 0,
      }

      await setIsAudioLoading(() => true)
      obj.src = await getSourceAudio(ID)
      await danhSachCauHoiContext.setListAudio((prev) => ({
        ...prev,
        [ID]: obj,
      }))
      await setIsAudioLoading(() => false)
    }
    setTimeout(() => {
      setIsPlaying(() => ID)
      danhSachCauHoiContext.setAudioPlaying(() => ID)
    }, 150)
  }

  const handleArchiveQuestion = () => {
    danhSachCauHoiContext.setQuestionsTick((prev) => {
      return {
        ...prev,
        [ID]: !prev[ID],
      }
    })
  }

  const handleOnAudioFinish = (ID) => {
    const audioContext = danhSachCauHoiContext.listAudio[ID]

    danhSachCauHoiContext.setListAudio((prev) => ({
      ...prev,
      [ID]: {
        ...audioContext,
        playCount: audioContext.playCount + 1,
      },
    }))

    setIsPlaying(false)
    danhSachCauHoiContext.setAudioPlaying(null)
  }

  const [transitionEnter, setTransitionEnter] = useState(false)

  useEffect(() => {
    if (danhSachCauHoiContext.audioPlaying !== ID) {
      setIsPlaying(false)
    }
  }, [danhSachCauHoiContext.audioPlaying])

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
            {!disabled ? (
              <>
                {IsAudioCauHoiCon ? (
                  <UAudio
                    id={ID}
                    isPlaying={isPlaying}
                    isLoading={isAudioLoading}
                    onPlaying={handlePlayAudio}
                    disabled={disabled}
                    src={danhSachCauHoiContext.listAudio[ID]?.src}
                    selfPlayCount={
                      danhSachCauHoiContext.listAudio[ID]?.playCount
                    }
                    onFinish={handleOnAudioFinish}
                  />
                ) : null}

                <div className={ns.e('tick')} onClick={handleArchiveQuestion}>
                  <Icon size={30}>
                    {danhSachCauHoiContext.questionsTick[ID] ? (
                      <BsFlagFill size={24} className="cursor-pointer" />
                    ) : (
                      <BsFlag size={24} className="cursor-pointer" />
                    )}
                  </Icon>
                </div>
              </>
            ) : null}
          </div>
        </div>
        <div className="w-full flex items-center justify-center gap-2">
          {AnhCauHoiCon_1 && (
            <img
              className="rounded-md mb-4 w-1/2"
              src={`data:image/png;base64,${AnhCauHoiCon_1}`}
            />
          )}

          {AnhCauHoiCon_2 && (
            <img
              className="rounded-md mb-4 w-1/2"
              src={`data:image/png;base64,${AnhCauHoiCon_2}`}
            />
          )}

          {AnhCauHoiCon_3 && (
            <img
              className="rounded-md mb-4 w-1/2"
              src={`data:image/png;base64,${AnhCauHoiCon_3}`}
            />
          )}

          {AnhCauHoiCon_4 && (
            <img
              className="rounded-md mb-4 w-1/2"
              src={`data:image/png;base64,${AnhCauHoiCon_4}`}
            />
          )}

          {AnhCauHoiCon_5 && (
            <img
              className="rounded-md mb-4 w-1/2"
              src={`data:image/png;base64,${AnhCauHoiCon_5}`}
            />
          )}
        </div>

        <div className="flex flex-col gap-3">
          {IDCauTraLoi1 && (
            <Radio
              id={IDCauTraLoi1}
              align="start"
              checked={disabled && IDCauTraLoiDung == IDCauTraLoi1}
              modelValue={danhSachCauHoiContext.selected[ID]}
              name={ID}
              value={IDCauTraLoi1}
              onChange={handleChange}
              color={
                disabled
                  ? IDCauTraLoiDung === IDCauTraLoi1
                    ? 'success'
                    : 'danger'
                  : color
              }
            >
              <div className="flex gap-4">
                <div
                  dangerouslySetInnerHTML={{
                    __html: `A.  ${CauTraLoi1}`,
                  }}
                />
              </div>
            </Radio>
          )}

          {IDCauTraLoi2 && (
            <Radio
              id={IDCauTraLoi2}
              align="start"
              checked={disabled && IDCauTraLoiDung == IDCauTraLoi2}
              modelValue={danhSachCauHoiContext.selected[ID]}
              name={ID}
              value={IDCauTraLoi2}
              onChange={handleChange}
              color={
                disabled
                  ? IDCauTraLoiDung === IDCauTraLoi2
                    ? 'success'
                    : 'danger'
                  : color
              }
            >
              <div className="flex gap-4">
                <div
                  dangerouslySetInnerHTML={{
                    __html: `B.  ${CauTraLoi2}`,
                  }}
                />
              </div>
            </Radio>
          )}

          {IDCauTraLoi3 && (
            <Radio
              id={IDCauTraLoi3}
              align="start"
              checked={disabled && IDCauTraLoiDung == IDCauTraLoi3}
              modelValue={danhSachCauHoiContext.selected[ID]}
              name={ID}
              value={IDCauTraLoi3}
              onChange={handleChange}
              color={
                disabled
                  ? IDCauTraLoiDung === IDCauTraLoi3
                    ? 'success'
                    : 'danger'
                  : color
              }
            >
              <div className="flex gap-4">
                <div
                  dangerouslySetInnerHTML={{
                    __html: `C.  ${CauTraLoi3}`,
                  }}
                />
              </div>
            </Radio>
          )}

          {IDCauTraLoi4 && (
            <Radio
              id={IDCauTraLoi4}
              checked={disabled && IDCauTraLoiDung == IDCauTraLoi4}
              modelValue={danhSachCauHoiContext.selected[ID]}
              name={ID}
              value={IDCauTraLoi4}
              onChange={handleChange}
              color={
                disabled
                  ? IDCauTraLoiDung === IDCauTraLoi4
                    ? 'success'
                    : 'danger'
                  : color
              }
            >
              <div className="flex gap-4">
                <div
                  dangerouslySetInnerHTML={{
                    __html: `D.  ${CauTraLoi4}`,
                  }}
                />
              </div>
            </Radio>
          )}
        </div>
      </div>
    </>
  )
}
