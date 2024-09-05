import { useEffect, useState } from 'react'
import { SearchSelect } from '@/components/_commons/Form/SearchSelect'
import {
  SearchOption,
  SearchSelectProps
} from '@/components/_commons/Form/SearchSelect/SearchSelect'
import { CollaboratorsSearch } from '@/core/domain/Collaborator/Collaborator.types'
import { Collaborators } from '@/core/domain/Collaborator/Index'

export const CollaboratorSelect = ({
  setValue,
  defaultValue,
  onChange,
  ...rest
}: SearchSelectProps & { setValue?: any }) => {
  const [params, setParams] = useState<CollaboratorsSearch>({
    current_page: 1
  })
  const [options, setOptions] = useState<SearchOption[]>([])
  // eslint-disable-next-line no-unused-vars
  const [values, setValues] = useState<SearchOption | undefined>(undefined)
  const {
    data: Collaborator,
    isLoading,
    refetch
  } = Collaborators.useCollaboratorSearch(params)

  const handleSearch = (value: string) => {
    setParams({ ...params, name: value })
  }

  useEffect(() => {
    if (Collaborator && Collaborator.data) {
      const opts = Collaborator.data.map(opt => ({
        value: opt.id,
        name: opt.name
      }))

      setOptions([...opts])
    }
    refetch && refetch()
  }, [Collaborator])

  const handleChange = (value: any) => {
    onChange && onChange(value)
  }

  useEffect(() => {
    let values
    if (defaultValue && defaultValue.name && defaultValue.value) {
      values = {
        name: defaultValue?.name ?? ' - ',
        value: defaultValue?.value ?? ' - '
      }
    } else {
      values = {
        name: setValue,
        value: setValue
      }
    }

    setValues(values)
  }, [defaultValue])

  return (
    <SearchSelect
      name={'operator_id'}
      label={'Operador'}
      placeholder={'Pesquisar Operador'}
      grid={'col-md-4'}
      loading={isLoading}
      options={options}
      onSearch={handleSearch}
      onChange={handleChange}
      defaultValue={values}
      {...rest}
    />
  )
}
