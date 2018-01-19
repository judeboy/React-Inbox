import React, { Component } from 'react';
// import {
//   BrowserRouter as Router,
//   Route,
// } from 'react-router-dom'


class Body extends Component {

  constructor(props){
    super(props)
    this.state = {
      body: '',
    }
  }

  async componentDidMount() {
    const response = await fetch(`http://localhost:8082/api/messages/${this.props.message.id}`)
    const json = await response.json()
    console.log(json);
    this.setState({
      body: json.body
    })
  }


  render() {
    return (
      <div className="row message-body">
        <div className="col-xs-11 col-xs-offset-1">
          {this.state.body}
        </div>
      </div>
    )
  }
}

export default Body;
