import { HolidaysPage } from '@/pages/Holidays/Index'
import { HolidaysFormPage } from '@/pages/Holidays/Form'
import { Navigate } from 'react-router-dom'

export const Holidayroutes = {
  path: 'holidays',
  cangroup: ['holiday'],
  params: {
    name: 'Feriados',
    icon: 'far fa-list-alt'
  },
  children: [
    {
      index: true,
      element: <Navigate to="search" />
    },
    {
      path: 'create',
      element: <HolidaysFormPage />,
      params: {
        name: 'Nova',
        icon: 'fas fa-plus'
      }
    },
    {
      path: ':holiday_id',
      element: <HolidaysFormPage />
    },
    {
      path: 'search',
      element: <HolidaysPage />,
      params: {
        name: 'Consulta',
        icon: 'fa fa-search'
      }
    }
  ]
}
