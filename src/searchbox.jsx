/** @jsx React.DOM */

//var othercomponent=Require("other"); 
//var tibetan=require("ksana-search").languages.tibetan;

var React=require("react"); 
var searchbox = React.createClass({
  getInitialState: function() {
    return {bar: "world"};
  },
  getTofind:function() {
      var tofind=this.refs.tofind.getDOMNode().value;
      tofind=tofind.replace(/%/g,"\uffff");
      //tofind=tibetan.romanize.fromWylie(tofind,null,false); 
      tofind=tofind.replace(/\uffff/g,"%");
      return tofind;
  },
  tofindchange:function() {
      var that=this;
      clearTimeout(this.timer1);
      this.timer1=setTimeout(function(){

        that.props.action("tofindchange",that.getTofind());
      },300);
  },
  keypress:function(e) {
    if (e.key=="Enter") this.dosearch();
  },
  dosearch:function() {
    this.props.action("search",this.getTofind());
  },
  insertwildcard:function() { 
    var dom=this.refs.tofind.getDOMNode();
    var tofind=dom.value;
    dom.value+="%";
    dom.focus();
  },
  componentDidMount:function() {
    this.tofindchange();
  },
  componentDidUpdate:function() {
    var that=this;
    setTimeout(function(){
      that.refs.tofind.getDOMNode().focus();
    },300);
  },
  filter:function() {
    this.props.action("filter",this.getTofind());
  },
  showfilter:function() {
    var disabled="";
    if (this.props.wildcard!=1) disabled=" disabled";
    if (this.props.progress==1) {
      return <button onClick={this.filter} className={"btn btn-warning"+disabled} type="button">Filter</button>  
    } else {
      return <span>{Math.floor(this.props.progress*100)+"%"}</span>
    }
  },
  render: function() {
    return (
      <div className="searchbox">
         <div> 
              <div className="input-group input-group-lg">
                <input  defaultValue={this.props.kw} ref="tofind"  onKeyPress={this.keypress} type="text" className="tofind" style={{width:window.innerWidth*0.7}}></input>
                <span className="input-group-btn">
                  <button className="btn btn-success btn-lg" type="button" onClick={this.dosearch}>Search</button>
              </span>
              </div>
          </div>
      </div>
    );
  }
});
module.exports=searchbox;