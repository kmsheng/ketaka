var React=require("react");
var Change=React.createClass({
  author_error:function(e) {
     var img = e.target;
     img.src= 'images/photo.png';
  },
  render:function() {
    var opts={
      "className":"btn btn-success control_S-halfsize",
      "data-choice":this.props.i, 
      "name":this.props.name,
      "onClick":this.props.select
    }
    return (
     <span data-date={this.props.now} className="col-md-12">
       <span className="col-md-2"><img src={"photo/"+this.props.m.author+".jpg?"+ new Date().getTime()} onError={this.author_error} style={{height:"40px",width:"40px",backgroundColor:"#dddddd"}}></img><h6 className="pull-left" style={{color:"blue"}}>{this.props.m.author}</h6></span>
       <span className="col-md-7"  style={{wordBreak:"break-all",fontSize:"80%",display:"inline-block"}}>{this.props.m.text}<br /><h5>{this.props.m.reason}</h5></span>
       <span className="col-md-3">{React.DOM.button(opts,"Approve")}</span>
    </span>);
  }
})
var inlinedialog_applychange = React.createClass({
  getInitialState: function() {
    return {now : new Date()};
  },
  keyup:function(e) {
    if (e.keyCode==13)  this.myanwser(e);
    else if (e.keyCode==27) this.props.action("markupdate");
  },
  markup:function() {
    return this.props.markup.payload;
  },
  select:function(e) {
    var selected=parseInt(e.target.attributes['data-choice'].value);
    var accepted=this.markup().choices[selected];
    var payload={type:"revision" ,text:accepted.text, 
        contributor:accepted.author};
    var m=this.props.markup;
    this.props.action("addmarkupat",m.start,m.len,payload);
    this.props.action("nextmistake","next");
  },
  myanwser:function() {
    var inputtext=this.refs.inputtext.getDOMNode().value||this.refs.origintext.getDOMNode().innerHTML;
    var payload={type:"revision" ,text:inputtext};
    var m=this.props.markup;
    this.props.action("addmarkup",payload,true);
    this.props.action("nextmistake","next");
  },
  choices:function(name) {
    var out=[];
    for (var i=0;i<this.markup().choices.length;i++) {
      out.push(Change({
        ref:'o'+i,
        now:this.state.now,
        select:this.select,
        m:this.markup().choices[i],
        i:i,name:name}));
    }
    return out;
  },
  setselected:function() {
    if (this.markup().selected) {
      this.refs['o'+(this.markup().selected-1)].getDOMNode()
      .querySelector("input[type=radio]").checked=true;
    } else {
      var radio=this.getDOMNode().querySelectorAll("input[type=radio]");
      for (var i=0;i<radio.length;i++) {
        radio[i].checked=false;
      }
    }
  },
  ac_moveto:function() {
    var target = document.getElementById("applychange").style;
    var range = window.innerWidth - 500;
    var width = document.getElementById("points").value*(range/10);
    target.left = width+"px";
  },
  componentDidMount:function() {
    this.setselected();
  },
  componentDidUpdate:function() {
    this.setselected();
  },
  clear:function() {
    var n=this.refs.inputtext.getDOMNode();
    n.focus();
    n.value="";
  },  
  close:function() {
    this.props.action("markupupdate");
    this.props.action("nextmistake","next");
  },
  otherAnswer:function() {
    return (
    <span className="col-md-12">
        <span className="col-md-2" style={{fontSize:"50%",marginTop:"8px"}}>Suggestion</span>
        <span className="col-md-7"><input ref="inputtext" className="focus form-control input-lg"></input></span>
        <span className="col-md-3"><button className="btn btn-success control_S-halfsize" onClick={this.myanwser} >Mine is better</button></span>
    </span>);
  },
  render: function() {
    return (
      <div onKeyUp={this.keyup} id="applychange" className="col-md-12 inlinedialog well" style={{width:"500px",marginTop:"70px"}}> 
      <div>
        <input type="range" id="points" min="0" max="10" defaultValue="0" style={{width:"500px"}} onMouseUp={this.ac_moveto}></input>
       </div> 
      <span className="col-md-6"><span ref="origintext">{this.props.text}</span></span>
      <span className="col-md-3"><button className="btn btn-warning ignore_button control_S-halfsize" style={{marginLeft:"-8px"}} onClick={this.close}>Ignore</button></span>
      <span className="col-md-3"><button className="btn btn-danger control_S-halfsize" style={{marginLeft:"-8px"}} onClick={this.myanwser} >Reject</button></span>
      <hr />
      {this.choices("radioname")}
      {this.otherAnswer()}
      </div>
    );
  } 
});
module.exports=inlinedialog_applychange;