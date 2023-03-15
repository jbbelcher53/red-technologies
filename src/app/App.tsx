import React from 'react'
import { Route, Switch } from 'react-router-dom'
import '../tailwind.css'
import { DraftProvider } from './hooks/useDraft'
import { Orders } from './Orders/Orders'

export const App: React.FC = () => {
  return (
    <Switch>
      <Route exact path='/'>
        <DraftProvider>
          <div className='flex min-h-screen overflow-hidden'>
            <Orders />
          </div>
        </DraftProvider>
      </Route>
    </Switch>
  )
}
