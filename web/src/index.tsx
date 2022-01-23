// Library Imports
import React from 'react'
import ReactDOM from 'react-dom'

// Local Imports
import { MAIN_APP_ID, PROFILES_SLOT_NAME } from './holochainConfig'

const App: React.FC = () => {
  return <div>
    Hello World
  </div>
}

// By passing the `store` in as a wrapper around our React component
// we make the state available throughout it
ReactDOM.render(
    <App />,
  document.getElementById('react')
)
