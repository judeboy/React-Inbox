import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MessageList from './Comoponents/MessageList';
import Toolbar from './Components/Toolbar';
import Message from './Components/Message';




class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
      </div>

        <div className='container'>
          <Toolbar />
          <MessageList />
        </div>

    );
  }
}

export default App;
