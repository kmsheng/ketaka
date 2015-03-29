var React=require("react");
var nav_tibetan = React.createClass({
  getInitialState: function() {
    return {pagename:this.pageName(),component:""};
  },
  pageName:function() {
    return  this.props.page?this.props.page.name:"";
  },
  setPageId:function() {
    var pagename=this.refs.pageid.getDOMNode().value;
    this.setState({pagename:pagename});
    this.props.action("gopage",pagename);
    this.pageidtimer=null;
  },
  EntersetPageId:function(e) {
	if (e.charCode==13) this.setPageId();
  
  },
  pageIdChange:function() {
    clearTimeout(this.pageidtimer);
    this.pageidtimer=setTimeout(this.setPageId.bind(this) ,5000);
  },
  nextPage:function() {
    this.props.action("next");
    this.scrolltoTop(); 
  },
  prevPage:function() {
    this.props.action("prev");
    this.scrolltoTop(); 
  },
  firstPage:function() {
    this.props.action("first");
    this.scrolltoTop(); 
  },
  lastPage:function() {
    this.props.action("last");
    this.scrolltoTop(); 
  },
  nextMistake:function(e) {
    var direction = e.target.id;
    this.props.action("nextmistake",direction);
  },
  componentDidUpdate:function() {
    if (this.refs&&this.refs.pageid) {
      this.refs.pageid.getDOMNode().value=this.pageName();
    }
  },
  handsavemarkup:function() {
    this.props.action("handsavemarkup");
  },
  handUpdate:function() {
    this.props.action("handUpdate");
  },
  preview:function() {
    this.props.action("preview");
  },
  endpreview:function() {
    this.props.action("endpreview");
  },
  previewmenu:function() {
    if (this.props.preview) {
      return <button className="btn btn-warning button_style" onClick={this.endpreview}>End Preview</button>
    } else {
      return <button className="btn btn-success button_style" onClick={this.preview}>Preview</button>
    }
  },
  scrolltoTop:function() {
    document.getElementById("inlinetext").scrollTop= 0;
  },
  imgerror:function() {
     this.getDOMNode().querySelector('img').src = 'images/sorry.jpg';
  },
  zoom:function(e) {
      for (var i = 0; i < this.state.component.length; i++){
        if(this.state.component[i].style.fontSize == "")
        {
          if(e.target.id == "zoomin") this.state.component[i].style.fontSize = 1+0.2+'em';
          else this.state.component[i].style.fontSize = 1-0.2+'em';
        }
        else 
        {
          if(e.target.id == "zoomin")this.state.component[i].style.fontSize = parseFloat(this.state.component[i].style.fontSize.replace("em",""))+0.2+"em";
          else if(e.target.id == "zoomout" && this.state.component[i].style.fontSize == "0.6em") return;
          else this.state.component[i].style.fontSize = parseFloat(this.state.component[i].style.fontSize.replace("em",""))-0.2+"em";      
        }
      }
  },
  getDocview_style:function()
  {
      var defaultValue = 1;
      var element = document.getElementsByTagName("div");
      var components = new Array();
      var count = 0;
      for(var i = 0; i < element.length; i++) {
            var attribute = element[i].getAttribute("class");
            if(attribute == "docview main-wrapper") {
              components[count] =element[i];count++;
            }
      }
      this.setState({component:components});
  },
  expandFileName1:function(src) {
    if (!src) return "images/nf.png";
    if(src =="1.1a" || src=="_") return "images/nf.png";
    if (src.substring(0,4)=="http") return src;
    var s=src.split('.');
    var folder=s[0];
    var filename=s[1];
    var ip = location.host;
    if(folder.length == 1) folder='00'+folder;
    else if(folder.length == 2) folder='0'+folder;
    folder=folder.substring(folder.length-4);
    if(filename.length == 2) filename='00'+filename;
    else if(filename.length == 3) filename='0'+filename;
    filename=filename.substring(filename.length-4);

    return "http://"+ip+"/kangyur_images/lijiang/"+folder+'/'+folder+'-'+filename+".jpg";
  }, 
  renderStatus:function() {
    if (!this.props.selecting)return;
    var out=[];
    out.push(<span key="s1" className="label label-default">{this.props.selecting.start}</span>);
    if (this.props.selecting.end!=this.props.selecting.start) {
      out.push(<span key="s2" className="label label-default">{this.props.selecting.end}</span>);
    }
      
    return out;      
  },
render: function() {
     if (!this.props.page) return <div></div>
    return (
      <div className="row" onLoad={this.getDocview_style}>
      <img ref="image" id="sourceimage" className="sourceimage" src={this.expandFileName1(this.props.page.name)} onError={this.imgerror}/>
        <div className="col-md-2 col-md-offset-1">
          <img src="images/small.png" id="zoomout" style={{height:"30px",width:"30px",marginRight:"10px"}} onClick={this.zoom}></img>
          <img src="images/large.png" id="zoomin" style={{height:"30px",width:"30px",marginRight:"10px"}} onClick={this.zoom}></img>
          <img src="images/jump_previous.png" id="previous" style={{height:"30px",width:"30px",marginRight:"10px"}} onClick={this.nextMistake}></img>
          <img src="images/jump_next.png" id="next" style={{height:"30px",width:"30px",marginRight:"10px"}} onClick={this.nextMistake}></img> 
         </div>  
        <div className="col-md-2 col-md-offset-1">
        <div className="input-group">
             <span className="input-group-btn">
              <img src="images/first.png" onClick={this.firstPage}></img>
              <img src="images/left.png" onClick={this.prevPage}></img>
             </span>
            <input id="pageid" ref="pageid" defaultValue={this.pageName()} onKeyPress={this.EntersetPageId} className="form-control"></input>
            <span className="input-group-btn">
              <img src="images/right.png" onClick={this.nextPage}></img>
              <img src="images/last.png" onClick={this.lastPage}></img>
            </span>
        </div>
      </div>
      <div className="col-md-4">
        {this.previewmenu()}
        <button className="btn btn-success button_style" onClick={this.handsavemarkup}>Save</button>
        <button className="btn btn-success button_style" onClick={this.handUpdate}>Refresh</button>
      </div>
      </div>
    );
  }
});

module.exports=nav_tibetan;