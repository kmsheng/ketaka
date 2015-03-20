/** @jsx React.DOM */
var surfacetest=require("./surfacetest.jsx");
var React=require("react");

var devmenu = React.createClass({
  getInitialState: function() {
    return {bar: "world"};
  },
  closeImageViewer:function() {
    if (!this.new_win) return;
    this.new_win.close();
  },
  openImageViewer:function() {
    var gui = nodeRequire('nw.gui'); 
    this.new_win = gui.Window.get(
      window.open('imageviewer.html')
    ); 
    this.new_win.isFullscreen=true; 
  }, 
  openFiles:function() { //platform dependent

  },
  maintest:function() {
    var gui = nodeRequire('nw.gui');
    if (this.tester) this.tester.close(true);

    var tester = gui.Window.get(
      window.open('../test.html')
    );

    tester.on("loaded",function(){
      var res=tester.window.startdebugger(
        "workshop", { nw: gui.Window.get() , React:ksana.mainComponent});

      tester.moveTo(1920,-350);
      tester.resizeTo(550,950);
    })
    this.tester=tester;
    
  },
  surfacetest:function() {
    React.renderComponent(surfacetest(),document.getElementById("main"));
  },
  moveWindow:function() {
    //if (!this.new_win) return;
    var gui = nodeRequire('nw.gui');
    var win = gui.Window.get();
    //home
    win.moveTo(1920,-500);
     win.resizeTo(1080,500);
    //office
    win.moveTo(2460,-350)
    win.resizeTo(1380,900);
    //this.new_win.resizeTo();
    //var d=this.new_win.window.document;
    //d.getElementById("test").innerHTML="test"
  },
  render: function() {
    return (
      <div>
        <button onClick={this.moveWindow}>move window</button>
        <button onClick={this.surfacetest}>surface test</button>
        <button onClick={this.maintest}>main test</button>
      </div>
    );
  }
});
module.exports=devmenu;var  utf8_to_b64= function( str ) {
    return btoa(unescape(encodeURIComponent( str )));
};

var database_set = React.createClass({
  getInitialState:function() {
  	return {result:[],json:{test:"abc"} };
  },
  renderDownloadLink:function() {
    var filename="sample-"+(new Date().toLocaleString())+".json";
    var jsonstr=JSON.stringify(this.state.json,""," ");
    var dataurl="data:application/octet-stream;base64,"+utf8_to_b64(jsonstr);

    return <a className="btn btn-success" download={filename} href={dataurl}>Download database</a>
  },
  renderJson:function() {
    var jsonstr=JSON.stringify(this.state.json);
    return <div>{jsonstr}</div>
  },
  upload:function() {
    var reader = new FileReader();
    var that=this;
    reader.onload = function() {
      var json=JSON.parse(this.result);
      that.setState({json:json})
    }
    var file=this.refs.uploadfile.getDOMNode().files[0];
    reader.readAsText(file);
  },
  uploadfile:function(){
    this.refs.uploadfile.getDOMNode().click();
  },
  render: function() {
    return <div>
      {this.renderDownloadLink()}
      <input ref="uploadfile" type="file" onChange={this.upload} style={{display:"none"}}/>
      <button onClick={this.uploadfile} className="btn btn-success">Upload database</button>
      
    </div>
    //{this.renderJson()}
  }
});
module.exports=database_set;