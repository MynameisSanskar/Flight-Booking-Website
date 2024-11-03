import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Kommunicate from '@kommunicate/kommunicate-chatbot-plugin';

Kommunicate.init("1c88351be26775e8a69884066f924a6ef")

ReactDOM.render(
    <App />
,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
