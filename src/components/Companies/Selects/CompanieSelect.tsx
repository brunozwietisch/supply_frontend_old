import { useEffect, useState } from 'react'
import { SearchSelect } from '@/components/_commons/Form/SearchSelect'
import {
  SearchOption,
  SearchSelectProps
} from '@/components/_commons/Form/SearchSelect/SearchSelect'
import { CompanieSearch } from '@/core/domain/Companie/Companie.types'
import { Companie } from '@/core/domain/Companie/Index'

export const CompanieSelect = ({ grid, ...rest }: SearchSelectProps) => {
  const [params, setParams] = useState<CompanieSearch>({
    current_page: 1
  })

  const [option, setOptions] = useState<SearchOption[]>([])
  const { data: Companies, isLoading, refetch } = Companie.useSearch(params)

  const handleSearch = (value: string) => {
    setParams({ ...params, name: value })
  }

  useEffect(() => {
    if (Companies && Companies.data) {
      const opt = Companies.data.map(op => ({
        value: op?.id,
        name: op?.name
      }))

      setOptions([...opt])
    }
    refetch && refetch()
  }, [Companies])
  return (
    <SearchSelect
      name={'companie_id'}
      label={'Unidade'}
      placeholder={'Pesquisar Unidade'}
      grid={grid}
      loading={isLoading}
      options={option}
      onSearch={handleSearch}
      {...rest}
    />
  )
}
