var Signup=require("./usersignup.jsx");
var Info=require("./userinfo.jsx");
var pouch=require("./persistentmarkup_pouchdb");
var React=require("react");
//var crypto=require('./crypto');
var userlogin = React.createClass({
getInitialState: function() {
    return {bar: "world",type:"",file:"",pwd:""};
  },
  login:function() {
    var ip = location.host.split(":")[0];
    var db = new PouchDB('http://'+ip+':5984/account');
    pouch.readallfrompouch(db,this.login_check,0);
  },
  login_check:function(res) {
    var userinfo = "";
    var loginfo =false;
    var user=this.refs.username.getDOMNode().value;
    var pswd=this.refs.password.getDOMNode().value;
    for(var i=0;i<res.rows.length;i++){       
        if(res.rows[i].doc._id == user && res.rows[i].doc.pwd == pswd)
        {
          userinfo = res.rows[i].doc;
          loginfo = true;
        }
        if(res.rows[i].doc._id == user && res.rows[i].doc.pwd != pswd)
        {
          loginfo = "failed";
          this.props.action("myinput",0,"loginpwd");
          this.props.action("myinput",1,"loginname");
          }
        } 
        if(loginfo == false) {
         this.props.action("myinput",0,"loginname");
        }
        this.props.action("login",userinfo,loginfo,res.rows,pswd);
  },
  /*
  logout:function() {
    this.props.action("logout");
  },
  */
  /*
  startwork:function() {
    this.props.action("start");
  },*/
  /*
  isAdmin:function() {
    if (this.props.user.admin) {
      return  <span className="label label-success">admin</span>
    }   
  },*/
  singup:function() {
    this.refs.password.getDOMNode().value = "";
    this.setState({type:"signup"});
  },
  cancel_signup:function() {
    //this.refs.confirm_signup_pass.getDOMNode().value = "";
    //aaa
    this.setState({type:""});
  },
  passwordchange:function() {
    this.forceUpdate(); 
  },
  enterusername:function(e) {
    if (e.charCode==13) {
      this.refs.password.getDOMNode().focus();
    }
  },
  enterpassword:function(e) {
    if (e.charCode==13) this.login();
  },
  encryptedpassword:function() {
    if (!this.refs.password) return "";
    var password=this.refs.password.getDOMNode().value;
    //return password+"!"
    //return crypto.SHA1(password).toString();
    return password;
  },
  renderLogin:function() {
  return (
   <div>
     <div className="col-md-12 marginTop"></div>
      <div className="col-md-6 col-md-offset-4">
      <div className="col-md-offset-1">
        <img src="images/logo.jpg" className="logostyle"></img>
        <div className="form-group has-feedback" id="loginname_form">
          <input onKeyPress={this.enterusername} id="loginname" ref="username" className="form-control control_size" placeholder="Username" required="true" autofocus="true" ></input>
          <span className="glyphicon form-control-feedback" style={{left:"220px"}} id="loginname_icon"></span></div>
        <h2 className="label label-danger">{this.props.getError()}</h2><br />
        <div className="form-group has-feedback" id="loginpwd_form">
          <input onKeyPress={this.enterpassword} ref="password" type="password" className="form-control control_size" placeholder="Password"></input>
          <span className="glyphicon form-control-feedback" style={{left:"220px"}} id="loginpwd_icon"></span></div>
        <h2 className="label label-danger">{this.props.getpasswordError()}</h2><br />
        <button ref="encrypted" id="btnlogin" className="btn btn-lg btn-success btn-block control_size"  onClick={this.login} >Log in</button>
        <div className="create_acc"><a onClick={this.singup}><h4>Create account</h4></a></div>
        </div> 
		<div className="col-md-5 col-md-offset-3"><h6>version. 0.0.01</h6></div>
       </div>
       </div>
    );
  },
  render: function() {
    if (this.props.user.name) {
      return <Info action={this.props.action} user={this.props.user} users={this.props.users}></Info>;
    }else if(!this.props.user.name && this.state.type=="signup") {
      return <Signup action={this.props.action} cancel={this.cancel_signup}></Signup>;
    }else {
      return this.renderLogin();
    }
  }
});
module.exports=userlogin;