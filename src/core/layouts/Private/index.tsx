import { Outlet, useNavigate } from 'react-router-dom'
import { ReactNode, useEffect, useState } from 'react'
import { useAuth } from '@/core/contexts/AuthContext'
import { useDom } from '@/core/hooks/useDom'

import { MainHeader } from '@/components/_commons/Layout/Private/Header'
import { SideBar } from '@/components/_commons/Layout/Private/SideBar'
import { Footer } from '@/components/_commons/Layout/Private/Footer'
import { ScrollToTop } from '@/components/_commons/Layout/ScrollTop'

interface LayoutProps {
  element?: ReactNode
}

const PrivateLayout = ({ element }: LayoutProps) => {
  const [isSidebarMenuCollapsed, setIsSidebarMenuCollapsed] =
    useState<boolean>(false)

  const { screenSize, addRootClassNames, removeRootClassNames } = useDom()
  const { isLoggedIn } = useAuth()
  const navigate = useNavigate()

  const handleToggleMenuSidebar = () => {
    setIsSidebarMenuCollapsed(!isSidebarMenuCollapsed)
  }

  // Controle de usuário não logado
  useEffect(() => {
    if (!isLoggedIn) navigate('/')
  }, [isLoggedIn])

  // Controle de Layout
  useEffect(() => {
    removeRootClassNames(['register-page', 'login-page', 'hold-transition'])
    addRootClassNames(['sidebar-mini', 'layout-fixed'])

    return () => {
      removeRootClassNames(['sidebar-mini', 'layout-fixed'])
    }
  }, [])

  // Controle Sidebar
  useEffect(() => {
    removeRootClassNames(['sidebar-closed', 'sidebar-collapse', 'sidebar-open'])

    if (isSidebarMenuCollapsed && screenSize === 'lg') {
      addRootClassNames(['sidebar-collapse'])
    } else if (isSidebarMenuCollapsed && screenSize === 'xs') {
      addRootClassNames(['sidebar-open'])
    } else if (!isSidebarMenuCollapsed && screenSize !== 'lg') {
      addRootClassNames(['sidebar-closed', 'sidebar-collapse'])
    }
  }, [screenSize, isSidebarMenuCollapsed])

  return (
    <>
      <div className="wrapper" style={{ height: 'auto', minHeight: '100%' }}>
        <MainHeader toggleMenuSidebar={handleToggleMenuSidebar} />

        <SideBar />

        <div
          className="content-wrapper"
          style={{ paddingTop: '50px', minHeight: 'calc(100vh - 50px - 27px)' }}
        >
          <div
            className="content"
            id="private-layout"
            style={{ minHeight: 'inherit' }}
          >
            {element || <Outlet />}
          </div>
        </div>

        <Footer />
      </div>

      <ScrollToTop />
    </>
  )
}

export default PrivateLayout
