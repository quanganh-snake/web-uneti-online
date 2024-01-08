export const handleOpenFileBase64 = async (base64String) => {
  const createBlobAndOpen = (base64, contentType, downloadName) => {
    const byteCharacters = atob(base64)
    const byteNumbers = new Array(byteCharacters.length)
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i)
    }
    const byteArray = new Uint8Array(byteNumbers)
    const blob = new Blob([byteArray], { type: contentType })

    const blobUrl = URL.createObjectURL(blob)
    if (downloadName) {
      const link = document.createElement('a')
      link.href = blobUrl
      link.download = downloadName
      link.click()
    } else {
      window.open(blobUrl)
    }
  }

  const processBase64String = (prefix) => {
    return base64String.startsWith(prefix)
      ? base64String.substring(prefix.length)
      : base64String
  }

  if (base64String.startsWith('data:application/pdf;base64,')) {
    createBlobAndOpen(
      processBase64String('data:application/pdf;base64,'),
      'application/pdf',
    )
  } else if (base64String.startsWith('data:image')) {
    const windowRef = window.open('', '_blank')
    windowRef.document.write(`<img src="${base64String}" alt="Image"/>`)
  } else if (
    base64String.startsWith(
      'data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,',
    )
  ) {
    createBlobAndOpen(
      processBase64String(
        'data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,',
      ),
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'File_TTHC_GV.docx',
    )
  } else if (base64String.startsWith('data:application/msword;base64,')) {
    createBlobAndOpen(
      processBase64String('data:application/msword;base64,'),
      'application/msword',
      'File_TTHC_GV.doc',
    )
  }
}

export const handlePreviewFileBase64 = async (
  fileName,
  base64StringWithoutPrefix,
) => {
  const createBlobAndOpen = (base64, contentType) => {
    const byteCharacters = atob(base64)
    const byteNumbers = new Array(byteCharacters.length)
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i)
    }
    const byteArray = new Uint8Array(byteNumbers)
    const blob = new Blob([byteArray], { type: contentType })

    const blobUrl = URL.createObjectURL(blob)

    if (fileName) {
      const link = document.createElement('a')
      link.href = blobUrl
      link.download = fileName
      link.click()
    } else {
      window.open(blobUrl)
    }
  }

  if (fileName.endsWith('.pdf')) {
    createBlobAndOpen(base64StringWithoutPrefix, 'application/pdf')
  } else if (fileName.match(/\.(jpeg|jpg|png|gif)$/i)) {
    let prefixImage
    if (fileName.endsWith('.jpeg') || fileName.endsWith('.jpg')) {
      prefixImage = 'image/jpeg'
    } else if (fileName.endsWith('.png')) {
      prefixImage = 'image/png'
    } else if (fileName.endsWith('.gif')) {
      prefixImage = 'image/gif'
    }
    createBlobAndOpen(`data:${prefixImage};base64,${base64StringWithoutPrefix}`)
  } else if (fileName.endsWith('.docx')) {
    createBlobAndOpen(
      base64StringWithoutPrefix,
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      fileName,
    )
  } else if (fileName.endsWith('.doc')) {
    createBlobAndOpen(base64StringWithoutPrefix, 'application/msword', fileName)
  }
}

export const getFileType = (file) => {
  if (file && file.name) {
    return file.name.split('.').pop()
  }
  return null
}
/**
 * Format bytes as human-readable text.
 *
 * @param bytes Number of bytes.
 * @param si True - File size là 1000 = 1MB, False - 1024 = 1MB
 * @param dp Số hiển thị sau dấu phẩy
 *
 * @return Formatted string.
 */
export const humanFileSize = (bytes, si = false, dp = 2) => {
  const thresh = si ? 1000 : 1024

  if (Math.abs(bytes) < thresh) {
    return `${bytes} B`
  }

  const units = si
    ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']
  let u = -1
  const r = 10 ** dp

  do {
    bytes /= thresh
    ++u
  } while (
    Math.round(Math.abs(bytes) * r) / r >= thresh &&
    u < units.length - 1
  )

  return `${bytes.toFixed(dp)} ${units[u]}`
}
