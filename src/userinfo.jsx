var pouch=require("./persistentmarkup_pouchdb");
var React=require("react");
//var crypto=require('./crypto');
var userinfo = React.createClass({
getInitialState: function() {
    return {bar: "world",pwtype:""};
  },
  changepassword:function() {
      if(this.state.pwtype == "") this.setState({pwtype:"change"});
      else this.setState({pwtype:""});
  },
  savepassword:function() {
    var ip = location.host.split(":")[0];
    var pwd = this.refs.new_password.getDOMNode().value,cpwd=this.refs.confirm_new_signup_pass.getDOMNode().value;
    if(this.refs.old_password.getDOMNode().value != this.props.user.pwd) {that.props.action("myinput",2,"confirm_new");return;}
    else if(pwd != cpwd || pwd =="" || cpwd == "") {return;}
    var db = new PouchDB('http://'+ip+':5984/account');
    var data = [{name:this.props.user.name,su:this.props.user.su,admin:this.props.user.admin,pwd:pwd},{pwd:pwd}];
    pouch.readfrompouch(db,this.props.user.name,this.changepasswrordstate,2,data);
  },
  changepasswrordstate:function(res) {
      this.setState({pwtype:"",pwd:res.pwd});
  },
  saveprofile:function(id,admin,pwd,type) {
    var that =this;
    var ip = location.host.split(":")[0];
    var nowloc = document.getElementById(id).rowIndex;
    var db = new PouchDB('http://'+ip+':5984/account');
    if(type == true) {
       that.props.users.splice(parseInt(nowloc)-1,1);
       that.setState({pwtype:""});
       pouch.removetopouch(db,id);
    }
    else {
     for(var i=0;i<this.props.users.length;i++) {
          if(this.props.users[i].id == id) {
            var data = [{name:id,su:this.props.users[i].doc.su,admin:admin,pwd:pwd||this.props.users[i].doc.pwd}];
            break;}
     }
     pouch.readfrompouch(db,id,this.showalert,2,data);
    }
  },
  showalert:function() {
     this.props.action("myalert",0);
  },
  select_chief:function(e){
    this.saveprofile(e.target.id,true);
  },
  select_proof:function(e){
    this.saveprofile(e.target.id,false);
  },
  select_password:function(e){
    var arr = e.target.id.split("+");
    this.saveprofile(arr[0],arr[1],document.getElementById(arr[2]).value);
  },
  delete_user:function(e){
    var arr = e.target.id.split("+");
    this.saveprofile(arr[0],arr[1],document.getElementById(arr[2]).value,true);
  },
  role_list:function(f) {
    if (f.doc.admin == true) {return <div>
    <div className="btn-group" data-toggle="buttons">
      <label className="btn active rolebutton_style" onClick={this.select_chief} id={f.id}><input type="radio" name={f.id} value="Chief Editor">Chief Editor</input></label>
      <label className="btn rolebutton_style" onClick={this.select_proof} id={f.id}><input type="radio" name={f.id} value="Proof Reader">Proof Reader</input></label>
    </div></div>}
    else {return <div>
      <div className="btn-group" data-toggle="buttons">
      <label className="btn rolebutton_style" onClick={this.select_chief} id={f.id}><input type="radio" name={f.id}  value="Chief Editor">Chief Editor</input></label>
      <label className="btn active rolebutton_style" onClick={this.select_proof} id={f.id}><input type="radio" name={f.id}  value="Proof Reader">Proof Reader</input></label>
    </div></div>
    }
  },
  user_list:function() {
    if(this.props.user.su == true){
    var cls="",out=[];
    if(this.props.users) {
       out.push(<tr><td>
          <div className="col-md-1"></div>
          <div className="col-md-2"><h4>Name</h4></div>
          <div className="col-md-4"><h4>Password</h4></div>
          <div className="col-md-4 pull-right"><h4>Role</h4></div>
        </td></tr>);
      for (var i=0;i<this.props.users.length;i++) {
      var f=this.props.users[i];
      if(f.doc.su == true)  out.push(<tr></tr>);
      else {
      out.push(<tr id={f.id}><td>
          <div className="col-md-1"><img src={"photo/"+this.props.users[i].id+".jpg?"+ new Date().getTime()} ref="user_photo" id={"user"+i} className="showphoto_style" onError={this.photo_error}></img></div>
          <div className="col-md-2"><h4>{f.id}</h4></div>
          <div className="col-md-4"><input type="text" defaultValue={f.doc.pwd} id={i}></input><button className="btn btn-success btn-block control_D-halfsize pull-right" id={f.id+"+"+f.doc.admin+"+"+i} onClick={this.select_password}>Change Password</button></div>
          <div className="col-md-4 pull-right">{this.role_list(f)}</div>
          <div className="col-md-1"><button className="btn btn-danger btn-block pull-right" style={{width:"80px"}} id={f.id+"+"+f.doc.admin+"+"+i} onClick={this.delete_user}>Delete</button></div>
        </td></tr>);
      }
    };
    return out;
   }
  }
  },
  refresh_photo:function(e) {
    var that = this;
    setTimeout(function(){
      that.getDOMNode().querySelector('#photo_1').src = "photo/"+that.props.user.name+".jpg?"+ new Date().getTime(); 
      that.props.action("change_mainphoto");
    },1000); 
  },
  photo_error:function(e) {
     var img = e.target;
     img.src= 'images/photo.png';
  },
  checkoldpassword:function() {
     if(this.refs.old_password.getDOMNode().value != this.props.user.pwd) this.props.action("myinput",0,"old_password");
     else this.props.action("myinput",1,"old_password");
  },
  confirmnewpwd:function() {
    if(this.refs.new_password.getDOMNode().value != this.refs.confirm_new_signup_pass.getDOMNode().value) {this.props.action("myinput",2,"confirm_new");}
    else {this.props.action("myinput",1,"confirm_new");}
  },
  password:function() {
      if(this.state.pwtype == "change") return <div>
        <div className="col-md-2 col-md-offset-1"><br />
        <div className="form-group has-feedback" id="old_password_form">
          <input ref="old_password" type="password" className="form-control control_D-halfsize" placeholder="Old Password" onBlur={this.checkoldpassword}></input>< br />
          <span className="glyphicon form-control-feedback" id="old_password_icon" style={{left:"120px"}}></span></div>
         <div className="form-group has-feedback" id="new_password_from">
          <input ref="new_password" type="password" className="form-control control_D-halfsize" placeholder="New Password" ></input>< br />
          <span className="glyphicon form-control-feedback" id="new_password_icon" style={{left:"120px"}}></span></div>
         <div className="form-group has-feedback" id="confirm_new_form">
          <input ref="confirm_new_signup_pass" type="password"  className="form-control control_D-halfsize" placeholder="Confirm Password" onChange={this.confirmnewpwd}></input>
          <span className="glyphicon form-control-feedback" id="confirm_new_icon" style={{left:"120px"}}></span></div>
        </div><div className="col-md-2 col-md-offset-3"><button className="btn btn-success btn-block changepassword" onClick={this.savepassword}>Save</button></div>
        <div className="col-md-2 col-md-offset-3"><button className="btn btn-warning btn-block changepassword" onClick={this.changepassword}>Cancel</button></div></div>
      else return <div><div className="col-md-3 col-md-offset-1"><button className="btn btn-success btn-block changepassword" onClick={this.changepassword}>Change Password</button></div></div>
  },
  render: function() {
     return <div>
            <div className="alert_ok alert-success" style={{width:window.innerWidth}}>
              <strong>Saved successfully!</strong>
            </div>
           <div className="col-md-4 col-md-offset-4">
            <div><div className="col-md-5"><img src={"photo/"+this.props.user.name+".jpg?"+ new Date().getTime()} id="photo_1" className="photostyle" onError={this.photo_error}></img></div></div>
            <div className="col-md-6"><form action="upload.php" method="post" encType="multipart/form-data"><h4>Change your photo</h4><input type="hidden" name="number" value={this.props.user.name}></input><input type="hidden" name="folder" value="photo"></input><input type="file" name="upload"></input>
            <div><input type="submit" className="btn btn-success btn-block pull-left" name="button" id="button" value="Upload" style={{width:"110px",marginBottom:"10px"}} onClick={this.refresh_photo}></input></div>
            </form></div>
            <div className="col-md-3 col-md-offset-1"><h3>Username:</h3></div><div className="col-md-7 col-md-offset-1"><h3>{this.props.user.name}</h3></div>
            <div className="col-md-3 col-md-offset-1"><h3>Password:</h3></div><div>{this.password()}</div>
          </div>
          <div  className="fileList col-md-11 col-md-offset-1" style={{height:window.innerHeight-380}}>
          <table className="table table-hover" id="user_table">
            <tbody>{this.user_list()}</tbody></table></div>
        </div>;
  }
});
module.exports=userinfo;