import React, { Component } from 'react';
import '../styles/index.css'
import listStyles from '../styles/list.module.css';
import ListService from '../services/ListService';
import ListCodeService from '../services/ListCodeService';
import { Link } from "react-router-dom";

export default class List extends Component {
    
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeCheck = this.onChangeCheck.bind(this);
        this.navToHome = this.navToHome.bind(this);
        this.retrieveItems = this.retrieveItems.bind(this);
        this.retrieveListInfo = this.retrieveListInfo.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.retrieveCollaborators = this.retrieveCollaborators.bind(this);
        this.state = {
          title: "",
          desc: "",
          items: [],
          newItemInput: "",
          listId: -1,
          userId: -1,
          name: '',
          collaborators: [],
          retrieveInterval: null,
          collaboratorInterval: null
        };
    } 
        async componentDidMount() {
            //if(this.state.userId === -1) window.location.href = "/";
        //this.retrieveItems();
        if(this.props.location.state === undefined) window.location.href = "/";

        this.retrieveItems();
        this.retrieveListInfo();
        this.retrieveCollaborators();
        
        var retrieveInterval = setInterval(() => {
            this.retrieveItems();
            this.retrieveListInfo();
        }, 500);

        var collaboratorInterval = setInterval(() => {
            this.retrieveCollaborators();
        }, 1500);

        this.setState({
            retrieveInterval: retrieveInterval,
            collaboratorInterval: collaboratorInterval,
        })
    }

    componentWillUnmount() {
        window.clearInterval(this.state.retrieveInterval);
        window.clearInterval(this.state.collaboratorInterval);
    }

    async retrieveListInfo () {
        var initTitle;
        var initDesc;
        await ListService.getList(this.props.location.state.listId).then(response => {
            initTitle = response.data.title;
            initDesc = response.data.description;
        }).catch(e => {
            console.log(e);
        });
        this.setState({
            listId: this.props.location.state.listId,
            userId: this.props.location.state.userId,
            title: initTitle,
            desc: initDesc
        });
    }

    async onChangeTitle(e) {
        const title = e.target.value;
    
        this.setState({
          title: title
        });

        // call list service for changing title here
        var newList;
        const listId = this.props.location.state.listId
        await ListService.getList(listId).then(response => {
            newList = {
                title: title,
                description: response.data.description,
                owner: response.data.owner,
            }
        }).catch(e => {
            console.log(e);
        });
        await ListService.updateList(listId, newList)
    }

    async onChangeDescription(e) {
        e.preventDefault()
        const desc = e.target.value;
    
        this.setState({
          desc: desc
        });

        // call list service for changing description here
        var newList;
        const listId = this.props.location.state.listId;
        await ListService.getList(listId).then(response => {
            newList = {
                title: response.data.title,
                description:  desc,
                owner: response.data.owner,
            }
        }).catch(e => {
            console.log(e);
        });
        console.log(newList);
        await ListService.updateList(listId, newList)
    }

    onChangeNewItemInput(e) {
        e.preventDefault();
        const newItemInput = e.target.value;
        this.setState({
            newItemInput: newItemInput
        });
    }

    async onChangeCheck(id) {
        var data;
        await ListService.get(id).then(response => {
            data = {
                ...response.data,
                checked: !response.data.checked
            }
        }).catch(e => {
            console.log(e);
        });

        await ListService.update(id, data).then(response => {
            console.log(response.data);
        }).catch(e => {
            console.log(e);
        });
        this.retrieveItems();
    }

    retrieveItems() {
        ListService.getAll(this.props.location.state.listId) //this.state.listId
          .then(response => {
              this.setState({
                  items: response.data === '' ? [] : response.data
              })
          })
          .catch(e => {
            console.log(e);
          });
    }

    retrieveCollaborators() {
        ListCodeService.getUserEmails(this.props.location.state.listId)
        .then(response => {
            console.log(response.data)
            this.setState({
                collaborators: response.data === '' ? [] : response.data
            })
        })
        .catch(e => {
            console.log(e);
        })
    }

    refreshList() {
        this.retrieveItems();
    }
    
    async addItem(e) {
        e.preventDefault()
        if(this.state.newItemInput.length === 0) {
            return;
        }
          var data = {
              item_id: null,
              listid: this.state.listId,
              item_value: this.state.newItemInput,
              checked: false
          }
  
          await ListService.create(data).then(response => {
              console.log(response.data);
          }).catch(e => {
              console.log(e);
          });
  
          this.retrieveItems();
  
          this.setState({
              newItemInput: ""
          })
    }

    async deleteItem(id){   
        await ListService.delete(id).then(response => {
            console.log(response.data);
        }).catch(e => {
            console.log(e);
        });
        this.retrieveItems();
    }

    navToHome(e) {
        document.getElementById("homeLink").click();
    }

    render() {
        const {title, desc, items, collaborators, newItemInput} = this.state;
        return (
            <div className={listStyles.flexContainer}>
                <div className={listStyles.inputArea}>
                    
                    <div>
                    Title:
                    <input
                        id='listTitle'
                        className={listStyles.listTitle}
                        value={title}
                        placeholder="List Title"
                        onChange={(e) => this.onChangeTitle(e)}
                    /></div>
                    <div>
                    Description:
                    <input
                        id='listDesc'
                        className={listStyles.listDesc}
                        value={desc}
                        placeholder="List Description"
                        onChange={(e) => this.onChangeDescription(e)}
                    /></div>
                    {this.props.location.state && this.props.location.state.userId && this.props.location.state.userId !== -1 &&
                    <div>
                        Collaborators: {" "}
                        {collaborators.map((c, i) => 
                        (
                            <span key={i} className={listStyles.emails}>
                                {c} {" "}
                            </span>
                            
                            
                        ))}
                    </div>}
           
                    <br/>
                    
                    <form onSubmit={(e) => this.addItem(e)}>
                        Add a new item to the list! 
                        <input 
                            value={newItemInput}
                            onChange={(e) => this.onChangeNewItemInput(e)}
                            className={listStyles.newItemForm}
                            id="newItem"
                            placeholder="Type here..."
                        />
                    </form>
                </div>

                <pre className={listStyles.listArea}>
                { items.map((s, i) => 
                    (
                        <span key={i}>
                            <input
                                type="checkbox"
                                id={`custom-checkbox-${i}`}
                                checked={s.checked}
                                value={s.checked}
                                onChange={(e) => this.onChangeCheck(s.item_id)}
                            />
                            {s.item_value/*  + s.item_id */}
                            <button 
                                onClick={() => this.deleteItem(s.item_id)}
                                className={listStyles.deleteButton}
                            >
                                Delete
                            </button>
                            {'\n'}
                        </span>
                    )
                
                )}
                <br />
                </pre>
                <div>
                    <div className={listStyles.spaceBetween}>
                    {this.props.location.state.userId && this.props.location.state.userId !== -1 &&<div><Link 
                        id="homeLink"
                        to={{
                            pathname: 'home',
                            state: {userId: this.props.location.state.userId, name: this.props.location.state.name}, 
                        }}/>
                        <button onClick={this.navToHome}>Back to Home</button>
                    </div>}
                        
                    {this.props.location.state && this.props.location.state.userId && this.props.location.state.userId !== -1 &&
                    <div>
                    <i>
                        List Code: {this.state.listId}
                        
                    </i>
                    <br />
                    <div className={listStyles.shareCode}>
                        Share this Code with collaborators</div>
                    </div>}
                    </div>
                </div>
            </div>
        );
    }
}