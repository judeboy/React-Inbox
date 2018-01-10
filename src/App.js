import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import Toolbar from './Components/Toolbar';
import MessageList from './Components/MessageList';
// import Message from './Components/Message';

let allSelected = true;

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      messages: this.props.messages
    }
  }

  toggleRead = (message) => {
    const index = this.state.messages.indexOf(message)
    let newMessages = this.state.messages.slice(0)
    newMessages[index].read = !newMessages[index].read
    this.setState({ messages: newMessages })
  }

  toggleSelected = (message,e) => {
    e.stopPropagation()
    const index = this.state.messages.indexOf(message)
    let newMessages = this.state.messages.slice(0)
    newMessages[index].selected = !newMessages[index].selected
    this.setState({ messages: newMessages })
  }

  toggleStar = (message,e) => {
    e.stopPropagation()
    const index = this.state.messages.indexOf(message)
    let newMessages = this.state.messages.slice(0)
    newMessages[index].starred = !newMessages[index].starred
    this.setState({ messages: newMessages })
  }


  selectAll = () =>{
      let selectedMessages = this.state.messages.slice(0);
      if(allSelected === true){
        console.log('SELECTED')
        selectedMessages.map(mess => {
          mess.selected = true
          this.setState({messages:selectedMessages})
        })
        allSelected = false
        console.log(allSelected)
      }
      else{
        selectedMessages.map(mess => {
          mess.selected = false
          this.setState({messages:selectedMessages})
        })
        allSelected = true
      }
    }


  render() {
    return (
      <div className="App">
        <Navbar />
        <div className='container'>
          <Toolbar selectAll={this.selectAll} />
          <MessageList messages={this.state.messages} toggleRead={this.toggleRead} toggleSelected={this.toggleSelected} toggleStar={this.toggleStar} />
        </div>
      </div>
    );
  }
}

export default App;
