import '../styles/welcomePage.css';
import React, { Component } from 'react'
import { Link } from "react-router-dom";
import ListService from '../services/ListService';


export default class WelcomePage extends Component {
  constructor(props) {
      super(props);
      this.handleLogin = this.handleLogin.bind(this);
      this.handleSignUp = this.handleSignUp.bind(this);
      this.handlePinNumber = this.handlePinNumber.bind(this);
      this.submitPin = this.submitPin.bind(this);
      this.onCreateList = this.onCreateList.bind(this);
      this.submitPin = this.submitPin.bind(this);
      this.state = {
        pinnumber : 0,
        listId: -1
      };
  } 
  componentDidMount() {
    window.localStorage.clear();
  }

  handleLogin(event) {
    event.preventDefault();
    window.location.href = '/login';
  }

  handleSignUp (event) {
    event.preventDefault();
    window.location.href = '/register';
  } 

  handlePinNumber (event) {
    //setPinNumber(event.target.value);
  }

  submitPin (event) {
    event.preventDefault();
  }

  onCreateList (event) {
    ListService.createList({
      title: "", 
      description: "",
    }).then(res => {
      this.setState({
        listId: res.data.listId,
      });
      document.getElementById('listLink').click();
    })
  }

  render() {
    return (
      <div className="App">
        <div className="header">
          <button onClick={this.handleLogin}>Login </button>
          <button onClick={this.handleSignUp}> Sign Up </button>
        </div>
          <div className="title">
            <h1>Welcome to Swap Lists!</h1>
          </div>
            <div className="createlist">
              <button onClick={this.onCreateList}> Create your own list! </button>
              <Link
                id="listLink"
                to={{
                  pathname: '/list',
                  state: {listId: this.state.listId}, // your data array of objects
                }}
              />
            </div>
        </div>
      // </div>
      
    );
  }
}

//export default WelcomePage;

