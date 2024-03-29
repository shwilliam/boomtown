import React from 'react'
import ReactDOM from 'react-dom'
import dotenv from 'dotenv'
import App from './App'
import * as serviceWorker from './serviceWorker'

dotenv.config()

ReactDOM.render(<App />, document.getElementById('root'))

serviceWorker.unregister()
