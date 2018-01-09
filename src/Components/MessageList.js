import React from 'react';
import Message from './Message';

const MessagesList = (props) => {
  return (
    <div>
      { props.messages.map(message => (<Message key={message.id} message={message}/>)) }
    </div>
  )
}

export default MessagesList;
