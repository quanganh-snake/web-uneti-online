import React from 'react'
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

  const handlePlayAudio = (ID) => {
    danhSachCauHoiContext.setAudioPlaying(ID)
    setIsPlaying(ID)
  }

  useEffect(() => {
    if (danhSachCauHoiContext.audioPlaying !== firstQuestion.IDCauHoiCha) {
      setIsPlaying(false)
    }
  }, [danhSachCauHoiContext.audioPlaying])

  return (
    <div
      id={firstQuestion.IDCauHoiCha}
      className="p-6 rounded-[26px] border-2 border-slate-200 flex flex-col gap-4 transition-all hover:border-opacity-90"
    >
      <div className="flex items-start gap-2 flex-wrap">
        <div
          className="flex-1 mt-[2px]"
          dangerouslySetInnerHTML={{
            __html: `<div>${firstQuestion.CauHoiCha}</div>`,
          }}
        />

        {/* images */}
        <div className="flex gap-2">
          {firstQuestion.AnhCauHoiCha_1 ? (
            <img
              className="rounded-md max-h-52"
              src={`data:image/png;base64,${AnhCauHoiCha_1}`}
            />
          ) : null}
          {firstQuestion.AnhCauHoiCha_2 ? (
            <img
              className="rounded-md max-h-52"
              src={`data:image/png;base64,${AnhCauHoiCha_2}`}
            />
          ) : null}
          {firstQuestion.AnhCauHoiCha_3 ? (
            <img
              className="rounded-md max-h-52"
              src={`data:image/png;base64,${AnhCauHoiCha_3}`}
            />
          ) : null}
          {firstQuestion.AnhCauHoiCha_4 ? (
            <img
              className="rounded-md max-h-52"
              src={`data:image/png;base64,${AnhCauHoiCha_4}`}
            />
          ) : null}
          {firstQuestion.AnhCauHoiCha_5 ? (
            <img
              className="rounded-md max-h-52"
              src={`data:image/png;base64,${AnhCauHoiCha_5}`}
            />
          ) : null}
        </div>

        {/* Audio */}
        {firstQuestion.IsAudioCauHoiCha ? (
          <UAudio
            id={firstQuestion.IDCauHoiCha}
            isPlaying={isPlaying}
            onPlaying={handlePlayAudio}
            disabled={disabled}
          />
        ) : null}
      </div>

      {questions.map((child, i) => (
        <CauHoi key={`p-question-${i}`} {...child} disabled={disabled} />
      ))}
    </div>
  )
}
