import React from 'react';
import ReactDOM from 'react-dom';
// React Redux
import {Provider} from 'react-redux'
import {store} from './redux/store'
// components
import App from './App';
// styles
import './index.css';
import 'antd/dist/antd.css';

ReactDOM.render(
    <Provider store={store}> 
      <App />
    </Provider>,
  document.getElementById('root')
);
