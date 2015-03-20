var React=require("react");
var element_comment_tibetan = React.createClass({
  getInitialState: function() {
    return {};
  },
  openViewonly:function(e) {
    var dom=e.target;
    if (dom.className!="viewonlyHolder") dom=dom.parentElement;
    $(dom).popover("show");
  },
  render: function() {
    return ( 
    <span tabindex="0" href="#" className="viewonlyHolder" 
          data-toggle="popover" 
          onClick={this.openViewonly} 
          data-trigger="focus" 
          data-content={this.props.payload.hint +" by "+this.props.payload.author}
          title={this.props.payload.type+" by "+this.props.payload.author}
    ><span className="author">{this.props.payload.author.substr(0,5)}</span>.</span>
    );
  }
});
module.exports=element_comment_tibetan;