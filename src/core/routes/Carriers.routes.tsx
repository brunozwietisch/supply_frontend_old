import { CarriersFormPage } from '@/pages/Carriers/Form'
import { CarriersPage } from '@/pages/Carriers/Index'
import { Navigate } from 'react-router-dom'

export const Carrierroutes = {
  path: 'carriers',
  cangroup: ['carrier'],
  params: {
    name: 'Transportadoras',
    icon: 'far fa-list-alt'
  },
  children: [
    {
      index: true,
      element: <Navigate to="search" />
    },
    {
      path: 'create',
      element: <CarriersFormPage />,
      params: {
        name: 'Nova',
        icon: 'fas fa-plus'
      }
    },
    {
      path: ':carrier_id',
      element: <CarriersFormPage />
    },
    {
      path: 'search',
      element: <CarriersPage />,
      params: {
        name: 'Consulta',
        icon: 'fa fa-search'
      }
    }
  ]
}
