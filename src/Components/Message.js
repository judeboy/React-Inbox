import React from 'react';
import Body from './Body';

import {
  Route,
  Link
} from 'react-router-dom'

const Message = ({message, toggleRead, toggleSelected, toggleStar}) => {

  const readClass = message.read ? 'read' : 'unread';
  const checkClass = message.selected ? 'selected' : '';
  const starClass = message.starred ? 'star fa fa-star-o' : 'fa fa-star';

  let selected = ''
  if(message.selected===true){
  selected = "selected"
  }

  return (
    <div className={`row message ${readClass} ${checkClass}`} onClick={()=>{toggleRead(message)}}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input type="checkbox" checked={selected} defaultChecked={message.selected} onClick={(e)=>{toggleSelected(message,e)}}/>
          </div>
          <div className="col-xs-2">
            <i className={`${starClass}`} onClick={(e)=>{toggleStar(message,e)}}></i>
          </div>
        </div>
      </div>
      <div className={`col-xs-11`} onCLick={(e)=>{

      }}>
          {message.labels.map(ele => <span className="label label-warning">{ele}</span>)}
        <Link to={`/messages/${message.id}`}>
          {message.subject}
        </Link>
        <Route path={`/messages/${message.id}`} render ={() => (
          <div>
            <Body message={message}/>
          </div>
        )}/>
      </div>
    </div>
  )
}

export default Message;
