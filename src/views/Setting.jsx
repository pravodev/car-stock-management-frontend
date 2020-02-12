import React, { Component } from "react";
import { Grid, Row, Col, Table, Button, Modal } from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import {axios} from '../utils'
import {setErrorMessage} from '../reducers/appAction'
import {connect} from 'react-redux'


class Setting extends Component {
  constructor(props){
    super(props)
    this.state = {
      show: false,
      attributes: {
        name: null,
        price: null,
        stock: null
      },
      data: [],
      isFecthing: false,
      pagination: {
        current_page: 1,
        last_page: 1,
        prev_page: 1,
        total: 1,
        per_page: 1
      }
    }
  }

  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Pengaturan"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <div>
                    asdasd
                  </div>
                }
              />
            </Col>

          </Row>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {...state}
}

export default connect(mapStateToProps)(Setting);
