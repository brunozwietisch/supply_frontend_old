import { Loader } from '@/components/_commons/Loader'
import { ReactElement } from 'react'
import { Button } from 'react-bootstrap'

interface SimplePaginateProps {
  current: number
  lastPage: number
  children: ReactElement | ReactElement[] | JSX.Element[]
  loading?: boolean
  onPaginate: (page: number) => void
}

export const SimplePaginate = ({
  current = 1,
  lastPage = 1,
  children,
  loading = false,
  onPaginate
}: SimplePaginateProps) => {
  const next = () => {
    onPaginate(current + 1)
  }

  const prev = () => {
    onPaginate(current - 1)
  }

  return (
    <Loader loading={loading}>
      <div className="border p-2 rounded">
        {children}
        <div className="d-flex justify-content-between px-1 py-2">
          <Button
            size="sm"
            title="Anterior"
            variant="primary"
            className="border-0 outline-secondary"
            onClick={() => prev()}
            disabled={current <= lastPage}
          >
            <i className="fa fa-chevron-left" />
          </Button>

          <Button
            size="sm"
            title="Próximo"
            variant="primary"
            className="border-0 outline-secondary"
            onClick={() => next()}
            disabled={current >= lastPage}
          >
            <i className="fa fa-chevron-right" />
          </Button>
        </div>
      </div>
    </Loader>
  )
}
