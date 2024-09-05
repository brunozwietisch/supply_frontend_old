import { LocationsFormPage } from '@/pages/Locations/Form'
import { LocationsPage } from '@/pages/Locations/Index'
import { Navigate } from 'react-router-dom'

export const Locationroutes = {
  path: 'locations',
  cangroup: ['location'],
  params: {
    name: 'Prédio/Local',
    icon: 'far fa-list-alt'
  },
  children: [
    {
      index: true,
      element: <Navigate to="search" />
    },
    {
      path: 'create',
      element: <LocationsFormPage />,
      params: {
        name: 'Nova',
        icon: 'fas fa-plus'
      }
    },
    {
      path: ':location_id',
      element: <LocationsFormPage />
    },
    {
      path: 'search',
      element: <LocationsPage />,
      params: {
        name: 'Consulta',
        icon: 'fa fa-search'
      }
    }
  ]
}
