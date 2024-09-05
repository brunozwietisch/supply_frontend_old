import { CostCentersFormPage } from '@/pages/CostCenter/Form'
import { CostCentersPage } from '@/pages/CostCenter/Index'
import { Navigate } from 'react-router-dom'

export const CostCenterroutes = {
  path: 'costcenters',
  cangroup: ['costcenter'],
  params: {
    name: 'Centro de Custo',
    icon: 'far fa-list-alt'
  },
  children: [
    {
      index: true,
      element: <Navigate to="search" />
    },
    {
      path: 'create',
      element: <CostCentersFormPage />,
      params: {
        name: 'Nova',
        icon: 'fas fa-plus'
      }
    },
    {
      path: ':cost_center_id',
      element: <CostCentersFormPage />
    },
    {
      path: 'search',
      element: <CostCentersPage />,
      params: {
        name: 'Consulta',
        icon: 'fa fa-search'
      }
    }
  ]
}
