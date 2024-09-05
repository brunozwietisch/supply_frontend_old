import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'

import { TOKEN_ACCESS_KEY, STORAGE_USER } from '@/core/constants/index'
import { AuthResponse } from '@/core/domain/Auth/Auth.types'
import { SearchOption } from '@/components/_commons/Form/SearchSelect/SearchSelect'
import { CollaboratorResponse } from '@/core/domain/Collaborator/Collaborator.types'
import { UserResponse } from '@/core/domain/User/User.types'

interface AuthProviderProps {
  children: ReactNode
}

interface AuthContextData {
  collaborator?: UserResponse
  isLoggedIn: boolean
  saveUser: (response?: AuthResponse) => void
  removeUser: () => void
  getUser: () => SearchOption | undefined
  getPermissions: () => Array<{ permission: string }> | undefined
  getCollaborator: () => SearchOption | undefined
}

const AuthContext = createContext({} as AuthContextData)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<UserResponse>()
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    () => localStorage.getItem(TOKEN_ACCESS_KEY) !== null
  )

  useEffect(() => {
    const userStorage = localStorage.getItem(STORAGE_USER)
    const tokenStorage = localStorage.getItem(TOKEN_ACCESS_KEY)

    if (userStorage !== null && tokenStorage !== null) {
      const currentUser: UserResponse = JSON.parse(userStorage)

      setCurrentUser(currentUser)

      setIsLoggedIn(true)
    }
  }, [])

  function saveUser(response?: AuthResponse) {
    if (response) {
      const {
        id,
        name,
        email,
        permissions,
        companies,
        operation,
        approver,
        fixed,
        validator
      } = response

      // Salvar token de acesso no localStorage
      localStorage.setItem(TOKEN_ACCESS_KEY, response.token)

      // Salvar informações do usuário no localStorage
      const user: UserResponse = {
        id,
        name,
        email,
        permissions,
        companies,
        operation,
        approver,
        fixed,
        validator
      }
      localStorage.setItem(STORAGE_USER, JSON.stringify(user))

      // Definir o usuário atual e o status de login
      setCurrentUser(user)
      setIsLoggedIn(true)
    }
  }

  function removeUser() {
    localStorage.removeItem(TOKEN_ACCESS_KEY)
    localStorage.removeItem(STORAGE_USER)
    setCurrentUser(undefined)
    setIsLoggedIn(false)
  }

  function getUser() {
    const userStorage = localStorage.getItem(STORAGE_USER)

    if (userStorage) {
      const Collaborator = JSON.parse(userStorage) as CollaboratorResponse
      return {
        name: Collaborator.name,
        value: Collaborator?.id
      } as SearchOption
    }

    return undefined
  }

  function getPermissions(): { permission: string }[] | undefined {
    const userStorage = localStorage.getItem(STORAGE_USER)

    if (userStorage) {
      const collaborator = JSON.parse(userStorage) as CollaboratorResponse
      if (
        collaborator &&
        Array.isArray(collaborator.permissions) &&
        collaborator.permissions.length > 0
      ) {
        const permissionsArray = collaborator.permissions.map(permission => ({
          permission: permission.slug
        }))

        return permissionsArray
      }
    }

    return undefined
  }

  function getCollaborator() {
    const userStorage = localStorage.getItem(STORAGE_USER)
    if (userStorage) {
      const user = JSON.parse(userStorage) as any
      return {
        name: user.collaborator?.name,
        value: user.collaborator?.id
      } as SearchOption
    }

    return undefined
  }

  return (
    <AuthContext.Provider
      value={{
        collaborator: currentUser,
        isLoggedIn,
        saveUser,
        removeUser,
        getUser,
        getPermissions,
        getCollaborator
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
