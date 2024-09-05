import { Navigate } from 'react-router-dom'
import { RouteProps } from 'react-router-context/dist/types/Routing'
import { Layout } from '@/core/layouts'
import { LoginPage } from '@/pages/Login'
import { DashboardPage } from '@/pages/Dashboard'
import { NotFoundPage } from '@/pages/ErrosPages/NotFoundPage'
import { Companiesroutes } from '@/core/routes/Companies.routes'
import { CostCenterroutes } from '@/core/routes/CostCenter.routes'
import { Locationroutes } from '@/core/routes/Location.routes'
import { Holidayroutes } from '@/core/routes/Holiday.routes'
import { HeaderSettings } from '@/core/routes/HeaderSettings'
import { Collaboratorsroutes } from '@/core/routes/Collaborators.routes'
import { Carrierroutes } from '@/core/routes/Carriers.routes'
import { Vehicleroutes } from '@/core/routes/Vehiles.routes'

export type RouteParamProps = {
  name: string
  label?: string
  icon?: string
  can?: string
}

export const ROUTES: RouteProps<RouteParamProps>[] = [
  {
    path: '/',
    element: <Layout.Public element={<LoginPage />} />
  },
  {
    path: '*',
    element: <Layout.Public element={<NotFoundPage />} />
  },
  {
    path: 'app',
    element: <Layout.Private />,
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" />
      },
      {
        path: 'dashboard',
        element: <DashboardPage />
      },
      { ...HeaderSettings },
      { ...Companiesroutes },
      { ...CostCenterroutes },
      { ...Holidayroutes },
      { ...Locationroutes },
      { ...Carrierroutes },
      { ...Vehicleroutes },
      { ...Collaboratorsroutes }
    ]
  }
]
