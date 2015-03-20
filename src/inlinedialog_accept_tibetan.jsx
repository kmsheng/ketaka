var React=require("react");
var inlinedialog_accept_tibetan = React.createClass({
  apply:function(e) {
    this.props.action("markupupdate");
  },
  keyup:function(e) {
    if (e.keyCode==13)  this.apply(e);
    else if (e.keyCode==27) this.props.action("markupdate");
  },
  clear:function() {
    var n=this.refs.inputtext.getDOMNode();
    n.focus();
    n.value="";
  },
  remove:function() {
    this.props.action("removemarkup",this.props.markup);
  },
  at_moveto:function() {
    var target = document.getElementById("accept_tibetan").style;
    var range = window.innerWidth - 400;
    var width = document.getElementById("points").value*(range/10);
    target.left = width+"px";
  },
  markup:function() {
    return this.props.markup.payload;
  },
  contributor:function() {
    if (this.markup().contributor){
      return  <span>
          <span className="col-sm-4"><h5>contributor</h5></span>
          <span className="col-sm-6"><h5>{this.markup().contributor}</h5></span>
        </span>
    } else return null;
  },
  render: function() {
    return ( 
      <div onKeyUp={this.onkeyup} id="accept_tibetan" className="inlinedialog well accept_pos"  style={{marginTop:"70px"}}>
        <span className="col-md-12">{this.props.text}</span>
        <div>
           <input type="range" id="points" min="0" max="10" defaultValue="0" style={{width:"400px"}} onMouseUp={this.at_moveto}></input>
          </div> 
          <span className="col-md-12">
            <span className="col-md-4"><h5>suggestion</h5></span>
            <span className="col-md-6"><h5>{this.markup().text}</h5></span>
            <span className="col-md-2"><input checked={this.markup().insert} type="checkbox"/></span>
          </span>
         <span className="col-md-12">{this.contributor()}</span>
        <span>
          <span className="col-md-4 col-md-offset-4">
            <button className="form-control btn btn-warning control_S-halfsize" onClick={this.remove}>Reset</button>
          </span>
          <span className="col-md-4">
            <button className="form-control btn btn-success control_S-halfsize" onClick={this.apply}>Ok</button>
          </span>
        </span>
      </div>
    );
  },
  focus:function() {
    if (this.refs.inputtext) this.refs.inputtext.getDOMNode().focus();
  },
  componentDidMount:function() {
    setTimeout(  this.focus,300);
  },
});
module.exports=inlinedialog_accept_tibetan;