import { useBem } from '@/Services/Hooks'
import { useEffect, useRef } from 'react'

import './FileSelect.scss'
import { store } from '@/Services/Redux/store'
import Resumable from 'resumablejs'
import { FaPlus } from 'react-icons/fa6'
import Swal from 'sweetalert2'
import { useState } from 'react'

export const FileSelect = (props) => {
  const {
    maxFiles = 1,
    maxFileSize = undefined,
    fileType = ['jpg', 'jpeg', 'png'],
    handleFilesChange,
    width = 40,
    height = 40,
    icon = <FaPlus />,
  } = props

  const fileId = `file-${Math.random(1111, 9999) * 1000}`

  const bem = useBem('file-select')

  const browseFile = useRef()

  const [fileCached, setFileCached] = useState([])

  useEffect(() => {
    const resumable = new Resumable({
      target: '', // TODO:
      fileType: fileType,
      chunkSize: 6000000, // 6M
      headers: () => {
        const dataToken = store.getState()?.auth?.login?.currentToken

        if (dataToken) {
          const { token: accessToken } = dataToken

          return {
            Accept: 'application/json',
            Authorization: `Bearer ${accessToken}`,
          }
        }
      },
      testChunks: false,
      maxFileSize: maxFileSize,
      forceChunkSize: true,
      maxFiles: maxFiles,
      withCredentials: true,
      chunkRetryInterval: 10000, // 10s
      fileTypeErrorCallback() {
        Swal.fire({
          icon: 'error',
          title: 'Lỗi',
          text: `Chỉ chấp nhận các file ${fileType.join(', ')}`,
        })
      },
      maxFilesErrorCallback() {
        Swal.fire({
          icon: 'error',
          title: 'Lỗi',
          text: `Chỉ được chọn tối đa ${maxFiles} ${
            maxFiles == 1 ? 'file' : 'files'
          }!`,
        })
      },
      maxFileSizeErrorCallback() {
        maxFileSize &&
          Swal.fire({
            icon: 'error',
            title: 'Lỗi',
            text: `File không được vượt quá ${maxFileSize}!`,
          })
      },
      minFileSizeErrorCallback(file, errorCount) {
        console.log({ file, errorCount })
      },
      query: () => {
        return {}
      },
    })

    resumable.assignBrowse(browseFile.current, false)
    resumable.assignDrop(browseFile.current)

    resumable.on('fileAdded', (file) => {
      setFileCached(file)
      handleFilesChange(file.file)
    })

    resumable.on('progress', () => {})

    resumable.on('fileSuccess', () => {})

    resumable.on('fileError', () => {})
  }, [])

  return (
    <div
      ref={browseFile}
      data-dropzone-id={fileId}
      id={fileId}
      className={bem.b()}
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      <span className={bem.e('icon')}>{icon}</span>
      {/* <p className={bem.e('label')}>{label}</p> */}
    </div>
  )
}

export default FileSelect
