import { CollaboratorsFormPage } from '@/pages/Collaborators/Form'
import { CollaboratorsPage } from '@/pages/Collaborators/Index'
import { Navigate } from 'react-router-dom'

export const Collaboratorsroutes = {
  path: 'collaborators',
  cangroup: ['collaborator'],
  params: {
    name: 'Colaboradores',
    icon: 'fas fa-users'
  },
  children: [
    {
      index: true,
      element: <Navigate to="search" />
    },
    {
      path: 'create',
      element: <CollaboratorsFormPage />,
      params: {
        name: 'Novo Colaborador',
        icon: 'fas fa-plus'
      }
    },
    {
      path: ':collaborator_id',
      element: <CollaboratorsFormPage />
    },
    {
      path: 'search',
      element: <CollaboratorsPage />,
      params: {
        name: 'Consulta',
        icon: 'fa fa-search'
      }
    }
  ]
}
