import { useState } from 'react'
import { toast } from 'react-toastify'
import { NavLink, useNavigate } from 'react-router-dom'

import { useAuth } from '@/core/contexts/AuthContext'
import { Button } from '@/components/_commons/Form/Button'
import { DialogBox } from '@/components/_commons/Modal'

import expandedLogo from '@/assets/img/logo-text.png'
import shortLogo from '@/assets/img/short_logo.png'

interface MainHeaderProps {
  toggleMenuSidebar: () => void
}

// TODO: Refactor Component, remove unused parts
export const MainHeader = ({ toggleMenuSidebar }: MainHeaderProps) => {
  const [showConfirmLogoutModal, setShowConfirmLogoutModal] = useState(false)

  const handleCloseConfirmLogoutModal = (exit?: boolean) => {
    if (exit) handleLogout()

    setShowConfirmLogoutModal(false)
  }

  const navigate = useNavigate()
  const { removeUser, collaborator } = useAuth()

  function handleLogout() {
    removeUser()

    toast.success('Logout realizado com sucesso!')

    navigate('/')
  }

  return (
    <header
      className="main-header position-fixed w-100"
      style={{ height: '50px' }}
    >
      {/* Logo */}
      <NavLink
        to="/app/dashboard"
        className="logo d-flex align-items-center justify-content-center position-fixed"
      >
        <img
          src={shortLogo}
          className="logo-mini"
          alt="AdminLTE Logo"
          style={{
            height: '40px',
            cursor: 'pointer'
          }}
        />

        <img
          src={expandedLogo}
          alt="AdminLTE Logo"
          className="logo-lg"
          style={{
            height: '40px',
            cursor: 'pointer'
          }}
        />
      </NavLink>

      {/* Navbar */}
      <nav className="navbar navbar-static-top p-0">
        <a
          href="#"
          className="sidebar-toggle fa5"
          data-toggle="push-menu"
          role="button"
          style={{
            minHeight: '50px'
          }}
          onClick={() => toggleMenuSidebar()}
        >
          <span className="sr-only">Toggle navigation</span>
        </a>

        <div className="navbar-custom-menu">
          <ul className="nav navbar-nav d-flex flex-row align-items-center">
            <li className="dropdown user user-menu nav-item">
              <a
                href="#"
                className="nav-link"
                style={{
                  padding: '15px',
                  minHeight: '50px'
                }}
              >
                <span
                  style={{
                    fontSize: '14px'
                  }}
                >
                  {collaborator?.name}
                </span>
              </a>
            </li>

            <li className="nav-item nav">
              <a
                href="#"
                className="nav-link"
                style={{
                  padding: '10px'
                }}
              >
                <Button
                  onClick={() => setShowConfirmLogoutModal(true)}
                  title="Sair"
                  style={{
                    background: 'transparent',
                    border: 0
                  }}
                >
                  <i className="fas fa-sign-out-alt"></i>
                </Button>
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Modal Confirmação Logout */}
      <DialogBox
        show={showConfirmLogoutModal}
        titleHeader="Confirmação de Logout"
        titleButtonAction="Sair"
        titleButtonCancel="Ficar"
        onHandleAction={() => handleCloseConfirmLogoutModal(true)}
        onHandleClose={() => handleCloseConfirmLogoutModal()}
        loadButtonAction={false}
        centered
      >
        <p className="mb-0 p-2" style={{ fontSize: '1.14rem' }}>
          Você realmente deseja sair?
        </p>
      </DialogBox>
    </header>
  )
}
