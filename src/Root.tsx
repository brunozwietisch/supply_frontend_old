import { ReactNode } from 'react'
import { ToastContainer } from 'react-toastify'
import { QueryClient, QueryClientProvider } from 'react-query'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement
} from 'chart.js'

import { AuthProvider } from '@/core/contexts/AuthContext'
import { LocaleProvider } from '@/core/contexts/LocaleContext'

interface RootProps {
  children: ReactNode
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
)

export const Root = ({ children }: RootProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <LocaleProvider>
        <AuthProvider>
          {children}
          <ToastContainer />
        </AuthProvider>
      </LocaleProvider>
    </QueryClientProvider>
  )
}
