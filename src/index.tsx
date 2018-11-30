import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './assets/styles/app.css';
import registerServiceWorker from './registerServiceWorker';
import './utils/extensions'

ReactDOM.render(
  <App/>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
