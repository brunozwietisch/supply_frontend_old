import { VehiclesFormPage } from '@/pages/Vehicles/Form'
import { VehiclesPage } from '@/pages/Vehicles/Index'
import { Navigate } from 'react-router-dom'

export const Vehicleroutes = {
  path: 'vehicles',
  cangroup: ['vehicle'],
  params: {
    name: 'Veículos',
    icon: 'far fa-list-alt'
  },
  children: [
    {
      index: true,
      element: <Navigate to="search" />
    },
    {
      path: 'create',
      element: <VehiclesFormPage />,
      params: {
        name: 'Nova',
        icon: 'fas fa-plus'
      }
    },
    {
      path: ':Vehicle_id',
      element: <VehiclesFormPage />
    },
    {
      path: 'search',
      element: <VehiclesPage />,
      params: {
        name: 'Consulta',
        icon: 'fa fa-search'
      }
    }
  ]
}
