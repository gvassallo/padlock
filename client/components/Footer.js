import React from 'react' 
import {Jumbotron} from 'react-bootstrap' 

class Footer extends React.Component {
    render(){
      return (
        <div className="footer"> 
          <hr/>
          <Jumbotron> 
          <p> 
            ©2016 Gabriele Vassallo 
            <br/> 
            <br/>
            Made with ❤️ with <strong>React</strong>
          </p> 
          </Jumbotron> 
        </div> 
      );  
    }
}

export default Footer; 

// vim: set ft=javascript.jsx: 
