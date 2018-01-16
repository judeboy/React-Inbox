import React from 'react';
//change

const Compose = ({visibility, handler}) => {
  let visible=''
  if(visibility==='hidden'){
    visible = 'none'
  }else {
    visible = 'block'
  }
  return(
    <form style={{display:visible}} className="form-horizontal well">
    <div className="form-group">
      <div className="col-sm-8 col-sm-offset-2">
        <h4>Compose Message</h4>
      </div>
    </div>
    <div className="form-group">
      <label htmlFor="subject" className="col-sm-2 control-label">Subject</label>
      <div className="col-sm-8">
        <input type="text" className="form-control" id="subject" placeholder="Enter a subject" name="subject"></input>
      </div>
    </div>
    <div className="form-group">
      <label htmlFor="body" className="col-sm-2 control-label">Body</label>
      <div className="col-sm-8">
        <textarea name="body" id="body" className="form-control"></textarea>
      </div>
    </div>
    <div className="form-group">
      <div className="col-sm-8 col-sm-offset-2">
        <input type="button" onClick={handler} value="Send" className="btn btn-primary"></input>
      </div>
    </div>
  </form>
  )
}

export default Compose;
