import { ReactElement } from 'react'
import { Spinner } from 'react-bootstrap'

interface LoaderProps {
  loading?: boolean
  children?: ReactElement
}

export const Loader = ({ loading, children }: LoaderProps) => {
  if (loading)
    return (
      <div
        style={{ minHeight: 200, width: '100%' }}
        className="d-flex justify-content-center align-items-center bg-white"
      >
        <Spinner variant="secondary" animation="border" />
      </div>
    )

  return (children as ReactElement) || <></>
}
