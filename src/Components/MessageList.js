import React from 'react';
import Message from './Message':

const MessagesList = () => {
  return (
    <div>
      { messages.map(message => (<Message key={messages.id} />)) }
    </div>
  )
}

export default MessagesList;
