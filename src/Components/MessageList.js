import React from 'react';
import Message from './Message';

const MessagesList = ({messages, toggleRead, toggleSelected, toggleStar}) => {
  return (
    <div>
      { messages.map(message => (<Message key={message.id} message={message} toggleRead={toggleRead} toggleSelected={toggleSelected} toggleStar={toggleStar}/>)) }
    </div>
  )
}

export default MessagesList;
