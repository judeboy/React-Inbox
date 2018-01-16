import React, { Component } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import Toolbar from './Components/Toolbar';
import MessageList from './Components/MessageList';
import Compose from './Components/Compose'

let allSelected = true;

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      messages: [],
      newForm: 'hidden',
    }
  }

  async componentDidMount() {
    const response = await fetch('http://localhost:8082/api/messages')
    const json = await response.json()
    this.setState({
      messages: json._embedded.messages
    })
  }

  newMessage = async () => {
    const sub = document.getElementById('subject').value
    const bod = document.getElementById('body').value
    
    let obj = {
      "subject": sub,
      "body": bod
    }

    let response = await fetch('http://localhost:8082/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(obj)
    })
    let messageBody = await response.json()
    let newMessages = [...this.state.messages, messageBody]
    this.setState({
      messages: newMessages,
      newForm: 'hidden'
    })
  }

  toggleRead = async (message) => {
    const obj = {
      "messageIds": [ message.id ],
      "command": "read",
      "read": !message.read
    }
    const index = this.state.messages.indexOf(message)
    let newMessages = this.state.messages.slice(0)
    newMessages[index].read = !newMessages[index].read
    this.setState({ messages: newMessages })
    await fetch('http://localhost:8082/api/messages',{
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(obj)
    })
  }

  toggleSelected = async (message,e) => {
    e.stopPropagation()
    const index = this.state.messages.indexOf(message)
    let newMessages = this.state.messages.slice(0)
    newMessages[index].selected = !newMessages[index].selected
    this.setState({ messages: newMessages })
  }

  toggleStar = async (message,e) => {
    const obj = {
      "messageIds": [ message.id ],
      "command": "star",
      "star": !message.starred
    }
    e.stopPropagation()
    const index = this.state.messages.indexOf(message)
    let newMessages = this.state.messages.slice(0)
    newMessages[index].starred = !newMessages[index].starred
    this.setState({ messages: newMessages })
    await fetch('http://localhost:8082/api/messages',{
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(obj)
    })
  }

  selectAll = () =>{
      let selectedMessages = this.state.messages.slice(0);
      if(allSelected === true){
        selectedMessages.map(mess => {
          mess.selected = true
          this.setState({messages:selectedMessages})
        })
        allSelected = false
      } else {
        selectedMessages.map(mess => {
          mess.selected = false
          this.setState({messages:selectedMessages})
        })
        allSelected = true
      }
    }

  markAsRead = async () => {
    let id = [];
    let newMessages = this.state.messages.slice(0)
    newMessages.forEach(message=>{
      if(message.selected === true){
        message.read = true
        id.push(message.id)
      }
    })
    const obj = {
      "messageIds": id,
      "command": "read",
      "read": true
    }
    this.setState({messages:newMessages})
    await fetch('http://localhost:8082/api/messages',{
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(obj)
    })
  }

  markAsUnread = async () => {
    let id = [];
    let newMessages = this.state.messages.slice(0)
    newMessages.forEach(message=>{
      if(message.selected === true){
        message.read = false
        id.push(message.id)
      }
    })
    const obj = {
      "messageIds": id,
      "command": "read",
      "read": false
    }
    this.setState({messages:newMessages})
    await fetch('http://localhost:8082/api/messages',{
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(obj)
    })
  }

  del = async () => {
    let arr = [];
    let ids = []
    let newMessages = this.state.messages.slice(0)
    newMessages.forEach(message=>{
      if(!message.selected === true){
        arr.push(message)
      }
      if(message.selected === true){
        ids.push(message.id)
      }
    })
    const obj = {
      "messageIds": ids,
      "command": "delete"
    }
    this.setState({messages: arr})
    await fetch('http://localhost:8082/api/messages',{
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(obj)
    })
  }

  applyLabel = async (label) => {
    let ids = [];
    let newMessages = this.state.messages.slice(0)
    newMessages.forEach(message => {
        if(message.selected && message.labels.indexOf(label) === -1){
          message.labels.push(label);
          ids.push(message.id)
        }
    })
    const obj = {
      "messageIds": ids,
      "command": "addLabel",
      "label": label
    }
      this.setState({messages: newMessages})
      await fetch('http://localhost:8082/api/messages',{
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(obj)
      })
  }

  removeLabel = async (label) => {
    let ids = [];
    let newMessages = this.state.messages.slice(0)
    newMessages.forEach(message => {
      if(message.selected){
        let index = message.labels.indexOf(label)
        message.labels.splice(index, 1)
        ids.push(message.id)
      }
    })
    const obj = {
      "messageIds": ids ,
      "command": "removeLabel",
      "label": label
    }
    this.setState({messages: newMessages})
    await fetch('http://localhost:8082/api/messages',{
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(obj)
    })
  }

  countUnread = () => {
    if (!this.state.messages.length) {
      return 0
    }
    let newMessages = this.state.messages.slice(0)
    let count = 0;
    newMessages.forEach(message=>{
      if(message.read === false){
        count++
      }
    })
    return count
  }

  setButtonState = () => {
    if (!this.state.messages.length) {
      return 0
    }
    let count = 0;
    let selectClass = ''
    let newMessages = this.state.messages.slice(0)
    newMessages.forEach(message=>{
      if(message.selected === true){
        count++
      }
      })
      if(count > 0 && count < newMessages.length){
        selectClass = 'fa fa-minus-square-o'
      }
      if(count === newMessages.length){
        selectClass = 'fa fa-check-square-o'
      }
      if(count === 0){
        selectClass = 'fa fa-square-o'
      }
    return selectClass
  }

  divGimp = () => {
    if (!this.state.messages.length) {
      return 0
    }
    let disabled = ''
    let count = 0;
    let newMessages = this.state.messages.slice(0)
    newMessages.forEach(message=>{
      if(message.selected === true){
        count++
      }
      if(count > 0){
        disabled = ''
      }
      if(count === 0){
      disabled = 'disabled'
      }
      })
      return disabled
  }

  toggleForm = () => {
    if(this.state.newForm === 'hidden'){
      this.setState({
        newForm:'notHidden'
      })
    }
    else{
      this.setState({
        newForm:'hidden'
      })
    }
  }

  handler = () => {
    this.newMessage();
    this.toggleForm();
  }

  render() {
    return (
      <div className="App">

        <Navbar />

        <div className='container'>
          <Toolbar setButtonState={this.setButtonState} countUnread={this.countUnread} selectAll={this.selectAll} markAsRead={this.markAsRead} markAsUnread={this.markAsUnread} del={this.del} applyLabel={this.applyLabel} removeLabel={this.removeLabel} divGimp={this.divGimp} toggleForm= {this.toggleForm}/>
          <Compose visibility={this.state.newForm} handler= {this.handler} newMessage={this.newMessage}/>
          <MessageList messages={this.state.messages} toggleRead={this.toggleRead} toggleSelected={this.toggleSelected} toggleStar={this.toggleStar} />
        </div>
      </div>
    );
  }
}

export default App;
