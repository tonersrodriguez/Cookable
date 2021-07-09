import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from "axios";
import '../styles/login.css';

class Login extends Component {
constructor(props) {
    super(props);

    this.state = {
      id: "",
      first: "",
      last:"",
      role:""
    };
  }

  createAdmin = e => {

    axios.post('/v1/createAdmin', {
      id: this.state.id,
        first: this.state.first,
        last: this.state.last,
        role: this.state.role
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  getAdmins = e => 
  {
    axios.get("/v1/admins").then(function(res){
      console.log(res.data);
    })
  };

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
  }

  render() {
    return (
      
      <div className="Login">
          <Button
            block
            bsSize="large"
            onClick={this.getAdmins}
          >
            GetAdmins
          </Button>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="id" bsSize="large">
            <Form.Control
              autoFocus
              type="text"
              value={this.state.id}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="first" bsSize="large">
            <Form.Control
              type="text"
              value={this.state.first}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="last" bsSize="large">
            <Form.Control
              autoFocus
              type="text"
              value={this.state.last}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="role" bsSize="large">
            <Form.Control
              type="text"
              value={this.state.role}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button
            block
            bsSize="large"
            type="submit"
            onClick={this.createAdmin}
          >
            CreateAdmin
          </Button>    
        </Form>
      </div>
    );
  }
}

export default Login;