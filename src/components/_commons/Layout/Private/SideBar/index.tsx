import { useRef, useState } from 'react'
import { useRoutes } from 'react-router-context'
import { RouteProps } from 'react-router-context/dist/types/Routing'

import { LinkableItem } from '@/components/_commons/Layout/Private/SideBar/LinkableItem'
import { MultiLevelItem } from '@/components/_commons/Layout/Private/SideBar/MultiLevelItem'

import { RouteParamProps } from '@/core/routes'
import { formatRoutes } from '@/core/utils/formatters'

import styles from './styles.module.scss'
import { useDom } from '@/core/hooks/useDom'
import { useAuth } from '@/core/contexts/AuthContext'

export const SideBar = () => {
  const { getPermissions } = useAuth()
  const permissionsArray = getPermissions()

  const Permissions = permissionsArray
    ? Array.from(
        new Set(permissionsArray.map(permission => permission.permission))
      )
    : []

  const routes = useRoutes<RouteProps<RouteParamProps>>(['app'])

  const filteredRoutes = routes
    .map((route: any) => {
      const filteredChildren =
        route &&
        route.children?.filter(
          (child: { cangroup: any }) =>
            !child.cangroup || // Verifica se child.cangroup é undefined ou null
            child.cangroup === '*' || // Verifica se child.cangroup é marcado com "*"
            child.cangroup.some((role: any) => Permissions.includes(role)) // Verifica se o usuário tem a permissão
        )
      return {
        ...route,
        children:
          filteredChildren && filteredChildren.length > 0
            ? filteredChildren
            : undefined
      }
    })
    .filter(route => route.children && route.children.length > 0)

  const menuItems =
    filteredRoutes.length > 0
      ? formatRoutes(filteredRoutes[0].children || []).filter(
          item => item.path && item.params
        )
      : []

  const menuRef = useRef<HTMLDivElement>(null)
  const [activeMenuItemOpen, setActiveMenuItemOpen] = useState<number>()
  const { screenSize } = useDom()

  function closeAllItems() {
    setActiveMenuItemOpen(undefined)
  }

  function closeAllItemsExceptBy(id: number) {
    setActiveMenuItemOpen(id)
  }

  const renderItems = (
    menuItems: RouteProps<RouteParamProps>[] | undefined
  ) => {
    return menuItems
      ?.filter(item => !!item?.params)
      .map((item: any, index: number) => {
        const isDeepItem = !!item.parent
        const hasChildren = !!item.children
        const path = item.path === '/app/HeaderItem'

        const hasNoParamsInChildrens =
          item.children?.filter(
            (item: RouteProps<RouteParamProps>) => 'params' in item
          ).length === 0

        if (path) {
          return (
            <li key={index} className="header pt-3">
              <span>{item.params.name}</span>
            </li>
          )
        }

        if (!hasChildren || hasNoParamsInChildrens) {
          return (
            <LinkableItem
              key={index}
              name={item.params.name}
              icon={item.params.icon}
              linkTo={item?.fullPath ?? '#'}
            />
          )
        }

        return (
          <MultiLevelItem
            key={index}
            name={item.params.name}
            icon={item.params.icon}
            isOpen={activeMenuItemOpen === index}
            isDeepItem={isDeepItem}
            onControlledClose={closeAllItems}
            onControlledOpen={() => {
              closeAllItemsExceptBy(index)
            }}
            childrens={item.children!.filter((item: RouteProps) => !!item.path)}
          >
            {renderItems(item.children)}
          </MultiLevelItem>
        )
      })
  }

  return (
    <aside
      id="main-sidebar"
      ref={menuRef}
      className={`main-sidebar ${styles.menuContainer} position-fixed`}
      style={{
        paddingTop: screenSize === 'xs' ? '50px' : 'auto'
      }}
    >
      <section className="sidebar">
        <ul className={`sidebar-menu ${styles.menuList}`} data-widget="tree">
          {renderItems(menuItems)}
        </ul>
      </section>
    </aside>
  )
}
