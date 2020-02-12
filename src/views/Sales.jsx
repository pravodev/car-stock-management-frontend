import React, { Component } from "react";
import { Grid, Row, Col, Table, Button, Modal } from "react-bootstrap";
import Datatable from 'react-data-table-component'

import Card from "components/Card/Card.jsx";
import { thArray, tdArray } from "variables/Variables.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import {axios} from '../utils'
import {setErrorMessage} from '../reducers/appAction'
import {connect} from 'react-redux'
import AsyncSelect from 'react-select/async';

const loadOptions = (inputValue, callback) => {
  console.log("TCL: loadOptions -> inputValue", inputValue)
  axios.get('api/cars?name='+inputValue).then(response => {
  console.log("TCL: loadOptions -> response", response)
    const data = response.data.data.map(function(car){
      return {value: car.id, label: car.name}
    })
    callback(data)
  })
};

class Sales extends Component {
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
    this.getSales()
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
    const {value} = state === 'car_id' ? event : event.target

    this.setState({
      attributes: {...this.state.attributes, [state]: value}
    })
    
  }

  getSales(){
    this.setState({
      isFecthing: true
    })
    axios.get('/api/sales')
        .then(response => {
          console.log("TCL: Sales -> getSales -> response", response)
          const {data} = response
          this.setState({
            data: data.data,
            pagination: data,
            isFecthing: false
          })
        })
  }

  addSales(){
    const {dispatch} = this.props
    console.log("TCL: Sales -> addSales -> this.attributes", this.attributes)
    axios.post('/api/sales', this.state.attributes)
        .then(response => {
          this.getSales()
          this.handleModalClose()
        })
        .catch(error => {
          console.log("TCL: Sales -> addSales -> error", error)
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
  
  resendInvoice(data){
    axios.post(`/api/sales/${data.id}/sendInvoice`)
        .then(() => {
          window.alert('Berhasil')
        })

  }
  
  renderAction(data){
    console.log("TCL: Sales -> renderAction -> data", data)
    return (<div>
        <Button raised primary onClick={() => this.resendInvoice(data)}>Kirim Ulang Invoice</Button>
      </div>)
  }
  
  render() {
    const columns = [
      {
        name: 'Name',
        selector: 'name',
        sortable: true,
        width: '200px'
      },
      {
        name: 'Email',
        selector: 'email',
        sortable: true,
        width: '200px'
      },
      {
        name: 'Phone',
        selector: 'phone',
        sortable: true,
        width: '200px'
      },
      {
        name: 'Car',
        selector: 'car.name',
        sortable: true,
        width: '200px'
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
                title="Data Penjualan"
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
            <Modal.Title>Data Pembeli</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <FormInputs
              ncols={["col-md-12", "col-md-6", 'col-md-6']}
              properties={[
                {
                  label: "Nama *",
                  type: "text",
                  bsClass: "form-control",
                  placeholder: "Nama mobil",
                  value: this.state.attributes.name,
                  onChange: (event) => this.handleChangeAttributes(event, 'name')
                },
                {
                  label: "Email *",
                  type: "text",
                  bsClass: "form-control",
                  value: this.state.attributes.price,
                  onChange: (event) => this.handleChangeAttributes(event, 'email')
                },
                {
                  label: "Nomor HP *",
                  type: "text",
                  bsClass: "form-control",
                  value: this.state.attributes.stock,
                  onChange: (event) => this.handleChangeAttributes(event, 'phone')
                },
              ]}
            />
            <h4>Pilih Mobil</h4>
            <AsyncSelect
              cacheOptions
              loadOptions={loadOptions}
              defaultOptions
              // onInputChange={this.handleInputChange}
              onChange={(event) => this.handleChangeAttributes(event, 'car_id')}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleModalClose.bind(this)}>
              Close
            </Button>
            <Button variant="primary" onClick={this.addSales.bind(this)}>
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

export default connect(mapStateToProps)(Sales);
