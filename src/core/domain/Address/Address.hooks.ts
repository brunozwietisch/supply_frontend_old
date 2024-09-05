import { search } from '@/core/domain/Address/Address.services'
import { useQuery } from 'react-query'

export function useSearch(cep: string) {
  const query = useQuery(['search', cep], () => search(cep))
  return query
}
