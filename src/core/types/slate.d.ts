import { BaseEditor } from 'slate'
import { ReactEditor } from 'slate-react'

export type ElementType =
  | 'paragraph'
  | 'bold'
  | 'italic'
  | 'underline'
  | 'code '
  | 'heading-one'
  | 'heading-two'
  | 'url'
  | 'list-item'
  | 'block-quote'
  | 'numbered-list'
  | 'bulleted-list'

export type LeafType = 'bold' | 'code' | 'italic' | 'undeline'

type CustomElement = { type: ElementType; children: CustomText[] }
type CustomText = {
  text: string
  bold?: boolean
  italic?: boolean
  code?: boolean
  underline?: boolean
}

declare module 'slate' {
  export interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}
