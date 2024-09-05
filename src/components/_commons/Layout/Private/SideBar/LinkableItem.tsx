import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { NavLink } from 'react-router-dom'

interface LinkableItemProps {
  linkTo: string
  name: string | JSX.Element
  icon: IconProp | string
}

export const LinkableItem = ({ linkTo, name, icon }: LinkableItemProps) => {
  const currentLocationPath = location.pathname
  const isActive = currentLocationPath === `${linkTo}`

  return (
    <li
      className={isActive ? 'active' : ''}
      style={{ cursor: 'pointer', padding: '.35rem 0' }}
    >
      <NavLink to={linkTo} className="nav-link" style={{ cursor: 'pointer' }}>
        <i className={String(icon)} style={{ marginRight: '8px' }} />
        <span>{name}</span>
      </NavLink>
    </li>
  )
}
