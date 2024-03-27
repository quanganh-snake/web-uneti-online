import { useEffect, useMemo, useRef, useState } from 'react'
import ReactQuill, { Quill } from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import PropTypes from 'prop-types'
import { htmlToMarkdown } from '@/Services/Utils/stringUtils'

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, false] }],
  ['bold', 'italic', 'underline', 'strike', 'blockquote', 'link'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ indent: '-1' }, { indent: '+1' }],
]

export const TextEditor = (props) => {
  const { id, value, onChange } = props
  const reactQuillRef = useRef(null)
  const [content, setContent] = useState('')

  const handleChangeValue = (value) => {
    setContent(value)
    onChange(value)
  }

  return (
    <ReactQuill
      ref={reactQuillRef}
      id={id}
      theme="snow"
      placeholder="Nhập nội dung..."
      modules={{
        toolbar: {
          container: TOOLBAR_OPTIONS,
        },
      }}
      value={value || content}
      onChange={handleChangeValue}
    />
  )
}

TextEditor.propTypes = {
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string,
}
