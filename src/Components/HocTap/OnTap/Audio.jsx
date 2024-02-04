import { getAudioById } from '@/Apis/HocTap/apiOnLuyenThiThu'
import Icon from '@/Components/Base/Icon/Icon'
import IconAudioPause from '@/Components/Base/Icons/AudioPause'
import IconAudioPlay from '@/Components/Base/Icons/AudioPlay'
import { useNamespace } from '@/Services/Hooks'
import {
  convertBase64ToArrayBuffer,
  convertBufferToBase64,
} from '@/Services/Utils/stringUtils'
import { useRef } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useInterval } from 'react-use'
import Swal from 'sweetalert2'

export default function UAudio(props) {
  const {
    id,
    playCount = 2, // playCount == 0 => play infinity
    disabled = false,
    onPlaying = () => null,
    isPlaying,
  } = props

  const ns = useNamespace('audio')

  const [audio, setAudio] = useState(null)
  const audioRef = useRef(null)
  const [isAudioLoading, setIsAudioLoading] = useState(false)
  const [isAudioLoaded, setIsAudioLoaded] = useState(false)
  const [audioDurationCount, setAudioDurationCount] = useState(0)
  const [audioPlayCount, setAudioPlayCount] = useState(0)

  const getSourceAudio = async () => {
    const audioResponse = await getAudioById({
      IDCauHoi: id,
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

  const handlePlayAudio = async () => {
    if (disabled) return

    let audioSrc = audio
    if (!audio) {
      setIsAudioLoading(true)
      audioSrc = await getSourceAudio()
      setAudio(audioSrc)
      audioRef.current = new Audio(audioSrc)
      setIsAudioLoading(false)
    }

    if (!audioSrc || !audioRef.current) return

    if (playCount != 0) {
      if (audioPlayCount >= playCount) {
        Swal.fire({
          title: 'Thông báo',
          text: `Mỗi câu chỉ được nghe ${playCount} lần`,
          icon: 'info',
          confirmButtonText: 'Đóng',
        })
        return
      }
    }

    if (isPlaying) {
      onPlaying(null)
    } else {
      onPlaying(id)
    }
  }

  useInterval(
    () => {
      if (
        disabled ||
        !audio ||
        !audioRef.current ||
        audioRef.current.duration <= audioDurationCount
      ) {
        setAudioDurationCount(0)
        onPlaying(null)
        setAudioPlayCount((prev) => prev + 1)
        return
      }
      setAudioDurationCount((prev) => prev + 1)
    },
    isPlaying ? 1000 : null,
  )

  useEffect(() => {
    if (!isPlaying) {
      audioRef.current?.pause()
    } else {
      audioRef.current?.play()
    }
  }, [isPlaying])

  useEffect(() => {
    if (disabled) {
      onPlaying(null)
    }
  }, [disabled])

  return (
    <div
      onClick={handlePlayAudio}
      className={`${isAudioLoading ? 'pointer-events-none' : ''} relative w-9 h-9 hover:bg-uneti-primary-lighter hover:bg-opacity-10 flex items-center justify-center transition-all rounded-full`}
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
              width: `${(audioDurationCount / audioRef.current?.duration) * 100}%`,
            }}
          />
        </div>
      ) : null}
    </div>
  )
}
