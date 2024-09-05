interface HeaderItemProps {
  content: string
}

export const HeaderItem = ({ content }: HeaderItemProps) => {
  return (
    <li className="header pt-3">
      <span>{content.toUpperCase()}</span>
    </li>
  )
}
