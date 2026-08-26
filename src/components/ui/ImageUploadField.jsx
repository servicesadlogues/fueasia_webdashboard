import { useEffect, useId, useRef, useState } from 'react'
import { ImagePlus, X } from 'lucide-react'
import IconButton from './IconButton'

const formatFileSize = (bytes) => {
  if (!bytes) return ''
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

const ImageUploadField = ({
  label,
  required = false,
  accept = '.jpg,.jpeg,.png,image/jpeg,image/png',
  hint = 'JPG or PNG · max 5MB',
  value,
  onChange,
  name,
}) => {
  const inputId = useId()
  const inputRef = useRef(null)
  const [preview, setPreview] = useState('')
  const [dragOver, setDragOver] = useState(false)

  useEffect(() => {
    if (!value) {
      setPreview('')
      if (inputRef.current) inputRef.current.value = ''
      return undefined
    }
    const url = URL.createObjectURL(value)
    setPreview(url)
    return () => URL.revokeObjectURL(url)
  }, [value])

  const handleFiles = (files) => {
    onChange(files?.[0] || null)
  }

  const handleClear = (e) => {
    e.preventDefault()
    e.stopPropagation()
    onChange(null)
  }

  const handleDragEnter = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragOver(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragOver(false)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragOver(false)
    handleFiles(e.dataTransfer.files)
  }

  const dropClass = [
    'ds-upload-drop',
    value ? 'is-filled' : '',
    dragOver ? 'is-drag' : '',
  ].filter(Boolean).join(' ')

  return (
    <div className="ds-upload">
      {label ? (
        <label className="label" htmlFor={inputId}>
          {label}
          {required ? <span className="required"> *</span> : null}
        </label>
      ) : null}

      <div
        className={dropClass}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          id={inputId}
          className="ds-upload-input"
          type="file"
          name={name}
          accept={accept}
          required={required && !value}
          onChange={(e) => handleFiles(e.target.files)}
        />

        {value ? (
          <div className="ds-upload-filled">
            {preview ? (
              <img src={preview} alt="" className="ds-upload-preview" />
            ) : (
              <div className="ds-upload-preview ds-upload-preview-empty" />
            )}
            <div className="min-w-0">
              <p className="ds-upload-title truncate" title={value.name}>{value.name}</p>
              <p className="ds-upload-hint mt-0.5">
                {formatFileSize(value.size)}
                {hint ? ` · Click to replace` : ''}
              </p>
            </div>
            <IconButton
              label="Remove file"
              className="ds-upload-remove"
              onClick={handleClear}
            >
              <X size={16} strokeWidth={2} aria-hidden="true" />
            </IconButton>
          </div>
        ) : (
          <div className="ds-upload-empty">
            <span className="ds-upload-icon">
              <ImagePlus size={22} strokeWidth={2} aria-hidden="true" />
            </span>
            <p className="ds-upload-title">Click to upload or drag and drop</p>
            {hint ? <p className="ds-upload-hint">{hint}</p> : null}
          </div>
        )}
      </div>
    </div>
  )
}

export default ImageUploadField
