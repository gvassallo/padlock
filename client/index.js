import React from 'react'; 
import ReactDOM from 'react-dom'; 
import {Provider} from 'react-redux'; 
import AppRouter from './router';
import configureStore from './stores/configureStore'; 
import DevTools from './DevTools'

const mountNode = document.getElementById('content');

const store = configureStore(); 

ReactDOM.render(
    <Provider store={store}> 
      <div> 
        <AppRouter/>
        <DevTools/>  
      </div> 
    </Provider>, 
    mountNode
); 

// vim: set ft=javascript.jsx: 
