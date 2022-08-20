import React, { Component } from 'react';
import { Link } from "react-router-dom";
import '../styles/home.css';

import ListCodeService from '../services/ListCodeService';
import UserService from '../services/UserService';
import ListService from '../services/ListService';
import ListCard from './ListCard';
import Long from "long";

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.handleInputListCode = this.handleInputListCode.bind(this);
        this.submitInputListCode = this.submitInputListCode.bind(this);
        this.onCreateList = this.onCreateList.bind(this);
        this.navToList = this.navToList.bind(this);
        this.changeTheme = this.changeTheme.bind(this);
        this.retrieveLists = this.retrieveLists.bind(this);
        this.onLogOut = this.onLogOut.bind(this);
        this.state = {
            // username: "",
            lists: [],
            inputListCode: "",
            colors: ["#fff5f8", "#CAEBD9", "#cae2e8", "#e0cce6", "#a5aed9",
            "#86a69b", "#76b5ac", "#ffeab5", "#d5d9de"],
            userId: -1,
            listId: -1,
            name: ''
        };
    }

    async componentDidMount() {
        if(this.props.location.state === undefined) window.location.href = "/";
        this.setState({
            userId: this.props.location.state.userId,
            name: this.props.location.state.name
        })
        window.localStorage.setItem('name', this.props.location.state.name);
        this.retrieveLists();
        this.getUserName(this.props.location.state.userId);
    }

    async retrieveLists() {
        await ListCodeService
            .getUsersLists(this.props.location.state.userId) //this.state.userId
            .then(res => {
                this.setState({
                    lists: res.data === '' ? [] : res.data, //res.data = {listid: x, userid: y}
                })
            })
    }

    async getUserName(userId) {
        await UserService.getUser(userId)
            .then(res => {
                this.setState({
                    name: res.data.name
                })
            })
    }

    async onCreateList(e) {
        await ListService
            .createList({
            title: "", 
            description: "",
            })
            .then(res => {
                this.setState({
                    listId: res.data.listId,
                })
            });
        await ListCodeService
            .addListCode({
                userid: this.state.userId,//this.state.userId,
                listid: this.state.listId
            })
            .then(res => {
                document.getElementById('createListLink').click();
            });
    }

    async navToList(listId) {
      document.getElementById(`nav${listId}`).click();
    }

    handleInputListCode(e) {
        e.preventDefault();
        const inputListCode = e.target.value;
        this.setState({
            inputListCode: inputListCode
        });
    }
    
    async submitInputListCode(e) {
        e.preventDefault();
        // call api to add this listcode to the listcodes table for this user
        var alreadyCollaborator = false;

        for (let list of this.state.lists) {
            if (list.listid.toString() === this.state.inputListCode) {
                alreadyCollaborator = true;
            }
        }
        if (alreadyCollaborator) { // listcode is already in user's list
            alert("Already a collaborator to list")
        }
        else {
            var listCodeExists = true;
            await ListCodeService
                .checkListCode(new Long(this.state.inputListCode))
                .then(res => {
                    console.log(res.data);
                    if(res.data === '' || res.data === undefined) listCodeExists = false;
                })
            if(listCodeExists){
                await ListCodeService
                .addListCode({
                    userid: this.state.userId,//this.state.userId,
                    listid: this.state.inputListCode,
                })
                .then(res => {
                    this.retrieveLists();
                })
                this.setState({
                    inputListCode: ""
                });
            }
            else {
                alert("List Code is invalid or does not exist")
            }
        }
    }

    changeTheme(color) {
        document.body.style.backgroundColor=color;
    }

    onLogOut(e) {
        e.preventDefault();
        window.localStorage.clear();
        window.location.href = '/';
    }

    render() {
        const {colors, inputListCode} = this.state;
        return (
            <div className="flex-container-main">
                
                <div className="top-bar">
                    <div className="enter-code">
                        Join a new list: {" "}
                        <input className="code-input" type="text"       
                            placeholder="Enter a list code..." 
                            value={inputListCode}
                            onChange={(e) => this.handleInputListCode(e)}
                        />
                        <button className="enter-button" onClick={(e) => this.submitInputListCode(e)}>Enter</button>
                    </div>

                    <div className="flex-child">
                        <div className="username-display">Hello, {this.state.name} :)</div>
                    </div>

                    <button className="logout-button" title="Log Out" onClick={this.onLogOut}>Log Out</button>
                </div>

                {/* display all lists for this user: 
                1)get all listcodes for this user (listcodes table) 
                2)for each listcode, get the title and description (lists table)*/}
                <div className="all-lists">
                    {this.state.lists.map((list, i) => {
                        return (
                            <div key={i} className="listcard-padding">
                            <button onClick={() => this.navToList(list.listid)}>
                                <ListCard list={list}/>
                            </button>
                            <Link
                            id={`nav${list.listid}`}
                            to={{
                                pathname: 'list',
                                state: {listId: list.listid, userId: this.state.userId, name: this.state.name}, // your data array of objects
                            }}
                            />
                            </div>
                        )
                    })}
                </div>
                
                <div className="bottom-bar">
                    <div className="num-lists"># lists: {this.state.lists.length}</div>
                    
                    <div className="color-picker">
                        <div>Theme:</div>
                        {colors.map((colorChoices, i) =>
                            (<div key={i} onClick={() => this.changeTheme(colorChoices)} className="flex-child-colors" style={{backgroundColor: colorChoices}}></div>)
                        )}  
                    </div>
                                      
                    <div className="add-button-loc">
                        <button onClick={this.onCreateList}> <i className="fas fa-plus-circle"/> New List </button>
                        <Link
                        id="createListLink"
                        to={{
                            pathname: '/list',
                            state: {listId: this.state.listId, userId: this.state.userId, name: this.state.name}, // your data array of objects
                        }}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

// export default Home;