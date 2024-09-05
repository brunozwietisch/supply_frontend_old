import { ReactNode, TdHTMLAttributes, CSSProperties } from 'react'

interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  value?: any
  children?: ReactNode
  align?: 'left' | 'center' | 'right' | 'justify' | undefined
  as?: 'th' | 'td'
}

export function TableCell({
  value = '-',
  align = 'left',
  as = 'td',
  children,
  ...rest
}: TableCellProps) {
  const cellStyles = {
    ...rest.style,
    textAlign: align,
    verticalAlign: as === 'td' ? 'middle' : 'inherit'
  } as CSSProperties

  function sanitizeValue(valueStr: any): string {
    const charsLimit = 300
    const isEmptyString = value.match(/^ *$/) !== null

    if (typeof valueStr !== 'string' || isEmptyString) return '-'

    const trimmedString =
      valueStr.length > charsLimit
        ? valueStr.substring(0, charsLimit - 3) + '...'
        : valueStr

    return trimmedString
  }

  return as === 'td' ? (
    <td {...rest} style={{ ...cellStyles }}>
      {children || sanitizeValue(value)}
    </td>
  ) : (
    <th {...rest} style={{ ...cellStyles }}>
      {children || sanitizeValue(value)}
    </th>
  )
}
