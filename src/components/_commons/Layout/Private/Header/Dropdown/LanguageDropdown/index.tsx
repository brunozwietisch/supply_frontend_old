import { useIntl, FormattedMessage } from 'react-intl'
import { Dropdown } from 'react-bootstrap'
import { useLocale } from '@/core/contexts/LocaleContext'

import styles from '../styles.module.scss'

export const LanguageDropdown = () => {
  const intl = useIntl()
  const { switchLocale } = useLocale()

  const locale = intl.locale
  const icon = `flag-icon-${locale.slice(-2).toLowerCase()}`

  return (
    <Dropdown>
      <Dropdown.Toggle variant="light" id={styles.lightDropdown}>
        <i className={`flag-icon ${icon}`}></i>
      </Dropdown.Toggle>

      <Dropdown.Menu className="mt-3">
        <Dropdown.Item href="#" onClick={() => switchLocale('pt-BR')}>
          <i className="flag-icon flag-icon-br mr-2"></i>{' '}
          <FormattedMessage id="common.layout.private.header.dropdown.language.portuguese" />
        </Dropdown.Item>
        <Dropdown.Item href="#" onClick={() => switchLocale('en-US')}>
          <i className="flag-icon flag-icon-us mr-2"></i>{' '}
          <FormattedMessage id="common.layout.private.header.dropdown.language.english" />
        </Dropdown.Item>
        <Dropdown.Item href="#" onClick={() => switchLocale('es-ES')}>
          <i className="flag-icon flag-icon-es mr-2"></i>{' '}
          <FormattedMessage id="common.layout.private.header.dropdown.language.espanish" />
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}
