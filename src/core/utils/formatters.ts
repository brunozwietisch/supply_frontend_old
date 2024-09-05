import { RouteParamProps } from '@/core/routes'
import { RouteProps } from 'react-router-context/dist/types/Routing'

interface FormattedRoute extends RouteProps<RouteParamProps> {
  fullPath?: string
  parent?: RouteProps
}

/**
 * Formata obj Date para string yyyy-mm-aa
 *
 * @param {Date} date
 *
 * @example formatDateString(new Date())
 *
 * @returns {string} - yyyy-mm-dd
 */
export const formatDateString = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

/**
 * Formata padrão de Date do Banco de Dados
 *
 * @param {string} date
 *
 * @example formatDbDate('01/02/2022')
 *
 * @returns {string} - yyyy-mm-dd
 */
export const formatDbDate = (date: string): string => {
  const dateArr = date.split('/').reverse()
  let formattedDate = ''

  for (let index = 0; index < dateArr.length; index++) {
    if (index === 0) {
      formattedDate = dateArr[index]
    } else {
      formattedDate = formattedDate + '-' + dateArr[index]
    }
  }

  return formattedDate
}

/**
 * Formata padrão de DateTime do Banco de Dados
 *
 * @param {string} date
 *
 * @example formatDbDateTime('2022-03-10T12:30:21.000000Z')
 *
 * @returns {string} - yyyy-mm-dd
 */
export const formatDbDateTime = (dateTime: string): string => {
  return dateTime.split('T')[0]
}

export const formatDate = (date: string): string => {
  const [year, month, day] = date.split('-')
  return `${day}/${month}/${year}`
}

/**
 * Retorna Array de rotas com o atributo parent e fullPath adicionados
 *
 * @param {Array} routes - Rotas da aplicação
 * @param {Object} parent - Valor opcional
 *
 * @example formatRoutes(routes)
 *
 * @returns {Array} - Rotas reduzidas a um Array
 */
export const formatRoutes = (
  routes: RouteProps<RouteProps<RouteParamProps>>[],
  parent?: FormattedRoute
) => {
  const formattedRoutes = routes?.reduce(
    (
      previousRoutes: RouteProps<RouteProps<RouteParamProps>>[] | RouteProps[],
      currentRoute: RouteProps<RouteProps<RouteParamProps>>
    ) => {
      const { path } = currentRoute

      let currItem = {
        ...currentRoute
      } as FormattedRoute

      if (!path) return [...previousRoutes, currItem]

      if (parent) {
        currItem = {
          ...currItem,
          fullPath: `${parent.fullPath || parent.path}/${path}`,
          parent
        }
      } else {
        currItem = {
          ...currItem,
          path: `/app/${path}`
        }
      }

      if (currentRoute.children && currentRoute.children.length >= 1) {
        currItem = {
          ...currItem,
          children: formatRoutes(currentRoute.children, currItem)
        }
      }

      return [...previousRoutes, currItem]
    },
    []
  )

  return formattedRoutes
}
