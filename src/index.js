import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

document.title = 'BookBrunch';
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
