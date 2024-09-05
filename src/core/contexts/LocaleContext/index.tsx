import { IntlProvider } from 'react-intl'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'

import translationsEn from '@/core/locales/en-US'
import translationsEs from '@/core/locales/es-ES'
import translationsPt from '@/core/locales/pt-BR'

import { STORAGE_LOCALE_KEY } from '@/core/constants'

interface LocaleProviderProps {
  children: ReactNode
}

interface LocaleContextData {
  switchLocale: (locale: string) => void
}

interface WrapperProps {
  locale: string
  children: ReactNode
}

const LocaleContext = createContext({} as LocaleContextData)

const IntlWrapper = ({ locale, children }: WrapperProps) => {
  const getLanguage = () => {
    switch (locale) {
      case 'es-ES':
        return translationsEs

      case 'en-US':
        return translationsEn

      case 'pt-BR':
        return translationsPt

      default:
        return translationsPt
    }
  }

  return (
    <IntlProvider
      messages={getLanguage()}
      locale={locale}
      defaultLocale="pt-BR"
    >
      {children}
    </IntlProvider>
  )
}

export const LocaleProvider = ({ children }: LocaleProviderProps) => {
  const locale = navigator.language
  const [currentLocale, setCurrentLocale] = useState<string>(locale)

  useEffect(() => {
    const localeStoraged = localStorage.getItem(STORAGE_LOCALE_KEY)

    if (localeStoraged) {
      setCurrentLocale(localeStoraged)
    } else {
      setCurrentLocale(locale)
    }
  }, [])

  const switchLocale = (locale: string) => {
    setCurrentLocale(locale)
    localStorage.setItem(STORAGE_LOCALE_KEY, locale)
  }

  return (
    <LocaleContext.Provider value={{ switchLocale }}>
      <IntlWrapper locale={currentLocale}>{children}</IntlWrapper>
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  return useContext(LocaleContext)
}
