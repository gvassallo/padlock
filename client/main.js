// main.js
var React = require('react');
var ReactDOM = require('react-dom');

var PageHeader = require('react-bootstrap').PageHeader; 

const pageHeaderInstance = (
    <center>  
        <PageHeader>Padlock <small>Manage your passwords easily</small></PageHeader>
    </center> 
);

ReactDOM.render(pageHeaderInstance, document.getElementById('content')); 

