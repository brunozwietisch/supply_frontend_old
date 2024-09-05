import { CompaniesPage } from '@/pages/Companies/Index'
import { CompaniesFormPage } from '@/pages/Companies/Form'
import { Navigate } from 'react-router-dom'

export const Companiesroutes = {
  path: 'companies',
  cangroup: ['companie'],
  params: {
    name: 'Unidades',
    icon: 'far fa-list-alt'
  },
  children: [
    {
      index: true,
      element: <Navigate to="search" />
    },
    {
      path: 'create',
      element: <CompaniesFormPage />,
      params: {
        name: 'Nova',
        icon: 'fas fa-plus'
      }
    },
    {
      path: ':companie_id',
      element: <CompaniesFormPage />
    },
    {
      path: 'search',
      element: <CompaniesPage />,
      params: {
        name: 'Consulta',
        icon: 'fa fa-search'
      }
    }
  ]
}
