import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'
import 'gsap/CSSPlugin'
import './assets/styles/app.scss'
import registerServiceWorker from './registerServiceWorker'
import './utils/extensions'
console.log('public url: ', process.env.PUBLIC_URL)

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement)
registerServiceWorker()
