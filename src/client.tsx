import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/App/App';
import configureStore from './redux/store';
import { Provider } from 'react-redux';

const store = configureStore({});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
