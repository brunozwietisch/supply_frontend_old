import React, {
  PropsWithChildren,
  Ref,
  MouseEvent,
  ReactNode,
  ButtonHTMLAttributes
} from 'react'

import {
  BlockFormatType,
  isBlockActive,
  isMarkActive,
  MarkFormatType,
  TEXT_ALIGN_TYPES,
  toggleBlock,
  toggleMark
} from '@/components/_commons/Form/RichEditor/Slate.helpers'
import { RenderElementProps, RenderLeafProps, useSlate } from 'slate-react'

interface BaseProps {
  className: string
  [key: string]: unknown
}

export const Button = React.forwardRef(
  (
    {
      className,
      active,
      reversed,
      ...props
    }: PropsWithChildren<
      {
        active: boolean
        reversed: boolean
      } & BaseProps
    >,
    ref: Ref<HTMLSpanElement>
  ) => (
    <span
      {...props}
      ref={ref}
      className={className}
      style={{
        cursor: { ...props }.disabled ? 'not-allowed' : 'pointer',
        color: `${
          reversed
            ? active
              ? 'white'
              : '#aaa'
            : active
            ? '#1a73e8'
            : '#959595'
        }`
      }}
    />
  )
)

Button.displayName = 'Button'

export const MarkButton = ({
  format,
  icon,
  ...rest
}: {
  format: MarkFormatType
  icon: string
} & ButtonHTMLAttributes<HTMLButtonElement>) => {
  const editor = useSlate()

  return (
    <Button
      {...rest}
      type="button"
      className="me-2 btn btn-link-secondary btn-sm d-flex align-items-center"
      active={isMarkActive(editor, format)}
      onMouseDown={(e: MouseEvent<HTMLButtonElement>) => {
        if ({ ...rest }.disabled) return

        e.preventDefault()
        toggleMark(editor, format)
      }}
    >
      <i className={icon} />
    </Button>
  )
}

export const BlockButton = ({
  format,
  icon,
  children,
  ...rest
}: {
  format: BlockFormatType
  icon?: string
  children?: ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>) => {
  const editor = useSlate()

  return (
    <Button
      {...rest}
      type="button"
      className="me-2 btn btn-link-secondary btn-sm d-flex align-items-center"
      active={isBlockActive(
        editor,
        format,
        TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
      )}
      onMouseDown={(e: MouseEvent<HTMLButtonElement>) => {
        if ({ ...rest }.disabled) return

        e.preventDefault()
        toggleBlock(editor, format)
      }}
    >
      {icon ? <i className={icon} /> : children}
    </Button>
  )
}

export const Element = ({
  attributes,
  children,
  element
}: RenderElementProps) => {
  switch (element.type) {
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>

    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>

    case 'heading-one':
      return <h2 {...attributes}>{children}</h2>

    case 'heading-two':
      return <h3 {...attributes}>{children}</h3>

    case 'list-item':
      return <li {...attributes}>{children}</li>

    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>

    default:
      return <p {...attributes}>{children}</p>
  }
}

export const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.code) {
    children = <code>{children}</code>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  return <span {...attributes}>{children}</span>
}
