import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import './styles/main.scss'; 
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux'
import store from './store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router>
      <App /> 
    </Router>
  </Provider>
);
