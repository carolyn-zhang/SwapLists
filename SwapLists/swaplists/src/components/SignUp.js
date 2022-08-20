import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import UserService from '../services/UserService';
import '../styles/signupLogin.css';

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.createAccount = this.createAccount.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeVerifyPassword = this.onChangeVerifyPassword.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.state = {
            email: '',
            password: '',
            verifypassword:'',
            name: '',
            userId: -1,
        };
    }

    validateEmail(mail) 
    {
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(mail)){
        return true;
    }
        return false;
    }


    async createAccount(e) {
        // console.log("here");
        e.preventDefault();
        var newUser = true;
        var filledInput = true;
        var matchingPassword = true;
        if (this.state.email === "" || this.state.password === "" || this.state.name === "") {
            filledInput = false;
        }
        if (this.state.password !== this.state.verifypassword) {
            matchingPassword = false;
        }
        await UserService
            .checkUser(this.state.email)
            .then(res => {
                if((res.data !== undefined) && (res.data !== "")) newUser = false;//means that user has created an account already, send a notification
            })
        
        if (!filledInput) {
            alert("Fill in all inputs")
        }
        else if (!matchingPassword) {
            alert("Passwords do not match")
        }
        else if (!newUser) {
            alert("An account with this email already exists")
        }
        else if(newUser && this.validateEmail(this.state.email)){
            await UserService
            .createUser({
                email: this.state.email,
                password: this.state.password,
                name: this.state.name
            })
            .then(res => {
                this.setState({
                    userId: res.data.userid,
                })
                document.getElementById('homeLink').click();
            });
        }
        else if(newUser && this.validateEmail(this.state.email) === false){
            alert("You have entered an invalid email address!")
        }
    }

    onChangeEmail(e) {
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
    onChangeVerifyPassword(e) {
        e.preventDefault();
        this.setState({
            verifypassword: e.target.value,
        });
    }

    onChangeName(e) {
        e.preventDefault();
        this.setState({
            name: e.target.value,
        });
    }

    render() {
        return (
        <div>
            <form name="regForm">
                <h1>Create Account</h1>
                <div><input placeholder="name" type="text" value={this.state.name} onChange={this.onChangeName}/></div>
                <br />
                <div><input placeholder="email" type="text" value={this.state.email} onChange={this.onChangeEmail}/></div>
                <br />
                <div><input placeholder="password" type="password" value={this.state.password} onChange={this.onChangePassword}/></div>
                <br />
                <div><input placeholder="re-type password" type="password" value={this.state.verifypassword} onChange={this.onChangeVerifyPassword}/></div>
                <br />
                <button type="submit" value="Create Account" onClick={this.createAccount}>Sign Up</button>
            </form>
            <Link
            id="homeLink"
            to={{
                pathname: 'home',
                state: {userId: this.state.userId, name: this.state.name}, // your data array of objects
            }}
            />
        </div>
        );
    }
}