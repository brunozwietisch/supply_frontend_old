import { IconProp } from '@fortawesome/fontawesome-svg-core'

import { RouteParamProps } from '@/core/routes'
import { RouteProps } from 'react-router-context/dist/types/Routing'
import { ReactNode, useState } from 'react'
import { formatRoutes } from '@/core/utils/formatters'

interface MultiLevelItemProps {
  name: string
  icon: IconProp
  children: ReactNode
  childrens: RouteProps<RouteParamProps>[]

  isOpen: boolean
  isDeepItem: boolean
  onControlledOpen: () => void
  onControlledClose: () => void
}

export const MultiLevelItem = ({
  name,
  icon,
  isOpen,
  children,
  childrens,
  isDeepItem,
  onControlledOpen,
  onControlledClose
}: MultiLevelItemProps) => {
  const isActive = checkIsActive()
  const hasChildren = !!childrens
  const [isDeepItemOpen, setIsDeepItemOpen] = useState(false)
  const isOpened = isDeepItem ? isDeepItemOpen : isOpen

  function handleToggleMenu() {
    if (isDeepItem) {
      setIsDeepItemOpen(!isDeepItemOpen)
      return
    }

    if (isOpen) {
      onControlledClose()
    } else {
      onControlledOpen()
    }
  }

  function checkIsActive(): boolean {
    const fullPathChildrens = formatRoutes(childrens as RouteProps<any>[]).map(
      (route: any) => {
        if (route.fullPath) return route.fullPath

        return ''
      }
    )

    const hasActiveChildren = fullPathChildrens.reduce((previous, current) => {
      let activeChildren = false

      if (
        current === location.pathname ||
        location.pathname.includes(current)
      ) {
        activeChildren = true
      }

      return previous === true ? previous : activeChildren
    }, [])

    return hasActiveChildren
  }

  const itemClasses = [
    isActive ? 'active' : null,
    hasChildren ? 'treeview' : null,
    isOpened ? 'menu-open' : null
  ]
    .filter(p => p)
    .join(' ')

  return (
    <li
      className={itemClasses}
      style={{
        cursor: 'pointer',
        padding: '.25rem 0'
      }}
    >
      <a
        className="nav-link"
        style={{ cursor: 'pointer' }}
        onClick={() => {
          handleToggleMenu()
        }}
      >
        <i className={String(icon)} style={{ marginRight: '8px' }} />
        <span>{name}</span>

        <span className="pull-right-container">
          <i className="fa fa-angle-left pull-right" />
        </span>
      </a>

      <ul
        className={`treeview-menu`}
        style={{
          height: 'auto',
          display: 'block',
          opacity: isOpened ? 1 : 0,
          transition: 'all 0.2s ease',
          maxHeight: isOpened ? '5000px' : 0
        }}
      >
        {children}
      </ul>
    </li>
  )
}
