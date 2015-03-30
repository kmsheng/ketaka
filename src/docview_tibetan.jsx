var React=require("react");
var styles=require("./styles")[0].markups;
var Docview=require("./docview.jsx");
var imageview=require("./imageview.jsx");
var D=require("./document");
var M=require("./markup");
var excerpt=require("ksana-search").excerpt;
var isSkip=require("ksana-analyzer").getAPI("tibetan1").isSkip;
var legacy2014=require("./legacy2014");
var pouch=require("./persistentmarkup_pouchdb");
var Nav_tibetan=require("./nav_tibetan.jsx");

var Docview_tibetan = React.createClass({
  getInitialState: function() {
    //var pageid=parseInt(this.props.pageid||localStorage.getItem(this.storekey())) || 1;
    var pageid=1;
    return {doc:null,pageid:pageid};
  },
  shouldComponentUpdate:function(nextProps,nextState) {
      var samehit=JSON.stringify(this.state.activeHits)==JSON.stringify(nextState.activeHits);
      var r=true;
      if (nextProps.pageid!=this.props.pageid) {
        nextState.pageid=nextProps.pageid;
      } 
      else if 
         (this.state.doc==nextState.doc && this.state.pageid==nextState.pageid
        &&this.state.selecting==nextState.selecting
        &&samehit
        &&this.state.preview==nextState.preview) return false;  //this is a work-around ... children under this component is causing recursive update

      if (this.props.kde.activeQuery&&samehit) {
        var that=this;
        setTimeout(function(){
          that.setState( {activeHits: that.getActiveHits()} );
        },100)
      }

      return r;
  },
  storekey:function() {
    return this.props.project.shortname+'.pageid';
  },
  saveMarkup:function() {
        var doc=this.state.doc;
    if (!doc || !doc.dirty) return;
    var filename=this.state.doc.meta.filename; 
    var username=this.props.user.name;
    var markups=this.page().filterMarkup(function(m){return m.payload.author==username});
    if(this.props.user.admin == true)  markups = this.change_suggests(markups,0);
    var dbid=this.props.kde.dbname;
    this.saveMarkuptoPouchdb(filename,markups);
    /*
    this.$ksana("saveMarkup",{dbid:dbid,markups:markups,filename:filename,i:this.state.pageid } ,function(data){
      doc.markClean();
    }); 
  */
  },
  saveMarkuptoPouchdb:function(filename,markups)
    { 
      var dbname=filename.replace(".xml","");
      var ip = location.host.split(":")[0];
      dbname=this.props.project.name+dbname.substring(4,dbname.length);
      var db = new PouchDB('http://'+ip+':5984/'+dbname);
      if (markups.length == 0)
      {
         pouch.readallfrompouch(db,this.showmessage,1);
      }
      else if(markups.length != 0){
      for(var i=0;i<markups.length;i++)
      {
        markups[i]._id=dbname+"_"+markups[i].payload.author+"_"+this.state.pageid+"_"+markups[i].start;
        markups[i].pageid=this.state.pageid;
        markups[i]._rev = markups[i].payload._rev;
      }
      pouch.savealltopouch(db,markups,this.showmessage);
    }
  },
   showmessage:function(err) {
      if(this.state.handsavestate == true && !err) {
                this.props.action("myalert",0);
                this.getMarkups();
                this.state.handsavestate = false;
      }
      else if(this.state.handsavestate == true && err )
      {
                this.props.action("myalert",1);
                this.state.handsavestate = false;
      }
  },
  change_suggests:function(markups,type) {
    var length = markups.length;
	var final_markups = [];
	if (type == 0) final_markups = markups; 
    if(length > 0 && this.props.user.admin == true)
    {
      for(var i=0;i<length;i++)
      {
        var suggest_markups=this.page().filterMarkup(function(m){return m.start==markups[i].start});
        for(var j=0;j<suggest_markups.length;j++)
        {
		  if(suggest_markups[j].payload.state != "" && type == 1) {
		     suggest_markups[j].payload.state = "";
			 final_markups[final_markups.length]= suggest_markups[j];
		  }
          else if(suggest_markups[j].payload.author == markups[i].payload.contributor) {
            suggest_markups[j].payload.state = "approve";
			final_markups[final_markups.length]= suggest_markups[j];
          }
          else if(suggest_markups[j].payload.type == "suggest" && suggest_markups[j].payload.author != this.props.user.name) {
            suggest_markups[j].payload.state = "reject";
			final_markups[final_markups.length]= suggest_markups[j];
          } 
          else if(suggest_markups[j].payload.type == "suggest")
          {
            suggest_markups[j].payload.state = "";
			final_markups[final_markups.length]= suggest_markups[j];
          }
        }
      }
	  if(final_markups == "") final_markups = markups;
    }
    return final_markups;
  },
  getActiveHits:function() { // get hits in this page and send to docsurface 
    if (!this.props.kde.activeQuery) return [];
    //var po=this.props.kde.segOffset(this.getPageName());
    var nfile=this.props.kde.findFile(this.props.filename);
    var segoffsets=this.props.kde.getFileSegOffsets(nfile);

    var start=segoffsets[this.state.pageid-2];
    var end=segoffsets[this.state.pageid-1];
    var Q=this.props.kde.activeQuery;
    var relative_hits=[];
    var absolute_hits=excerpt.hitInRange(Q,start,end); //vpos, phrase_width, phrase_id
    var relative_hits=absolute_hits.map(function(h){  return [ h[0]-start,h[1],h[2]]; });

    return relative_hits;
  },
  action:function(type) {
    var args = Array.prototype.slice.call(arguments);
    var type=args.shift();
    var save=false;

    var pageid=this.state.pageid;
    if (type=="next") {
      if (pageid+1<this.state.doc.pageCount) this.setState({pageid:pageid+1});
      save=true;
    } else if (type=="prev") {
      if (pageid>1) this.setState({pageid:pageid-1});
      save=true;
    } else if (type=="first") {
      save=true;
      this.setState({pageid:1});
    } else if (type=="last") {
      this.setState({pageid:this.state.doc.pageCount-1});
      save=true;
    } else if (type=="gopage") {
      var page=this.state.doc.pageByName(args[0])
      if (page) {
        this.setState({pageid:page.id});
        save=true;
        //this.forceUpdate();
      }
    } else if (type=="nextpage") {
      var page=this.state.pageid;
      var state = args[0];
      if (page < this.state.doc.pageCount && state == "null") {
        this.setState({pageid:page+1});
        save=true;
      }
      else if (page > 0 && state == 0)
      {
        this.setState({pageid:page-1});
        save=true;
      }
    }else if (type=="markupupdate") {
      this.state.doc.markDirty();
    } else if (type=="addmarkup") {
      console.trace();
      console.error("cannot call addmarkup here")      
    } else if (type=="removemarkup") {
     var markup=args[0];
      var dbname=this.props.filename.replace(".xml","");
      dbname=this.props.project.name+dbname.substring(4,dbname.length);
      var markups = [markup];
      markups = this.change_suggests(markups,1);
      this.saveMarkuptoPouchdb(this.props.filename,markups);
      this.page().clearMarkups(markup.start,markup.len,this.props.user.name,dbname);
      //this.cancel_markup(markup.payload.author,markup.start,dbname);
      this.forceUpdate();
    } else if (type=="dismissmarkup") { 
      this.forceUpdate(); 
    }else if (type=="prevmistake") {
      this.refs.docview.goPrevMistake();
    }  else if (type=="nextmistake") {
    //this.refs.docview.goNextMistake();
    var arr = this.watch_suggest();
    //if(this.props.user.admin == true)
    //{
	  var type ={start:0,len:0};
      if(args[0] == "next" && arr[0].indexOf(this.state.pageid) != -1)  type =  this.refs.docview.goNextMistake();
      else if(args[0] == "previous" && arr[0].indexOf(this.state.pageid) != -1) type =  this.refs.docview.goPrevMistake();
      if(this.props.user.admin == true && document.getElementById("applychange")) document.getElementById("applychange").getElementsByTagName("input")[1].focus();
      //else if(this.props.user.admin ==false && document.getElementById("suggest_tibetan"))document.getElementById("suggest_tibetan").getElementsByTagName("input")[1].focus();
      if(arr[0].length) {
	  if(type.start==0 && type.len == 0 && !(arr[0][0] == pageid && args[0] == "previous") && type.start==0 && !(arr[0][arr[0].length-1] == pageid && args[0] == "next"))
      {
        var nextstate,value = this.find_otherpage(args[0],this.state.pageid,arr,this.state.doc);
        if(value)
        {
		  save =true;
          nextstate = value[1];
          this.setState({pageid:value[0],selstart:nextstate.start,sellength:nextstate.len,newMarkupAt:nextstate.start});
          var type =  this.refs.docview.goNextPageMistake(nextstate.start,nextstate.len);
        } 
	   }
      }
    //}
    //else return;
    } else if (type=="preview") {
      this.setState({preview:true});
    } else if (type=="endpreview") {
      this.setState({preview:false});
    } else if (type=="makingselection") {
      this.setState({selecting: {start:args[0],end: args[1]}});
    } else if (type=="searchkeyword") {
      this.props.action("searchkeyword",args[0],this.props.kde.dbname);
    } else if (type=="linkby") {
      var selstart=args[0],len=args[1],cb=args[2];
      //this.props.kde.findLinkBy(this.page(),selstart,len,cb);
    } else if (type=="linkto") {
      //find surrounding text
      //do fuzzy search
    } else if (type=="handsavemarkup") {
      this.state.handsavestate = true;
      this.saveMarkup();
    } else if (type=="handUpdate") {
      this.getMarkups();
    } else {
      return this.props.action.apply(this,arguments);
    }

    if (save) 
      {
        this.saveMarkup();
        this.getMarkups();
      }
  }, 
  loadDocument:function(fromserver) {
    return D.createDocument(fromserver.kd,fromserver.kdm);
  }, 
  componentDidMount:function() {
      this.getMarkups();
  }, 
  cancel_markup:function(name,start,dbname)
  {
      var ip = location.host.split(":")[0];
      //var dbname=this.props.filename.replace(".xml","");
      //dbname=this.props.project.name+dbname.substring(4,dbname.length);
      var db = new PouchDB('http://'+ip+':5984/'+dbname);
      var id = dbname+"_"+name+"_"+this.state.pageid+"_"+start;
      pouch.removetopouch(db,id);
  },
  getMarkups:function()
  {
       var fn=this.props.filename;
       var dbname=fn.replace(".xml","");
       var ip = location.host.split(":")[0];
       dbname=this.props.project.name+dbname.substring(4,dbname.length);
       var db = new PouchDB('http://'+ip+':5984/'+dbname);
       var pagecount=-this.props.kde.pageCount;
       var mydb = [];
       pouch.readallfrompouch(db,this.getMarkupsformpouch,0);    
      //persistentmarkup.loadMarkup(fn,-doc.pageCount,function(markups){
      //  doc.addMarkups(markups);
      //  that.setState({doc:doc,activeHits:that.getActiveHits()});  
      //});
      //if(mydb == ""){ db.destroy(function(err, info) { });}
      //if (that.props.tab ) that.props.tab.instance=that; // for tabui 
      /*
      that.$ksana("loadDocumentJSON",{project:that.props.project,file:that.props.filename}).done(function(data){
        doc.addMarkups(data.kdm);
        doc.meta.filename=this.props.filename;
        that.setState({doc:doc,activeHits:that.getActiveHits()});
      });
    */
    /*
    this.$ksana("loadDocumentJSON",{project:this.props.project,file:this.props.filename}).done(function(data){
      var doc=this.loadDocument(data);
      doc.meta.filename=this.props.filename;
      this.setState({doc:doc});
    });*/
    if (this.props.tab ) this.props.tab.instance=this; // for tabui 
  },
  getMarkupsformpouch:function(res)
  {
    var that = this;
    var fn = this.props.filename;
    if(res!= null ) mydb = res.rows;
    legacy2014.getDocument.call(this.props.kde,fn,function(doc){ 
        doc.meta.filename=fn;
        doc.addMarkups(mydb);
        that.setState({doc:doc,activeHits:that.getActiveHits()});
    });
  },
  watch_suggest:function()
  {
    var myarr = [[],[]];
      for(var i =0;i<this.state.doc.pageCount;i++)
      {
          var suggestarr =[],revisionarr = [];
          for(var j=0;j<this.state.doc.getPage(i).__markups__().length;j++)
          {    
              var markup = this.state.doc.getPage(i).__markups__()[j];
              if(this.props.user.admin == true)
              {
                if(markup.payload.type=="suggest" && markup.payload.author != this.props.user.name) suggestarr.push(markup.start);
                if(markup.payload.type=="revision" && markup.payload.author == this.props.user.name) revisionarr.push(markup.start);
              }
              else 
              {
                if(markup.payload.type=="suggest" && markup.payload.author == this.props.user.name) suggestarr.push(markup.start);
              }
          }
          var result = $(suggestarr).not(revisionarr).get();
          if(result != "" ) {
            myarr[0].push(i);
            myarr[1].push(result.sort());
          }
      }
      return myarr;
  },
  find_otherpage:function(direction,pid,arr,data)
  {
	  if(arr[0] == "") return null;
      var revarr = [],temp = "",newpage;
	  if(direction == "previous") for(var i=arr[0].length;i>0;i--) {if(arr[0][i-1] < pid) {newpage = i-1;break;}}
	  else if(direction == "next") for(var i=0;i<arr[0].length;i++) {if(arr[0][i] > pid) {newpage = i;break;}}
	  if(newpage == null) return null; 
      var markups = data.getPage(arr[0][newpage]).__markups__();
      for(var i=0;i<markups.length;i++)
      {
        if(direction == "next" && markups[i].start == arr[1][newpage].sort(function(a,b){return a - b})[0] ) temp = markups[i];
        else if(direction == "previous" && markups[i].start == arr[1][newpage].sort(function(a,b){return a - b})[arr[1][newpage].length-1]) temp = markups[i];
      }
      return [arr[0][newpage],temp];
  },
  page:function() {
    if (!this.state.doc) return null;
    var page=this.state.doc.getPage(this.state.pageid);
    var user=this.props.user.name;
    var admin_viewable=this.props.project.tmpl.admin_viewable_tags || [];
    if (this.state.preview) {
      var suggestions=page.filterMarkup(function(m){
        var p=m.payload;
        return (p.author==user || admin_viewable.indexOf(p.type)>-1);
      });
      return page.preview({suggestions:suggestions});
    } else {
      return page;
    }
  },
  getPageName:function() {
    var n=this.page();
    if (!n)return ""
    return n.name;
  },
  /*
  imagefilename:function() {
    var pagename=this.getPageName();
    if (!this.props.project.setting) return pagename;
    return this.props.project.setting.getImage(pagename);
  },*/
  imagefilename:function() {
    return this.getPageName();
  },
  componentDidUpdate:function() {
    this.props.action("openimage",this.imagefilename(),this.getPageName(),this.props.project);
  },
  componentWillUnmount:function() {
    var today = new Date();
    var lastfile={project:this.props.project.shortname,
      file:this.props.filename,time:today};
    localStorage.setItem(this.props.user.name+".lastfile",JSON.stringify(lastfile));
    this.saveMarkup();
  },
  nav:function() {
    var params={ref:"navigator" ,user:this.props.user, preview:this.state.preview,
      page:this.page(), action:this.action,selecting:this.state.selecting};

      return React.createElement(Nav_tibetan,params);
      //return Require(this.props.project.tmpl.navigator)(params);
  },
  getPadding:function() {
    var bodywidth = document.body.offsetWidth;
    var imageheight = 307*(document.body.offsetWidth/1280)+30;
    return imageheight;
  },
  getAlert:function() {
    return  (<div><div className="alert_ok alert-success" style={{width:window.innerWidth*0.95}}>
            <strong>Saved successfully!</strong>
            </div><div className="alert_err alert-danger" style={{width:window.innerWidth*0.95}}>
            <strong>Saved failed!</strong>
            </div></div>);
  },
  render: function() {
    localStorage.setItem(this.storekey(),this.state.pageid);
    if (!this.state.doc) return <span></span>
    return ( 
      <div>
      <div className="docview_tibetan" style={{marginLeft:"20px",height:document.body.offsetHeight-68+"px"}}>
        <div>{this.getAlert()}</div>
        <div>{this.nav()}</div>
        <div id="inlinetext" style={{height:document.body.offsetHeight-(document.body.offsetWidth -20)/4.17-110+"px",overflowY:"scroll",overflowX:"hidden"}}>
        <Docview ref="docview"
            page={this.page()}
            pageid={this.state.pageid}
            user={this.props.user}
            dbname={this.props.kde.dbname}
            template={this.props.project.tmpl}
            customfunc={this.props.kde.customfunc}
            styles={styles}
            isSkip={isSkip}
            hits={this.state.activeHits}
            autoselect={this.props.selection}
            action={this.action}
          ></Docview>
          </div>
      </div>
      </div>
    );
  }
});
module.exports=Docview_tibetan;