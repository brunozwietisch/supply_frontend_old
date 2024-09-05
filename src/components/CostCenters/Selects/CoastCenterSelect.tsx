import { useEffect, useState } from 'react'
import { SearchSelect } from '@/components/_commons/Form/SearchSelect'
import {
  SearchOption,
  SearchSelectProps
} from '@/components/_commons/Form/SearchSelect/SearchSelect'
import { CostCentersSearch } from '@/core/domain/CostCenter/CostCenter.types'
import { CostCenter } from '@/core/domain/CostCenter/Index'

export const CoastCenterSelect = ({
  name,
  label,
  placeholder,
  grid,
  companie_id,
  ...rest
}: SearchSelectProps & {
  companie_id?: number
}) => {
  const [params, setParams] = useState<CostCentersSearch>({
    current_page: 1
  })

  const [options, setOptions] = useState<SearchOption[]>([])
  const {
    data: costcenter,
    isLoading,
    refetch
  } = CostCenter.useSearchCostCenter(params)

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
    if (costcenter && costcenter.data) {
      const opts = costcenter.data.map(opt => ({
        value: opt?.name,
        name: opt?.name
      }))

      setOptions([...opts])
    }
    refetch && refetch()
  }, [costcenter])

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
