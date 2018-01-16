import React from 'react'


const Toolbar = ({selectAll, markAsRead, markAsUnread, del, applyLabel, removeLabel, countUnread, setButtonState, divGimp}) => {
  return(
    <div className="row toolbar">
    <div className="col-md-12">
      <p className="pull-right">
        <span className="badge badge">{`${countUnread()}`}</span>
        unread messages
      </p>

      <button className="btn btn-danger">
      <i className="fa fa-plus"></i>
      </button>

      <button className="btn btn-default"  onClick={()=>{selectAll()}}>
        <i className={`${setButtonState()}`} ></i>
      </button>

      <button className="btn btn-default" disabled={`${divGimp()}`} onClick={()=>{markAsRead()}}>
        Mark As Read
      </button>

      <button className="btn btn-default" disabled={`${divGimp()}`} onClick={()=>{markAsUnread()}}>
        Mark As Unread
      </button>

      <select disabled={`${divGimp()}`} className="form-control label-select" onChange={(e)=>{applyLabel(e.target.value)}} >
        <option selected="true" disabled="disabled">Apply label</option>
        <option value="dev">dev</option>
        <option value="personal">personal</option>
        <option value="gschool">gschool</option>
      </select>

      <select disabled={`${divGimp()}`} className="form-control label-select"
        onChange={(e)=>{removeLabel(e.target.value)}}>
        <option selected="true" disabled="disabled">Remove label</option>
        <option value="dev">dev</option>
        <option value="personal">personal</option>
        <option value="gschool">gschool</option>
      </select>

      <button disabled={`${divGimp()}`} className="btn btn-default" onClick={()=>{del()}}>
        <i className="fa fa-trash-o"></i>
      </button>
    </div>
  </div>

  )
}

export default Toolbar;
