/** @jsx React.DOM */

//var othercomponent=Require("other"); 
var React=require("react");
var about = React.createClass({
  getInitialState: function() {
    return {bar: "world"};
  },
  pro_logout:function() {
     this.props.action("logout");
  },
  pro_profile:function() {
     this.props.action("index");
  },
  popoverphoto_error:function() {
     this.getDOMNode().querySelector('#pop_photo').src = 'images/photo.png';
  },
  getadmin:function() {
    if(this.props.tab[0].profile.admin ==true && this.props.tab[0].profile.su ==true){
      return "Administrator";
    }else if(this.props.tab[0].profile.admin ==true){
      return "Chief editor";
    }else {
      return "Proof reader";
    }
  },
  render: function() {
    return (
      <div>
         <div className="col-md-5"><img src={"photo/"+this.props.tab[0].text+".jpg?"+ new Date().getTime()} className="photo_style" id="pop_photo" onError={this.popoverphoto_error}></img></div>
         <div className="col-md-7"><h4>{this.props.tab[0].profile.name}</h4>
         <h2 className="label label-info">{this.getadmin()}</h2><br /><br />
         <div><button className="btn btn-block btn-success col-md-1 about_button_style"onClick={this.pro_profile}>Profile</button>
         <button className="btn btn-block btn-success pull-right about_button_style" onClick={this.pro_logout}>Logout</button>
         </div>
         </div>
      </div>
    );
  } 
});
module.exports=about;