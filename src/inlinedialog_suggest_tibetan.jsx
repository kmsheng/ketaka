var React=require("react");
var inlinedialog_suggest_tibetan = React.createClass({
  apply:function() {    
    var text=this.refs.inputtext.getDOMNode().value;
    if (this.props.text==text) {
      this.remove(); //no chances
    } else {
      this.markup().text=text;  
      this.markup().reason=this.refs.reason.getDOMNode().value;
      this.markup().state = "";
    }
    this.props.action("markupupdate");
  },
  keyup:function(e) {
    if (e.keyCode==13)  this.apply(e);
    else if (e.keyCode==27) {
      if (this.refs.inputtext.getDOMNode().value==this.props.text) {
        this.props.action("removemarkup",this.props.markup);
      } else {
        this.props.action("markupdate");  //cancel
      }
    }
  }, 
  clear:function() {
    var n=this.refs.inputtext.getDOMNode();
    n.focus();
    n.value="";
  },
  st_moveto:function() {
    var target = document.getElementById("suggest_tibetan").style;
    var range = window.innerWidth - 400;
    var width = document.getElementById("points").value*(range/10);
    target.left = width+"px";
  },
  remove:function() {
    if(this.props.markup.payload.text == this.props.text) this.props.action("removemarkup",this.props.markup);
    else this.props.action("dismissmarkup",this.props.markup);
  },
  markup:function() {
    return this.props.markup.payload;
  },
  render: function() {
    if (this.props.markup.payload.state == "reject") {
      return (<div onKeyUp={this.keyup} id="suggest_tibetan" className="inlinedialog well" style={{marginTop:"70px"}}>This suggset has been rejected.</div>);
      }
    else if (this.props.markup.payload.state == "approve") {
      return (<div onKeyUp={this.keyup} id="suggest_tibetan" className="inlinedialog well" style={{marginTop:"70px"}}>This suggset has been approved.</div>);
      }
    else return (
       <div onKeyUp={this.keyup} id="suggest_tibetan" className="inlinedialog well" style={{marginTop:"70px"}}>
        <div>
           <input type="range" id="points" min="0" max="10" defaultValue="0" style={{width:"400px"}} onMouseUp={this.st_moveto}></input>
          </div> 
        <span>{this.props.text}</span><br />
        <span>
        <span className="col-sm-4">
          <h5 className= "pull-right">Suggestion</h5>
          <h5 className= "pull-right">Reason</h5>
        </span>
          <span className="col-sm-8">
            <span className="col-sm-12" style={{marginBottom:"10px"}}><input ref="inputtext" type="text" onMouseOver={this.st_moveto} className="focus form-control input-lg" onKeyPress={this.change}></input></span>
            <span className="col-sm-12" style={{marginBottom:"5px"}}><textarea rows="2" ref="reason" className="form-control input-lg"></textarea></span>
            <span className="col-sm-6"><button className="form-control btn btn-warning control_S-halfsize" style={{marginLeft:"-20px"}} onClick={this.remove}>Cancel</button></span>
            <span className="col-sm-6"><button className="form-control btn btn-success control_S-halfsize" onClick={this.apply}>Apply</button></span>
          </span>
        </span>
      </div>
    );
  },
  focus:function() {
    if (this.refs.inputtext) {
      var dn=this.refs.inputtext.getDOMNode();
      dn.focus();
      dn.selectionStart=dn.selectionEnd;
    }
  },
  componentDidMount:function() {
    if (this.refs.inputtext) {
          this.refs.inputtext.getDOMNode().value = this.markup().text;
          this.refs.reason.getDOMNode().value = this.markup().reason|| "";
    }

    setTimeout(this.focus,300);
  },
  componentDidUpdate:function() {
    if (this.refs.inputtext) {
      this.refs.inputtext.getDOMNode().value = this.markup().text;
      this.refs.reason.getDOMNode().value = this.markup().reason || "";
   }
  },
});
module.exports=inlinedialog_suggest_tibetan;