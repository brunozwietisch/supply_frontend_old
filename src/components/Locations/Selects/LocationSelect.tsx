import { useEffect, useState } from 'react'
import { SearchSelect } from '@/components/_commons/Form/SearchSelect'
import {
  SearchOption,
  SearchSelectProps
} from '@/components/_commons/Form/SearchSelect/SearchSelect'
import { Locations } from '@/core/domain/Location/Index'
import { LocationsSearch } from '@/core/domain/Location/Location.types'

export const LocationSelect = ({
  name,
  label,
  placeholder,
  companie_id,
  grid,
  ...rest
}: SearchSelectProps & {
  companie_id?: number
}) => {
  const [params, setParams] = useState<LocationsSearch>({
    current_page: 1
  })

  const [options, setOptions] = useState<SearchOption[]>([])
  const {
    data: Location,
    isLoading,
    refetch
  } = Locations.useSearchLocation(params)

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
    if (Location && Location.data) {
      const opts = Location.data.map(opt => ({
        value: opt?.id,
        name: opt?.name
      }))

      setOptions([...opts])
    }
    refetch && refetch()
  }, [Location])

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
