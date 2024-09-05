import { useEffect, useState } from 'react'
// import { PermissionsUsers } from '@/core/domain/Users/Permissions'
// import { UserPermissionsItem } from '@/core/domain/Users/Permissions/PermissionsUsers.types'

export const usePermissions = () => {
  const [getPermissions, setPermissions] = useState<Array<any>>([])
  // const { data: Permission } = PermissionsUsers.useGetPermissionsUser()

  useEffect(() => {
    // if (Permission && Permission.data) {
    //   setPermissions(Permission.data)
    // } else {
    setPermissions([])
    // }
  })

  const showPermissions = () => {
    if (getPermissions && getPermissions.length > 0) {
      const permissionsArray = getPermissions.map(permission => ({
        category: permission.category,
        permission: permission.permission
      }))

      return permissionsArray
    }

    return []
  }

  const validatePermissions = (permissions: string[]) => {
    const permissionsObj: { [key: string]: boolean } = {}

    permissions.forEach(permission => {
      permissionsObj[permission] = getPermissions.some(
        p => p.permission === permission
      )
    })

    return permissionsObj
  }

  return {
    showPermissions: showPermissions(),
    validatePermissions: validatePermissions
  }
}
