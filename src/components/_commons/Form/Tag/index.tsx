import React, { useState } from 'react'
import { Tooltip as ReactTooltip } from 'react-tooltip'

import styles from './styles.module.scss'

interface TagInputProps {
  name: string
  label: string
  tags: string[]
  grid?: string
  info?: string
  error?: string | null
  disabled?: boolean
  placeholder?: string
  onUpdateTags: (tags: string[]) => void
  getRemovedTag?: (tag: string) => void
  getAddedTag?: (tag: string) => void
}

export function TagsInput({
  name,
  label,
  tags,
  grid,
  info,
  disabled,
  error,
  placeholder,
  onUpdateTags,
  getRemovedTag,
  getAddedTag
}: TagInputProps) {
  const [currentTag, setCurrentTag] = useState('')

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget

    const isEmptyOrNull = value === null || value === ''
    const isEnterKeyPress = e.key === 'Enter'
    const tagExists = tags.find(tag => tag === value)

    if (isEnterKeyPress && !isEmptyOrNull && !tagExists) {
      onUpdateTags([...tags, value])
      setCurrentTag('')
      if (getAddedTag) {
        getAddedTag(value)
      }
    }
  }

  const handleRemoveTag = (tag: string) => {
    if (getRemovedTag) {
      getRemovedTag(tag)
    }
    onUpdateTags([...tags.filter(t => t !== tag)])
  }

  return (
    <div className={`mb-2 form-group ${grid}`}>
      <ReactTooltip
        anchorId={`id-info-` + name}
        className="react-tooltip-display"
      />

      {label && (
        <label
          htmlFor={name}
          className="form-label"
          title={label}
          style={{
            width: '100%',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {info && (
            <a
              id={`id-info-` + name}
              data-tooltip-content={info}
              data-tooltip-variant="info"
            >
              <i className="fa fa-info-circle me-2 text-primary"></i>
            </a>
          )}
          {label}
        </label>
      )}

      <div>
        <input
          disabled={disabled}
          name={name}
          value={currentTag}
          onChange={event => {
            setCurrentTag(event.target.value)
          }}
          onKeyUp={event => handleAddTag(event)}
          placeholder={placeholder}
          className="form-control mb-3"
          autoComplete="off"
        />

        <div className="hstack gap-2 d-flex flex-wrap">
          {tags.map((tag, index) => (
            <div key={`tag-${index}`} className={styles.tagContent}>
              {tag}
              <span
                onClick={() => handleRemoveTag(tag)}
                style={{ cursor: 'pointer' }}
              >
                ×
              </span>
            </div>
          ))}
        </div>

        <p className="text-danger my-1">{error}</p>
      </div>
    </div>
  )
}
