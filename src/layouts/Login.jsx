import React, { Component } from "react";
import {
    Grid,
    Row,
    Col
  } from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import { connect } from 'react-redux'
import {loginUser} from '../reducers/authAction'
import { style } from "variables/Variables.jsx";
import NotificationSystem from "react-notification-system";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
        credentials: {
            username: '',
            password: ''
        }
    }
  }

  componentDidMount(){
    if(this.props.isAuthenticated){
        this.props.history.push('/admin/dashboard');
    }
  }
  
  componentWillReceiveProps(newData){
    if(newData.errorMessage){
        this.refs.notificationSystem.addNotification({
            title: <span data-notify="icon" className="pe-7s-gift" />,
            message: (
              <div>
                {newData.errorMessage}
              </div>
            ),
            level: 'error',
            position: "tr",
            autoDismiss: 15
          });
    }
    console.log("TCL: Login -> RECEIVE PROPS -> newData", newData)
      
  }
  
  handleChange(event, state){
      const {value} = event.target
      console.log("TCL: Login -> handleChange -> state", state)
    console.log("TCL: Login -> handleChange -> value", value)
    this.setState({
        credentials: {...this.state.credentials, [state]: value}
    })  
    console.log("TCL: Login -> handleChange -> value", this)
  }
  
  requestLogin(event){
      const {dispatch} = this.props
      console.log("TCL: Login -> requestLogin -> event", event)
      console.log('credentials', this)
      dispatch(loginUser(this.state.credentials))
  }
  
  render() {
    return (
      <div className="content">
        <NotificationSystem ref="notificationSystem" style={style} />
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Login"
                content={
                  <div>
                    <FormInputs
                      ncols={["col-md-12", "col-md-12"]}
                      properties={[
                        {
                          label: "Username / Email",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Masukkan Username",
                          value: this.state.credentials.username,
                          onChange: (event) => this.handleChange(event, 'username')
                        },
                        {
                          label: "Password",
                          type: "password",
                          bsClass: "form-control",
                          value: this.state.credentials.password,
                          onChange: (event) => this.handleChange(event, 'password')
                        },
                      ]}
                    />
                    <Button bsStyle="info" pullRight fill type="submit" onClick={this.requestLogin.bind(this)}>
                      Update Profile
                    </Button>
                    <div className="clearfix" />
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

function mapStateToProps(state) {

    const { auth } = state
    console.log("TCL: mapStateToProps -> state", state)
    const { isAuthenticated, errorMessage } = auth
  
    return {
      isAuthenticated,
      errorMessage: state.auth.errorMessage
    }
  }
export default connect(mapStateToProps)(Login);