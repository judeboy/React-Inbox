import React from 'react'


const Toolbar = ({selectAll, markAsRead, markAsUnread, del, applyLabel, removeLabel, countUnread, setButtonState}) => {
  return(
    <div className="row toolbar">
    <div className="col-md-12">
      <p className="pull-right">
        <span className="badge badge">{`${countUnread()}`}</span>
        unread messages
      </p>

      <button className="btn btn-default" onClick={()=>{selectAll()}}>
        <i className={`${setButtonState()}`} ></i>
      </button>

      <button className="btn btn-default" onClick={()=>{markAsRead()}}>
        Mark As Read
      </button>

      <button className="btn btn-default" onClick={()=>{markAsUnread()}}>
        Mark As Unread
      </button>

      <select className="form-control label-select" onChange={(e)=>{applyLabel(e.target.value)}} >
        <option>Apply label</option>
        <option value="dev">dev</option>
        <option value="personal">personal</option>
        <option value="gschool">gschool</option>
      </select>

      <select className="form-control label-select"
        onChange={(e)=>{removeLabel(e.target.value)}}>
        <option>Remove label</option>
        <option value="dev">dev</option>
        <option value="personal">personal</option>
        <option value="gschool">gschool</option>
      </select>

      <button className="btn btn-default" onClick={()=>{del()}}>
        <i className="fa fa-trash-o"></i>
      </button>
    </div>
  </div>

  )
}

export default Toolbar;
