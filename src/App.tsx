import { ReactRouterContext } from 'react-router-context'

import { ROUTES } from '@/core/routes'
import { Root } from '@/Root'

export const App = () => {
  return (
    <Root>
      <ReactRouterContext defaultRole="viewer" routes={ROUTES} />
    </Root>
  )
}
