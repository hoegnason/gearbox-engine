import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';


declare let window: any;

/*
const routing = (
  <Router history={}>
    <div>
      <Route path="/" component={App} />
    </div>
  </Router>
)*/

const startApp = () => {
  ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);
  registerServiceWorker();
};

if(window.cordova) {
  document.addEventListener('deviceready', startApp, false);
} else {
  startApp();
}