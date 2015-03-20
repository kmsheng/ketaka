var pouch=require("./persistentmarkup_pouchdb");
var React=require("react");
//var crypto=require('./crypto');
var usersignup = React.createClass({
getInitialState: function() {
    return {unametype:"error"};
  },
  signup:function() {
    var user = [this.refs.signup_username.getDOMNode().value,this.refs.signup_pass.getDOMNode().value,this.refs.confirm_signup_pass.getDOMNode().value];
    var target = ["signupname","signuppwd","signupconfirmpwd"];
    var unametype = this.state.unametype;
    for(var i = 0;i<user.length;i++) {
      if(user[i] == "") {
        this.props.action("myinput",0,target[i]);
        unametype = "error";
        break;
      }
    }
    if(user[1] != user[2] || unametype=="error") return;
    else {
      var ip = location.host.split(":")[0];
      var db = new PouchDB('http://'+ip+':5984/account');
      var todo ={_id:user[0], admin:false, su:false, name:user[0], pwd:user[1]};
      pouch.savetopouch(db,todo,this.signup_success);
    }
  },
  signup_success:function() {
    this.setState({unametype:"error"});
    this.cancelsignup();
  },
  checkuname_response:function(msg) {
    if(msg == null) {this.props.action("myinput",0,"signupname");this.setState({unametype:"error"});
      document.getElementById("name_error").innerHTML = "Username has already been taken";}
      else {this.props.action("myinput",1,"signupname");this.setState({unametype:"ok"});
      document.getElementById("name_error").innerHTML = "";}
  },
  checkname:function() {
    var ip = location.host.split(":")[0];
    if(this.refs.signup_username.getDOMNode().value == "") return;
    var name = this.refs.signup_username.getDOMNode().value;
    var db = new PouchDB('http://'+ip+':5984/account');
    pouch.readfrompouch(db,name,this.checkuname_response,0);
  },
  checkpwd:function() {
    if(this.refs.signup_pass.getDOMNode().value == "") {this.props.action("myinput",0,"signuppwd");}
    else {this.props.action("myinput",1,"signuppwd");}
  },
  Confirmpwd:function() {
    var user = [this.refs.signup_pass.getDOMNode().value,this.refs.confirm_signup_pass.getDOMNode().value];
    if(user[0] != user[1]) {this.props.action("myinput",2,"signupconfirmpwd");}
    else {this.props.action("myinput",1,"signupconfirmpwd");}
  },
  cancelsignup:function() {
    this.refs.confirm_signup_pass.getDOMNode().value = "";
    this.props.cancel();
    //this.setState({type:""});
  },
  render: function() {
    return (  
    <div>
      <div className="col-md-4 col-md-offset-4">
        <div className="col-md-12">
        <form action="upload.php" method="post" encType="multipart/form-data"><h3>Select a photo</h3><input type="hidden" name="folder" value="photo"></input><input type="file" name="upload"></input>
        <div className="form-group has-feedback" id="signupname_form">
          <label className="control-label" id="name_error" style={{color:"red"}}> </label>
          <input ref="signup_username" className="form-control control_size" name="number" placeholder="Username" required="true" autofocus="true" onBlur={this.checkname}></input><br />
          <span className="glyphicon form-control-feedback" id="signupname_icon" style={{left:"220px"}}></span></div>
          <div className="form-group has-feedback" id="signuppwd_form">
          <label></label>
          <input ref="signup_pass" type="password"  className="form-control control_size" placeholder="Password" onBlur={this.checkpwd}></input><br />
          <span className="glyphicon form-control-feedback" id="signuppwd_icon" style={{left:"220px",top:"20px"}}></span></div>
          <div className="form-group has-feedback" id="signupconfirmpwd_form">
          <label className=" control-label" id="confirm_error" style={{color:"red"}}></label>
          <input ref="confirm_signup_pass" type="password"  className="form-control control_size" placeholder="Confirm Password" onChange={this.Confirmpwd}></input><br /><div>
          <span className="glyphicon form-control-feedback" id="signupconfirmpwd_icon" style={{left:"220px",top:"20px"}}></span></div>
        </div>
        <div style={{width:"260px"}}>
        <div><input type="submit" className="btn btn-success btn-block pull-left" name="button" id="button" value="Confirm" onClick={this.signup} style={{width:"110px"}}></input></div>
        <div><button className="btn btn-warning btn-block control_S-halfsize pull-right" onClick={this.cancelsignup}>Cancel</button></div>
        </div>
        </form>
        </div></div>
    </div>
    );
  }
});
module.exports=usersignup;