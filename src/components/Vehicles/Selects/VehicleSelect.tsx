import { useEffect, useState } from 'react'
import { SearchSelect } from '@/components/_commons/Form/SearchSelect'
import {
  SearchOption,
  SearchSelectProps
} from '@/components/_commons/Form/SearchSelect/SearchSelect'
import { Vehicle } from '@/core/domain/Vehicle/Index'
import { VehiclesSearch } from '@/core/domain/Vehicle/Vehicle.types'

export const VehicleSelect = ({
  name,
  label,
  placeholder,
  grid,
  companie_id,
  ...rest
}: SearchSelectProps & {
  label?: string
  placeholder?: string
  companie_id?: number
}) => {
  const [params, setParams] = useState<VehiclesSearch>({
    current_page: 1
  })

  const [options, setOptions] = useState<SearchOption[]>([])
  const {
    data: Vehicles,
    isLoading,
    refetch
  } = Vehicle.useSearchVehicle(params)

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
    if (Vehicles && Vehicles.data) {
      const opts = Vehicles.data.map(opt => ({
        value: opt.id,
        name: opt.name
      }))

      setOptions([...opts])
    }
    refetch && refetch()
  }, [Vehicles])

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
