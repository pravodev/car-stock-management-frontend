import React, { Component } from "react";
import { Grid, Row, Col, Table, Button, Modal } from "react-bootstrap";
import Datatable from 'react-data-table-component'

import Card from "components/Card/Card.jsx";
import { thArray, tdArray } from "variables/Variables.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import {axios} from '../utils'
import {setErrorMessage} from '../reducers/appAction'
import {connect} from 'react-redux'

class Car extends Component {
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

  componentDidMount(){
    this.getCar()
  }

  showModal(){
    this.setState({
      show: true
    })
  }
  
  handleModalClose(){
    this.setState({
      show:false
    })
  }

  handleChangeAttributes(event, state){
    const {value} = event.target

    this.setState({
      attributes: {...this.state.attributes, [state]: value}
    })
    
  }

  getCar(){
    this.setState({
      isFecthing: true
    })
    axios.get('/api/cars')
        .then(response => {
          console.log("TCL: Car -> getCar -> response", response)
          const {data} = response
          this.setState({
            data: data.data,
            pagination: data,
            isFecthing: false
          })
        })
  }

  addCar(){
    const {dispatch} = this.props
    console.log("TCL: Car -> addCar -> this.attributes", this.attributes)
    axios.post('/api/cars', this.state.attributes)
        .then(response => {
          this.getCar()
          this.handleModalClose()
        })
        .catch(error => {
          console.log("TCL: Car -> addCar -> error", error)
          const {response} = error
          var messages = ""
          if(response.status === 422){
            messages = response.data.errors
          }else{
            messages = "Server Error"
          }
          dispatch(setErrorMessage(messages))
        })
  }
  
  renderAction(e){
    console.log("TCL: Car -> renderAction -> e", e)
    return (<div>
        <Button raised primary onClick={this.handleAction}>Edit</Button>
        <Button raised primary onClick={this.handleAction}>Hapus</Button>
      </div>)
  }
  
  render() {
    const columns = [
      {
        name: 'Name',
        selector: 'name',
        sortable: true,
        width: '400px'
      },
      {
        name: 'Harga',
        selector: 'price',
        sortable: true,
        right: true,
        width: '70px'
      },
      {
        name: 'Stock',
        selector: 'stock',
        sortable: true,
        right: true,
        width: '70px'
      },
      {
        cell: (e) => this.renderAction(e),
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
        width: '200px'
      },
    ]

    const {pagination,isFecthing} = this.state
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Button variant="primary" onClick={this.showModal.bind(this)}>Tambah Data</Button>
              <Card
                title="Data Mobil"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Datatable
                    responsive={true}
                    columns={columns}
                    data={this.state.data}
                    pagination={true}
                    progressPending={isFecthing}
                    paginationServer={true}
                    paginationPerPage={pagination.per_page}
                    paginationTotalRows={pagination.total}
                  />
                }
              />
            </Col>

          </Row>
        </Grid>

        <Modal show={this.state.show} onHide={this.handleModalClose.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Tambah Mobil</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <FormInputs
              ncols={["col-md-12", "col-md-6", 'col-md-6']}
              properties={[
                {
                  label: "Nama Mobil *",
                  type: "text",
                  bsClass: "form-control",
                  placeholder: "Nama mobil",
                  value: this.state.attributes.name,
                  onChange: (event) => this.handleChangeAttributes(event, 'name')
                },
                {
                  label: "Harga Mobil *",
                  type: "text",
                  bsClass: "form-control",
                  value: this.state.attributes.price,
                  onChange: (event) => this.handleChangeAttributes(event, 'price')
                },
                {
                  label: "Stock *",
                  type: "number",
                  bsClass: "form-control",
                  value: this.state.attributes.stock,
                  onChange: (event) => this.handleChangeAttributes(event, 'stock')
                },
              ]}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleModalClose.bind(this)}>
              Close
            </Button>
            <Button variant="primary" onClick={this.addCar.bind(this)}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {...state}
}

export default connect(mapStateToProps)(Car);
