import React from 'react';
import GoogleLogin from 'react-google-login';
import { Link } from 'react-router-dom';
import UserService from '../services/UserService';
import '../styles/signupLogin.css';


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.responseGoogle = this.responseGoogle.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    
    this.state = {
        email: '',
        password: '',
        name: '',
        userId: -1,
    };
  } 


  responseGoogle (response) {
    var userEmail = response.profileObj.email;
    UserService
      .checkUser(userEmail)
      .then(res => {
          if(res.data === ''){
            console.log("No account.");
            alert("No account associated with this email. Please sign up first.");
            return;
          } ; //send a message telling user to create an account first
          if(res.data.email === userEmail){
            console.log("success")
            this.setState({
                userId: res.data.userid,
                name: res.data.name
            })
            document.getElementById('homeLink').click();
          }else {
            //send message wrong password
            console.log("Unknown error.")
            alert("Unknown error.");
            return;
          }
      });
    
    /* await UserService.get();
    //need to create in user table then retrieve userId and navigate to user-home
    this.setState({
      userId: response.profileObj.email,
    })
    document.getElementById('loginLink').click(); */
  }
  
  async onLogin(e) {
    e.preventDefault();
    if (this.state.email === '' || this.state.password === '') {
      alert("Fill in All Inputs")
    }
    else {
      await UserService
      .checkUser(this.state.email)
      .then(res => {
          if(res.data === ''){
            alert("No account associated with this email. Please sign up first.")
            return; //send a message telling user to create an account first
          } 
          if(res.data.password === this.state.password){
            this.setState({
                userId: res.data.userid,
            })
            window.localStorage.setItem('userId', res.data.userid);
            document.getElementById('homeLink').click();
          }else {
            alert("Wrong password");
            //send message wrong password
            return;
          }
      });

    }
  }

  onChangeEmail(e)  {
      e.preventDefault();
      this.setState({
          email: e.target.value,
      });
  }

  onChangePassword(e) {
      e.preventDefault();
      this.setState({
          password: e.target.value,
      });
  }

  render() {
    return (
      <>
      <h1>Login</h1>
      <form name="loginForm">
          <div classname="input-padding"><input placeholder="email" type="text" value={this.state.email} onChange={this.onChangeEmail}/></div>
          <br />
          <div><input placeholder="password" type="password" value={this.state.password} onChange={this.onChangePassword}/></div>
          <br />
          <button type="submit" value="Login" onClick={this.onLogin}>Login</button>
      </form>
      <br />
      <GoogleLogin
        clientId="371324076172-n254d5pevjrfltcd50q03novmstdio6o.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={this.responseGoogle}
        onFailure={this.responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
      <Link
      id="homeLink"
      to={{
          pathname: '/home',
          state: {userId: this.state.userId, name: this.state.name}, // your data array of objects
      }}
      />
      </>
    );
  }
}

export default Login;