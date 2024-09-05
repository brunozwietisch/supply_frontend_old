import { Badge, Dropdown } from 'react-bootstrap'
import styles from '../styles.module.scss'

export const NotificationDropdown = () => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="light" id={styles.lightDropdown}>
        <i className="far fa-bell"></i>
        <Badge
          bg="warning"
          text="light"
          style={{
            top: '-6px',
            left: '-3px',
            position: 'relative',
            padding: '.2rem .3rem'
          }}
        >
          2
        </Badge>
      </Dropdown.Toggle>

      <Dropdown.Menu style={{ width: '270px', marginTop: 15 }}>
        <Dropdown.Item href="#">
          <p className="text-center mb-1 mt-1">2 Notificações</p>
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item
          eventKey="1"
          href="#"
          className={styles.notificationDropdownItem}
        >
          <div>
            <i className="fas fa-envelope"></i>
            <p className="pl-2">Você emitiu 2 8Ds que ainda estão em aberto</p>
          </div>
          <span className="text-muted text-sm">3 mins</span>
        </Dropdown.Item>
        <Dropdown.Item
          eventKey="2"
          href="#"
          className={styles.notificationDropdownItem}
        >
          <div>
            <i className="fas fa-users mr-2"></i>
            <p>Você precisa responder 1 8D</p>
          </div>
          <span className="float-right text-muted text-sm">12 hours</span>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}
