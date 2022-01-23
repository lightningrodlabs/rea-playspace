// Library Imports
import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { setupSimpleZomeClient, SimpleZomeClient } from './simpleZomeClient'


const App: React.FC = () => {
  const zomeClientRef = useRef<SimpleZomeClient>()
  const [zomeCallResponse, setZomeCallResponse] = useState<number>()

  const init = async () => {
    const simpleZomeClient = await setupSimpleZomeClient()
    zomeClientRef.current = simpleZomeClient
    const result = await simpleZomeClient.callZome<null, number>('first_zome_fn', null)
    setZomeCallResponse(result)
  }

  useEffect(() => {
    init()
  }, [])
  return <div>Hello World, I talked to holochain and got :{zomeCallResponse}</div>
}

// By passing the `store` in as a wrapper around our React component
// we make the state available throughout it
ReactDOM.render(<App />, document.getElementById('react'))
