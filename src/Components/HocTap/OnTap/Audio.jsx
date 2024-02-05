import Icon from '@/Components/Base/Icon/Icon'
import IconAudioPause from '@/Components/Base/Icons/AudioPause'
import IconAudioPlay from '@/Components/Base/Icons/AudioPlay'
import { useNamespace } from '@/Services/Hooks'
import { useRef } from 'react'
import { useEffect } from 'react'
import Swal from 'sweetalert2'

export default function UAudio(props) {
  const {
    id,
    src = null,
    maxPlayCount = 2, // maxPlayCount == 0 => play infinity
    selfPlayCount = 0,
    disabled = false,
    onPlaying = () => null,
    isPlaying,
    onFinish = () => null,
    isLoading,
  } = props

  const ns = useNamespace('audio')

  const audioRef = useRef()

  const handlePlayAudio = async () => {
    if (disabled || isLoading || isPlaying) return

    if (maxPlayCount != 0) {
      if (selfPlayCount >= maxPlayCount) {
        Swal.fire({
          title: 'Thông báo',
          text: `Mỗi câu chỉ được nghe ${maxPlayCount} lần`,
          icon: 'info',
          confirmButtonText: 'Đóng',
        })
        return
      }
    }

    onPlaying(id)
  }

  useEffect(() => {
    if (audioRef.current?.duration <= audioRef.current?.currentTime) {
      onPlaying(null)
      onFinish(id)
      return
    }
  }, [audioRef.current?.duration, audioRef.current?.currentTime])

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
      className={`${isLoading ? 'pointer-events-none' : ''} relative w-9 h-9 hover:bg-uneti-primary-lighter hover:bg-opacity-10 flex items-center justify-center transition-all rounded-full`}
      style={ns.cssVar({
        color: `var(${ns.cssVarName('primary-lighter')})`,
      })}
    >
      <audio ref={audioRef} src={src} className="hidden absolute" />

      <Icon size={30}>
        {isPlaying ? <IconAudioPause /> : <IconAudioPlay />}
      </Icon>

      {audioRef.current ? (
        <div className="absolute transition-all rounded-full duration-1000 top-full left-0 h-1 w-full bg-slate-300">
          <div
            className="absolute transition-all rounded-full duration-1000 top-0 left-0 h-1 bg-uneti-primary"
            style={{
              width: `${(audioRef.current?.currentTime / audioRef.current?.duration) * 100}%`,
            }}
          />
        </div>
      ) : null}
    </div>
  )
}
