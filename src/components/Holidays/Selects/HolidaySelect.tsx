import { useEffect, useState } from 'react'
import { SearchSelect } from '@/components/_commons/Form/SearchSelect'
import {
  SearchOption,
  SearchSelectProps
} from '@/components/_commons/Form/SearchSelect/SearchSelect'
import { Holiday } from '@/core/domain/Holiday/Index'
import { HolidaysSearch } from '@/core/domain/Holiday/Holiday.types'

export const HolidaySelect = ({
  name,
  grid,
  keysGroupArea = [],
  ...rest
}: SearchSelectProps & { keysGroupArea?: Array<number> }) => {
  const [params, setParams] = useState<HolidaysSearch>({
    current_page: 1,
    items_per_page: 15,
    year: ''
  })

  const [options, setOptions] = useState<SearchOption[]>([])
  const { data: HolidayData, isLoading } = Holiday.useSearch(params)

  const handleSearch = (value: string) => {
    setParams({ ...params, name: value })
  }

  useEffect(() => {
    if (HolidayData) {
      const uniqueData = HolidayData.data.filter((item, index, array) => {
        return index === array.findIndex(t => t.name === item.name)
      })

      const opts = uniqueData.map(opt => ({
        value: opt.id,
        name: opt.name
      }))

      setOptions([...opts])
    }
  }, [HolidayData])

  return (
    <SearchSelect
      name={name}
      label="Feriados"
      placeholder="Pesquisar Feriados"
      grid={grid}
      loading={isLoading}
      options={options}
      onSearch={handleSearch}
      {...rest}
    />
  )
}
