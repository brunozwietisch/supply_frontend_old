import { useEffect, useState } from 'react'
// import { PermissionsUsers } from '@/core/domain/Users/Permissions'

export interface SearchOption {
  area_name: string
  area_id: number
  exception_category: string
}

export const useExceptions = (exception_category: string) => {
  const [getException, setException] = useState<Array<SearchOption>>([])

  // const { data: showExceptions } =
  //   PermissionsUsers.useGetExceptionPermissionsUser(String(exception_category))

  useEffect(() => {
    // if (showExceptions && showExceptions.data) {
    // setException(showExceptions.data)
    // } else {
    setException([])
    // }
  })

  const runExceptions = () => {
    if (getException && getException.length > 0) {
      const ExceptionsArray = getException.map(item => ({
        area_name: item.area_name,
        area_id: item.area_id,
        exception_category: item.exception_category
      }))

      return ExceptionsArray
    }

    return []
  }

  return runExceptions()
}
