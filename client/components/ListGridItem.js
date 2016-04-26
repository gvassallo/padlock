import React from 'react'
import {Row, Col, Thumbnail} from 'react-bootstrap' 

class ListGridItem extends React.Component{
  constructor(){
    super(); 
    this.styles = {
      top: '20px' 
    }; 
  }

  render(){
    return(
      <div > 
        <Col xs={4} lg={4} style={this.styles}>
          <Thumbnail> 
            <div className="caption">
              <center> 
              {this.props.name}  
              </center> 
            </div>
          </Thumbnail> 
        </Col> 
      </div> 
    ); 
  }; 
}

export default ListGridItem; 
// vim: set ft=javascript.jsx: 
