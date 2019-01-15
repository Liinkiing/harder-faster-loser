import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'
import 'gsap/CSSPlugin'
import './assets/styles/app.scss'
import registerServiceWorker, { unregister } from './registerServiceWorker'
import './utils/extensions'

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement)
// registerServiceWorker()
unregister()
