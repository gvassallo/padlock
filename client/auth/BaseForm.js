'use strict';

import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

export default class BaseForm extends React.Component {
  render() {
    return (
      <div> 
      <Grid>
        <Row>
          <Col sm={6} smOffset={3} md={6} mdOffset={3} >
            <img src="img/padlock.png" className="padlock"/> 
            <br/> 
            <br/> 
            <div className='panel panel-default'>
              {this.props.children} 
            </div>
          </Col>
        </Row>
      </Grid>
      </div> 
    );
  }
}
// vim: set ft=javascript.jsx: 
