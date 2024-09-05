import { useNavigate } from 'react-router-dom'
import styles from './styles.module.scss'

interface SmallBoxProps {
  type?: string
  disabled?: boolean
  icon: string
  title: string
  linkTo: string
  description: string
}

export const InfoBox = ({
  type = 'info',
  disabled = false,
  icon,
  title,
  linkTo,
  description
}: SmallBoxProps) => {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => {
        if (!disabled) navigate(linkTo)
      }}
      className={`small-box-footer ${styles.card} ${
        !disabled && styles.cardHover
      }`}
      style={{
        cursor: disabled ? 'not-allowed' : 'pointer'
      }}
    >
      <div
        className="info-box"
        style={{
          backgroundColor: disabled ? '#ebebeb' : 'inherit'
        }}
      >
        <span className={`info-box-icon bg-${type}`} style={{ color: 'white' }}>
          <i className={`fas ${icon}`}></i>
        </span>

        <div className="info-box-content">
          <span
            style={{
              maxWidth: '90%',
              whiteSpace: 'normal',
              lineHeight: '135%',
              fontSize: '1.1rem'
            }}
          >
            <h6 className="text-bold pt-2">{title}</h6>
            <p className="mb-1">{description}</p>
          </span>
        </div>
      </div>
    </div>
  )
}
