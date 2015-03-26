var React=require("react");
var inlinedialog_comment_tibetan = React.createClass({
  apply:function(e) {
    this.markup().text=this.props.text;
    this.markup().hint=this.refs.comment.getDOMNode().value;
    this.props.action("markupupdate");
  },
  keyup:function(e) {
    if (e.keyCode==27) {
      if (this.refs.comment.getDOMNode().value=="") {
          this.remove();
      } else {
        this.props.action("markupdate");  
      }      
    }
  }, 
  ct_moveto:function() {
    var target = document.getElementById("comment_tibetan").style;
    var range = window.innerWidth - 400;
    var width = document.getElementById("points").value*(range/10);
    target.left = width+"px";
  },
  remove:function() {
    if(this.props.markup.payload.hint == null) this.props.action("removemarkup",this.props.markup);
    else this.props.action("dismissmarkup",this.props.markup);
  },
  markup:function() {
    return this.props.markup.payload;
  },
  render: function() {
    return (
      <div onKeyUp={this.keyup} id="comment_tibetan"  className="inlinedialog well" style={{marginTop:"70px"}}>
        <div>
           <input type="range" id="points" min="0" max="10" defaultValue="0" style={{width:"400px"}} onMouseUp={this.ct_moveto}></input>
          </div> 
        <span className="col-sm-12">{this.props.text}</span>
        <span className="col-sm-3"><h5>Comment</h5></span>
        <span className="col-sm-9">
        <span className="col-sm-12" style={{marginBottom:"5px"}}><textarea rows="3" ref="comment" className="form-control input-lg"></textarea></span>
        <span className="col-sm-6"><button className="form-control btn btn-warning control_S-halfsize" onClick={this.remove}>Cancel</button></span>
        <span className="col-sm-6"><button className="form-control btn btn-success control_S-halfsize" onClick={this.apply}>Apply</button></span>
        </span>
      </div>
    );
  },
  focus:function() {
    if (this.refs.comment) this.refs.comment.getDOMNode().focus();
  },
  componentDidMount:function() {
    setTimeout(this.focus,300);
  },
});
module.exports=inlinedialog_comment_tibetan;