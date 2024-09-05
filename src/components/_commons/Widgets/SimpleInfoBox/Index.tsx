import styles from './style.module.scss'

interface SimpleInfoBoxProps {
  icon: string
  label: string
  description: string | number | undefined
  background:
    | 'bg-danger'
    | 'bg-primary'
    | 'bg-secondary'
    | 'bg-success'
    | 'bg-warning'
    | 'bg-info'
    | 'bg-dark'
  grid?: string
  onClick?: () => void
  activateAction: boolean
}

export const SimpleInfoBox = ({
  icon = 'fa-solid fa-user',
  label = '',
  description = '',
  background = 'bg-primary',
  grid = 'col-md-4',
  activateAction = false,
  onClick
}: SimpleInfoBoxProps) => {
  return (
    <div className={`${grid}`} onClick={activateAction ? onClick : () => {}}>
      <div
        className={`d-flex position-relative w-100 shadow-lg rounded-3 mb-3 p-2 ${
          activateAction && styles.simpleInfoBox
        }`}
        style={{ minHeight: '90px' }}
      >
        <span
          className={`d-flex align-items-center justify-content-center fs-1 text-center rounded-3 ${background}`}
          style={{ width: '80px' }}
        >
          <i className={icon} style={{ color: 'white' }} />
        </span>
        <div className="d-flex flex-column justify-content-center px-3 overflow-hidden lh-lg">
          <span
            style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
            className="d-block overflow-hidden fs-5"
          >
            {label}
          </span>
          <span
            className="d-block mt-1 fw-bold fs-5"
            style={{ fontWeight: 700 }}
          >
            {description}
          </span>
        </div>
      </div>
    </div>
  )
}
