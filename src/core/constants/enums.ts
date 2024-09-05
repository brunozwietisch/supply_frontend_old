import { ApiNamespacesType } from '@/core/domain/_commons/Common.types'

export type EnumType<T = undefined> = {
  [key: string]: T extends undefined ? string : T
}

export const ApiNamespaces: EnumType<ApiNamespacesType> = {
  COLLABORATOR: 'App\\Models\\Collaborator'
}

export const getEnumValue = (obj: EnumType, key: string) => {
  if (obj[key]) return obj[key]

  return key
}
