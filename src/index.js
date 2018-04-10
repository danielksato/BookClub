import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { unregister } from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import './index.scss';

document.title = 'BookBrunch';
if (process.env.PRODUCTION && location.protocol !== 'https') {
	location.protocol = 'https';
}
ReactDOM.render(<App />, document.getElementById('root'));
unregister();
