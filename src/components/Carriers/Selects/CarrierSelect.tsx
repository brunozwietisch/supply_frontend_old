import { useEffect, useState } from 'react'
import { SearchSelect } from '@/components/_commons/Form/SearchSelect'
import {
  SearchOption,
  SearchSelectProps
} from '@/components/_commons/Form/SearchSelect/SearchSelect'
import { Carrier } from '@/core/domain/Carrier/Index'
import { CarriersSearch } from '@/core/domain/Carrier/Carrier.types'

export const CarrierSelect = ({
  name,
  label,
  placeholder,
  grid,
  companie_id,
  ...rest
}: SearchSelectProps & {
  companie_id?: number
}) => {
  const [params, setParams] = useState<CarriersSearch>({
    current_page: 1
  })

  const [options, setOptions] = useState<SearchOption[]>([])
  const {
    data: Carriers,
    isLoading,
    refetch
  } = Carrier.useSearchCarrier(params)

  const handleSearch = (value: string) => {
    setParams({ ...params, name: value })
  }

  useEffect(() => {
    if (companie_id) {
      setParams({ ...params, companie_id: companie_id })
      refetch()
    }
  }, [companie_id])

  useEffect(() => {
    if (Carriers && Carriers.data) {
      const opts = Carriers.data.map(opt => ({
        value: opt.id,
        name: opt.name
      }))

      setOptions([...opts])
    }
    refetch && refetch()
  }, [Carriers])

  return (
    <SearchSelect
      name={name}
      label={label}
      placeholder={placeholder}
      grid={grid}
      loading={isLoading}
      options={options}
      onSearch={handleSearch}
      {...rest}
    />
  )
}
