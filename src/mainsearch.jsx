/** @jsx React.DOM */
var Searchbox=require("./searchbox.jsx"); 
var Queryinfo=require("./queryinfo.jsx"); 
var Resultlist=require("./resultlist.jsx");  
//var bootstrap=require("bootstrap");
var kde=require("ksana-database");
var kse=require("ksana-search");

var React=require("react");
//var Fileinstaller=Require("fileinstaller"); 
var mainsearch = React.createClass({ 
  getInitialState: function() {
    return {engine:null,Q:null,Q2:null,page:null,progress:1,wildcard:0,quota:0}; 
  },  
  componentWillMount:function() {
  },
  wildcardCount:function(Q) {
    var wildcard=0;
    if (!Q) return wildcard;
    for (var i=0;i<Q.terms.length;i++) {
      if (Q.terms[i].variants.length) {
        wildcard++;
        Q.wildcardterm=i;
      }
    }
    return wildcard;
  },
  nextsearchphrase:function(Q) {
    var newq="";
    Q.vidx=Q.vidx||0; 
    for (var i in Q.terms) {
      var T=Q.terms[i];
      if (T.variants.length) {
        newq+=T.variants[Q.vidx][0]+"་";
      } else {
        newq+=T.raw+"་";
      } 
    } 
    Q.vidx++;
    return newq;
  },  
  updateProgress:function(that) {
    var vidx=that.state.Q.vidx;
    var wt=that.state.Q.terms[that.state.Q.wildcardterm];
    var progress=vidx/wt.variants.length;
    //sort again
    that.setState({progress:progress});
  },
  findone:function(Q) {
    var that=this;
    var q=this.nextsearchphrase(Q);
    kse.search(this.state.engine,q,{nogroup:true},function(err,QQ){
      var w=Q.wildcardterm;
      var wt=Q.terms[w];
      var vidx=Q.vidx;
      var nowbambo = that.state.engine.activeFile;
      if(!nowbambo) nowbambo = that.props.bambos[4].caption+".xml";
      if(that.props.bambos.length > 4){
      var min = that.state.engine.getFileSegOffsets(that.state.engine.get(1).filenames.indexOf(nowbambo))[0];
      var max = that.state.engine.getFileSegOffsets(that.state.engine.get(1).filenames.indexOf(nowbambo))[that.state.engine.getFileSegOffsets(that.state.engine.get(1).filenames.indexOf(nowbambo)).length-1];
      var vcount =0;
      for(var i=0;i<QQ.rawresult.length;i++)
      {
        if(QQ.rawresult[i]>= min && QQ.rawresult[i]<= max) vcount++;
        else if(QQ.rawresult[i] > max) break;
      }
      wt.variants[vidx-1][1]=vcount; 
      }// update the variants hit
      else {
        wt.variants[vidx-1][1]=QQ.rawresult.length
      }
      if (vidx>=wt.variants.length) { //no more to do
        that.stopFiltering();
        wt.variants.sort(function(a,b){
          return b[1]-a[1];
        });        
        that.setState({progress:1});
      } else {
        if (!that.stop) setTimeout( that.findone.bind(that,Q),0);    
      }
    })
  },
  filter:function(q) {
     var opts={}; //raw search
     var that=this;
     this.stop=false;
     kse.search(this.state.engine,q,opts,function(err,Q){
        Q.vidx=0;
        that.setState({Q:Q});
        that.findone(Q);
        that.timer1=setInterval( function(){
          that.updateProgress(that);
        }, 200);
     });
  },
  onCloseButtonClick: function() {
     this.props.action('closeSearchPopup');
  },
  stopFiltering:function(){
    clearInterval(this.timer1);
    this.stop=true;
  },
  action:function() {
    if (!this.state.engine) kde.open(this.props.engine,function(err,engine){
        this.setState({engine:engine});
    },this);    
    var args = Array.prototype.slice.call(arguments);
    var type=args.shift();
    var now_folder = this.props.bambos[1].nowbambo;
    var folder_loc = this.state.engine.get(1).filenames.indexOf(now_folder);
    var searchtype = 0;var end = 100;
    var res=null, that=this;
    if (type==="search") { 
       var q=args[0];
       if(q.search('%') > -1) q = q.replace(/[ །།་]/g,"");
       if(this.props.bambos.length > 4) {searchtype=folder_loc;end=1;}
       var opts={range:{filestart:searchtype,maxfile:end,maxhit:1000}};
       this.stopFiltering();
       kse.search(this.state.engine,q,opts,function(err ,Q){
          that.state.engine.activeQuery=Q;
          var wc=that.wildcardCount(Q);
          if (wc==1)  that.setState({Q:Q, wildcard:wc});
          else  that.setState({Q2:Q});
       });
       if(q.search('%') > -1) this.filter(q);
    } else if (type=="tofindchange") {
      this.stopFiltering();
      kse.search(this.state.engine,args[0],{},function(err,Q){
        var wc=that.wildcardCount(Q);
        that.setState({wildcard:wc});
      });
    } else if (type=="gopage") { 
      var pageid=args[0], fileid=args[1],pagename=args[2];
      var fileNames=this.state.engine.get("filenames");
      this.props.action("openfile",this.state.engine.dbname,fileNames[fileid] ,pageid+1 );
      /*kse.highlightPage(this.state.engine,fileid,pageid,{fulltext:true,q:this.state.Q2.query},function(data){
        that.setState({page:data,pagename:pagename});
      });*/
    } else if (type=="filter") {
      var q=args[0];
      if(q.search('%') > -1) q = q.replace(/[ །།་]/g,"");
      this.stopFiltering();
      this.filter(q);
    }
    return res;
  },
  render: function() { 
    return ( 
      <div>
        <div className="row searcharea">
          <button className="close" type="button" onClick={this.onCloseButtonClick}>×</button>
          <div className="col-md-12"><Searchbox action={this.action} kw={this.props.keyword} progress={this.state.progress} wildcard={this.state.wildcard}/></div>
          <div className="col-md-3">
            <Queryinfo action={this.action} Q={this.state.Q} />
          </div>
          <div className="col-md-9">
            <Resultlist action={this.action} Q={this.state.Q2}  bambos={this.props.bambos}/>
          </div>
        </div>  
      </div>
    );
  }
});
module.exports=mainsearch;