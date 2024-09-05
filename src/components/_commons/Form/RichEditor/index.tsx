import { Tooltip as ReactTooltip } from 'react-tooltip'
import { HTMLAttributes, useCallback, useEffect, useRef, useState } from 'react'
import {
  Slate,
  Editable,
  withReact,
  RenderLeafProps,
  RenderElementProps,
  RenderPlaceholderProps,
  ReactEditor
} from 'slate-react'
import { withHistory } from 'slate-history'
import { createEditor, Descendant } from 'slate'

import {
  BlockButton,
  Element,
  Leaf,
  MarkButton
} from '@/components/_commons/Form/RichEditor/Slate.components'
import { isJsonString } from '@/core/utils/checkers'
import { Form } from 'react-bootstrap'

interface SlateEditorProps extends HTMLAttributes<HTMLDivElement> {
  label?: string
  name: string
  grid?: string
  info?: string
  error?: string | null
  value?: string
  placeholderValue?: JSX.Element
  readOnly?: boolean
  minHeight?: number
  onHandleInput?: ((value: string) => void) | undefined
}

export const RichEditor = ({
  grid,
  label,
  name,
  value = '',
  info,
  error = '',
  placeholderValue,
  onHandleInput,
  minHeight,
  readOnly = false,
  ...rest
}: SlateEditorProps) => {
  const editorRef = useRef<ReactEditor | null>(null)

  if (!editorRef.current)
    editorRef.current = withHistory(withReact(createEditor()))

  const editor = editorRef.current

  const [editorValue, setEditorValue] = useState<Descendant[]>([
    {
      type: 'paragraph',
      children: [{ text: '' }]
    }
  ])

  const renderElement = useCallback(
    (props: RenderElementProps) => <Element {...props} />,
    []
  )

  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <Leaf {...props} />,
    []
  )

  useEffect(() => {
    if (value && isJsonString(value) && editorRef.current) {
      editorRef.current.children = JSON.parse(value)
      setEditorValue(JSON.parse(value))
    }
  }, [value])

  return (
    <div className={'mb-2 form-group ' + grid}>
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
              className="me-2"
            >
              <i className="fa fa-info-circle text-primary"></i>
            </a>
          )}
          {label}
        </label>
      )}

      <Slate
        editor={editor}
        value={editorValue}
        onChange={value => {
          const isAstChange = editor.operations.some(
            op => op.type !== 'set_selection'
          )

          if (isAstChange) {
            const stringContent = JSON.stringify(value)

            setEditorValue(value)
            onHandleInput?.(stringContent)
          }
        }}
      >
        <div
          style={{
            minHeight: `${minHeight || 176}px`,
            backgroundColor: readOnly ? '#f8f8f8' : 'none'
          }}
          className={`slate-richtext-id form-control p-0 mb-2 ${
            { ...rest }.className
          }`}
        >
          <div
            className="d-flex py-2 ps-3"
            style={{
              borderBottom: readOnly
                ? '1px solid rgb(206 212 218)'
                : '1px solid rgb(206 212 218)',
              backgroundColor: readOnly ? '#e9ecef' : 'none'
            }}
          >
            <MarkButton format="bold" icon="fa fa-bold" disabled={readOnly} />

            <MarkButton
              format="italic"
              icon="fa fa-italic"
              disabled={readOnly}
            />

            <MarkButton
              format="underline"
              icon="fa fa-underline"
              disabled={readOnly}
            />
            <MarkButton format="code" icon="fa fa-code" disabled={readOnly} />

            <BlockButton format="heading-one" disabled={readOnly}>
              <b>
                <small>T1</small>
              </b>
            </BlockButton>

            <BlockButton format="heading-two" disabled={readOnly}>
              <b>
                <small>T2</small>
              </b>
            </BlockButton>

            <BlockButton
              format="block-quote"
              icon="fa fa-quote-right"
              disabled={readOnly}
            />

            <BlockButton
              format="numbered-list"
              icon="fa fa-list"
              disabled={readOnly}
            />

            <BlockButton
              format="bulleted-list"
              icon="fa fa-list-ol"
              disabled={readOnly}
            />
          </div>

          <Editable
            readOnly={readOnly}
            className="px-4 py-3"
            renderLeaf={renderLeaf}
            renderElement={renderElement}
            placeholder="Digite suas anotações"
            renderPlaceholder={({
              children,
              attributes
            }: RenderPlaceholderProps) => (
              <div {...attributes}>
                {placeholderValue ?? (
                  <>
                    <Form.Text as="p">{children}</Form.Text>
                    <pre style={{ width: '95%' }}>
                      Utilize a barra superior para estilizar seu campo de
                      texto.
                    </pre>
                  </>
                )}
              </div>
            )}
            spellCheck
          />
        </div>
      </Slate>

      <Form.Text as="p" className="text-danger my-1">
        {error}
      </Form.Text>
    </div>
  )
}
