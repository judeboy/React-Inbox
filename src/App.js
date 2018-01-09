import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import Toolbar from './Components/Toolbar';
import MessageList from './Components/MessageList';
import Message from './Components/Message';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      messages: this.props.messages
    }
  }
  render() {
    return (
      <div className="App">
        <Navbar />

        <div className='container'>
          <Toolbar />
          <MessageList messages={this.state.messages} />
        </div>

      </div>
    );
  }
}

export default App;
