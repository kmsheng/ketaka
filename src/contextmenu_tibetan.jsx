var React=require("react");
var contextmenu_tibetan = React.createClass({
  getInitialState: function() {
    return {selectedText:"",bar: "world"};
  },  
  onPopup:function(context) {
    this.setState(context);
  },  
  copy:function(e) {
    this.props.action("copy",this.state.text);
  },
  searchkeyword:function(e) {
    this.props.action("searchkeyword",this.state.text);
  },
  addSuggestion:function(e){
    this.props.action("addsuggestion");
  },
  markup:function(e) {
    var type=(typeof e =="string")?e:e.target.attributes["data-markup"].value;
    this.props.action("addmarkup",{type:type});
  },
  deleteText:function(e) {
    this.props.action("strikeout");
  },
  clearMarkup:function(e) { 
    var start=e.target.attributes["data-reactid"].value.search("lj");
    var filename = e.target.attributes["data-reactid"].value.substring(start,10+start);
    this.props.action("clearmarkup",filename);
  },
  onShowswitch:function() {
    if(this.props.len>1) return <a role="menuitem" tabIndex="-1" href="#">Suggest</a>
	else return <a role="menuitem" tabIndex="-1" href="#" onClick={this.addSuggestion}>Suggest</a>
  },
  render: function() {
    var disabled=(this.props.len>1)?"disabled":"";
    return ( 
    <div className="dropdown">
      <button className="btn dropdown-toggle sr-only" type="button" id="dropdownMenu1" data-toggle="dropdown">
        Dropdown
        <span className="caret"></span>
      </button>
      <ul className="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
        <li className={disabled}>{this.onShowswitch()}</li>
        <li><a role="menuitem" tabIndex="-1" href="#" onClick={this.markup} data-markup="comment">Comment</a></li>
        <li><a role="menuitem" tabIndex="-1" href="#" onClick={this.deleteText}>Delete</a></li>
        <li><a role="menuitem" tabIndex="-1" href="#" onClick={this.clearMarkup}>Clear Markup</a></li>
        <li className="divider"></li>
        <li><a role="menuitem" tabIndex="-1" href="#" onClick={this.searchkeyword}>Search</a></li>
      </ul>
    </div> 
    );
  }
});
module.exports=contextmenu_tibetan;