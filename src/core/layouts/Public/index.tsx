import { Container } from 'react-bootstrap'
import { useDom } from '@/core/hooks/useDom'

interface LayoutProps {
  element: JSX.Element
}

const PublicLayout = ({ element }: LayoutProps) => {
  const { addRootClassNames } = useDom()
  addRootClassNames(['hold-transition'])

  return (
    <Container
      fluid
      className="login-page"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh'
      }}
    >
      {element}
    </Container>
  )
}

export default PublicLayout
