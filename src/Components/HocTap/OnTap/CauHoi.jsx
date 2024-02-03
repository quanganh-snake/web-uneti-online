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
import UAudio from './Audio'

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
  const danhSachCauHoiContext = useContext(OnTapContext)

  const handleChange = (IDCauTraLoi) => {
    if (disabled) return

    danhSachCauHoiContext.handleSelected(ID, IDCauTraLoi)
  }

  const handlePlayAudio = (ID) => {
    danhSachCauHoiContext.setAudioPlaying(ID)
    setIsPlaying(ID)
  }

  const handleArchiveQuestion = () => {
    danhSachCauHoiContext.setQuestionsTick((prev) => {
      return {
        ...prev,
        [ID]: !prev[ID],
      }
    })
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
                    onPlaying={handlePlayAudio}
                    disabled={disabled}
                  />
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
            align="start"
            checked={
              danhSachCauHoiContext.selected[ID] == IDCauTraLoi1 ||
              (disabled && IDCauTraLoiDung == IDCauTraLoi1)
            }
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

              {AnhCauHoiCon_1 ? (
                <img
                  className="rounded-md max-h-52"
                  src={`data:image/png;base64,${AnhCauHoiCon_1}`}
                />
              ) : null}
            </div>
          </Radio>

          <Radio
            id={IDCauTraLoi2}
            align="start"
            checked={
              danhSachCauHoiContext.selected[ID] == IDCauTraLoi2 ||
              (disabled && IDCauTraLoiDung == IDCauTraLoi2)
            }
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

              {AnhCauHoiCon_1 ? (
                <img
                  className="rounded-md max-h-52"
                  src={`data:image/png;base64,${AnhCauHoiCon_2}`}
                />
              ) : null}
            </div>
          </Radio>

          <Radio
            id={IDCauTraLoi3}
            align="start"
            checked={
              danhSachCauHoiContext.selected[ID] == IDCauTraLoi3 ||
              (disabled && IDCauTraLoiDung == IDCauTraLoi3)
            }
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

              {AnhCauHoiCon_1 ? (
                <img
                  className="rounded-md max-h-52"
                  src={`data:image/png;base64,${AnhCauHoiCon_3}`}
                />
              ) : null}
            </div>
          </Radio>

          {IDCauTraLoi4 ? (
            <Radio
              id={IDCauTraLoi4}
              checked={
                danhSachCauHoiContext.selected[ID] == IDCauTraLoi4 ||
                (disabled && IDCauTraLoiDung == IDCauTraLoi4)
              }
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
                    __html: `B.  ${CauTraLoi4}`,
                  }}
                />

                {AnhCauHoiCon_1 ? (
                  <img
                    className="rounded-md max-h-52"
                    src={`data:image/png;base64,${AnhCauHoiCon_4}`}
                  />
                ) : null}
              </div>
            </Radio>
          ) : null}
        </div>
      </div>
    </>
  )
}
