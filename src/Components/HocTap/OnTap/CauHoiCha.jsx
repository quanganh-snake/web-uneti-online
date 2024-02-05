import { getSourceAudio } from '@/Pages/Clients/HocTap/OnLuyen/utils'
import UAudio from './Audio'
import CauHoi from './CauHoi'
import { OnTapContext } from '@/Services/Tokens'
import { useState } from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'

export default function CauHoiCha(props) {
  const { questions, disabled } = props

  const firstQuestion = questions[0] || ''

  const [isPlaying, setIsPlaying] = useState(false)
  const danhSachCauHoiContext = useContext(OnTapContext)
  const [isAudioLoading, setIsAudioLoading] = useState(false)

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

  const handleOnAudioFinish = (ID) => {
    danhSachCauHoiContext.setListAudio((prev) => ({
      ...prev,
      [ID]: {
        ...prev[ID],
        playCount: prev[ID].playCount + 1,
      },
    }))
    setIsPlaying(false)
    danhSachCauHoiContext.setAudioPlaying(null)
  }

  useEffect(() => {
    if (danhSachCauHoiContext.audioPlaying !== firstQuestion.IDCauHoiCha) {
      setIsPlaying(false)
    }
  }, [danhSachCauHoiContext.audioPlaying])

  return (
    <div
      id={firstQuestion.IDCauHoiCha}
      className="px-2 py-3 md:px-3 bg-white shadow-sm rounded-[26px] border border-slate-200 flex flex-col gap-4 transition-all hover:border-opacity-90"
    >
      <div className="flex flex-col items-start gap-2 flex-wrap">
        <div
          className="flex-1 mt-[2px] max-w-[320px] max-h-[300px] overflow-y-auto md:max-w-full md:max-h-full shadow-md p-2 rounded-md md:shadow-none"
          dangerouslySetInnerHTML={{
            __html: `<div>${firstQuestion.CauHoiCha}</div>`,
          }}
        />

        {/* images */}
        <div className="flex gap-2">
          {firstQuestion.AnhCauHoiCha_1 && (
            <img
              className="rounded-md max-h-96"
              src={`data:image/png;base64,${firstQuestion.AnhCauHoiCha_1}`}
            />
          )}
          {firstQuestion.AnhCauHoiCha_2 && (
            <img
              className="rounded-md max-h-96"
              src={`data:image/png;base64,${firstQuestion.AnhCauHoiCha_2}`}
            />
          )}
          {firstQuestion.AnhCauHoiCha_3 && (
            <img
              className="rounded-md max-h-96"
              src={`data:image/png;base64,${firstQuestion.AnhCauHoiCha_3}`}
            />
          )}
          {firstQuestion.AnhCauHoiCha_4 && (
            <img
              className="rounded-md max-h-96"
              src={`data:image/png;base64,${firstQuestion.AnhCauHoiCha_4}`}
            />
          )}
          {firstQuestion.AnhCauHoiCha_5 && (
            <img
              className="rounded-md max-h-96"
              src={`data:image/png;base64,${firstQuestion.AnhCauHoiCha_5}`}
            />
          )}
        </div>

        {/* Audio */}
        {firstQuestion.IsAudioCauHoiCha ? (
          <UAudio
            id={firstQuestion.IDCauHoiCha}
            isLoading={isAudioLoading}
            isPlaying={isPlaying}
            onPlaying={handlePlayAudio}
            disabled={disabled}
            src={
              danhSachCauHoiContext.listAudio[firstQuestion.IDCauHoiCha]?.src
            }
            selfPlayCount={
              danhSachCauHoiContext.listAudio[firstQuestion.IDCauHoiCha]
                ?.playCount
            }
            onFinish={handleOnAudioFinish}
          />
        ) : null}
      </div>

      {questions.map((child, i) => (
        <CauHoi key={`p-question-${i}`} {...child} disabled={disabled} />
      ))}
    </div>
  )
}
