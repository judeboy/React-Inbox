import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'


class Body extends Component {

constructor(props){
  super(props)
  this.state = {
    body: '',
  }
}

async componentDidMount() {
  const response = await fetch('http://localhost:8082/api/messages/:id/body')
  const json = await response.json()
  this.setState({
    messages: json._embedded.messages
  })
}

render() {
  return (
    <div className="row message-body">
      <div className="col-xs-11 col-xs-offset-1">
        This is the body of the message.
      </div>
    </div>
  )
}
}

export default Body;
