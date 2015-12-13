import React from 'react'; 
import ReactDOM from 'react-dom'; 
import AppRouter from './router'

const mountNode = document.getElementById('content');

ReactDOM.render(
    <AppRouter/>,
    mountNode
); 

