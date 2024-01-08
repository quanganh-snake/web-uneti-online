import { GopYView } from '@/Components/HoTroThietBiGiangDuong/GopY/GopYView'
import { useState } from 'react'

export default function GopY() {
  const [tieuDe, setTieuDe] = useState('')
  const [noiDung, setNoiDung] = useState('')

  const [files, setFiles] = useState([])

  const handleRemoveFile = (file) => {
    console.log('rem', file)
    setFiles([])
  }

  const handleFilesChange = (file) => {
    console.log(file)
    setFiles([file])
  }

  const handleChangeValue = (e) => {
    if (e.target.id == 'HTTBGD_TieuDe') {
      setTieuDe(e.target.value)
    }
    if (e.target.id == 'HTTBGD_NoiDung') {
      setNoiDung(e.target.value)
    }
  }

  const handleSubmitData = async () => {}

  return (
    <GopYView
      tieuDe={tieuDe}
      noiDung={noiDung}
      files={files}
      handleRemoveFile={handleRemoveFile}
      handleFilesChange={handleFilesChange}
      handleChangeValue={handleChangeValue}
      handleSubmitData={handleSubmitData}
    />
  )
}
