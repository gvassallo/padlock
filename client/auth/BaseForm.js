'use strict';

import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

export default class BaseForm extends React.Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col sm={6} smOffset={3} md={4} mdOffset={4}>
            <div className='panel panel-default'>
              <div className='panel-heading panel-heading-dark'>
                <center>Padlock</center>
              </div>
              <div className='panel-body'>
                { this.props.children }
              </div>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}
