import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginForm } from '@/components/Login/Forms/LoginForm'
import { useAuth } from '@/core/contexts/AuthContext'

export const LoginPage = () => {
  const navigate = useNavigate()
  const { isLoggedIn } = useAuth()

  useEffect(() => {
    if (isLoggedIn) navigate('/app/dashboard')
  }, [])

  return <LoginForm />
}
