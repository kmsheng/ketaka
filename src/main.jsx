/** @jsx React.DOM */
//var bootstrap=require('./bootstrap');
var Tabui=require("./tabui.jsx"); 
var styles=require("./styles")[0].markups;
var Docview=require("./docview.jsx"); 
var imageview=require("./imageview.jsx");
var mainmenu=require("./mainmenu.jsx"); 
var devmenu=require("./devmenu.jsx"); 
var reference=require("./referenceview.jsx"); 
var projectlist=require("./projectlist.jsx"); 
var projectview=require("./projectview.jsx");
var filelist=require("./filelist.jsx");
var project=require("./project");
var About=require("./about.jsx");
var Searchmain=require("./mainsearch.jsx");
var userlogin=require("./userlogin.jsx"); 
var Buildindex=require("./buildindex.jsx");
var kde=require("ksana-database");
var kse=require("ksana-search");
var pouch=require("./persistentmarkup_pouchdb");
var bridge = require('./bridge.js');


//var passwords=require("./passwd");
var React=require("react"); 
//disable system right click menu
window.document.oncontextmenu = function(e){
    return false;
}
window.onbeforeunload = function(event){
        return console.trace("reload")
};
/*
var login=function(opts){
  opts=opts||{};
  var password=opts.password||opts.pw;
  var out={name:opts.name,error:"user not found"};
  for (var i=0;i<passwords.length;i++) {
    var u=passwords[i];
    if (u.name==opts.name) {
      if (u.pw!=password) {
        out.error="wrong password";
      } else {
        out=JSON.parse(JSON.stringify(u));
        delete out.pw;
        out.error="";
        return out;
      }
    }
  }
  return out;
}
*/
var main = React.createClass({ 
  searchtab:0,
  getProjects:function() {
    return this.state.projects?this.state.projects:[];
  },
  defaultMainTabs:function(){
    var tabs=[
      {"id":"tuser","caption":"","profile":this.user,"text":this.user.name||"Guest","content":userlogin,"active":true,
        "notclosable":true,"params":{"action":this.action,"user":this.user,"users":this.users,"getError":this.getError,"getpasswordError":this.getpasswordError}}
    ];
    tabs.updated=true;
    return tabs;
  },
  getError:function() {
    if(this.state.error == "Invalid Username") return this.state.error;
  },
  getpasswordError:function() {
    if(this.state.error == "Invalid Password") return this.state.error;
  },
  /*
  defaultAuxTabs:function(db){
    var auxs=[
      {"id":"about","caption":"About", "content":about,
      "active":true,"notclosable":true,"param":{"action":this.action,"user":this.user}}
      ];
    return auxs;
  },*/
  getInitialState: function() {
    try {
      //this.user=JSON.parse(localStorage.getItem("user"));      
    }  catch (e) {
      this.user={name:"",admin:false};
    }
    if (!this.user) this.user={name:"",admin:false};

    var tabs=this.defaultMainTabs();
    //var auxs=this.defaultAuxTabs();

    return {settings:null,tabs:tabs/*, auxs:auxs*/,pageid:1,error:"",db:null,projects:null,keyword:null, initPopover: false};
  },
  addProjectTab:function(projects) {
      var tabs=this.state.tabs;
      tabs.push({"id":"projects","pjname":"","nowbambo":"","profile":this.state.tabs[0].profile,"caption":"","content":projectlist,"notclosable":true,
          "params":{"action":this.action, "projects":this.getProjects}});
      tabs.updated=true;
      this.setState({projects:projects,tabs:tabs});
  }, 
  enumProjects:function() {
      //var projects=JSON.parse(localStorage.getItem("projects"));
      kde.enumKdb(function(files){
        var projects=files.map(function(f){
          var name=f.substr(0,f.length-4);
          return {name:name,shortname:name} 
        });
        this.addProjectTab(projects);  
      },this);      
  }, 
  componentDidMount:function(usage,quota) {  
    this.setState({dialog:false,quota:quota,usage:usage});
    this.enumProjects();
    this.makescrollable();
  },
  /*
  newsearchtab:function(proj) {
      var auxs=this.state.auxs;
      for (var i=0;i<auxs.length;i++) {
        if (auxs[i].dbid==proj.name) return;
      }

      auxs.push({"id":"searchtab"+(this.searchtab++),"caption":"Search "+proj.shortname, 
        "content":searchmain,"active":true,dbid:proj.shortname
        , "params":{"action":this.action, "project":proj, "db":proj.shortname,
                            }});

      this.setState({"layout":proj.tmpl.layout,"db":proj.shortname,"auxs":auxs});
  },
  */
  getProjectByName:function(projname) {
    var projects=this.state.projects.filter(function(p){return p.shortname==projname});
    return projects[0];
  },
  projecttab:function(name) {
    /*
    for (var i=0;i<this.state.auxs.length;i++) {
      var t=this.state.auxs[i];
      if (t.dbid==name && t.projectmain) return this.refs.auxtab;
    }*/
    for (var i=0;i<this.state.tabs.length;i++) {
      var t=this.state.tabs[i];
      if (t.dbid==name && t.projectmain) return this.refs.maintab;
    }

    return null;
  },
  openfile:function(engine,proj,filename,pageid,template,linktarget,linksource) {
      this.addTab();
      //var template= "docview_default"; //|| template || proj.tmpl.docview 
      //var docview=require("./"+template+".jsx");
      var docview=require("./docview_tibetan.jsx");
      var fileid = engine.get(1).filenames.indexOf(filename);
      var tab=this.projecttab(proj.shortname);
      var tabs = this.state.tabs;
      tabs[1].nowbambo = filename;  
      var obj={"id":"f_"+filename
        ,"caption":"　"+proj.shortname+"/"+filename.replace(".xml","　　")
        ,"content":docview,"active":true
        ,"dbid":proj.shortname
        ,"fid":fileid
        ,"params":{"action":this.action, filename:filename, project:proj
                          ,user:this.user, pageid: pageid, kde:engine ,linktarget:linktarget,linksource:linksource}};
        tab.newTab(obj);  
        this.setState({tabs:tabs});   
   },
   addTab:function() {
       var tab=this.refs.maintab; 
       var caption =<span>&nbsp;&nbsp;&nbsp;+&nbsp;&nbsp;&nbsp;</span>;
       var obj={"id":"addbutton","caption":caption,"content":userlogin,"active":true,
        "notclosable":true,"params":{"action":this.action,"user":this.user,"getError":this.getError,"getpassowrdError":this.getpassowrdError}};
        tab.newTab(obj);    
   },
   openlink:function(dbid,thelink) {
     var  proj=this.getProjectByName(dbid);
     if (this.projecttab(dbid)) {
       this.action("openfile",proj,thelink.file,thelink.pageid,null,thelink.linktarget,thelink.linksource);
     } /*else {
       this.action("openproject",proj,thelink,this.refs.auxtab); 
     }*/
   }, 
   excerpt2link:function(engine,excerpts,phraselen) {
     var out=[];
     var filenames=engine.get("fileNames");
     var files=engine.get("files");
     excerpts.map(function(e){
        var file=files[e.file];
        var start=e.hits[0][0]-e.start+phraselen*2; //don't know why???
        var link={payload:{pagename:e.pagename,start:start,len:phraselen,i:e.page+1,
                      db:"ccc",file: filenames[e.file],text:e.text}};
        out.push(link)
     });
     return out;
  },
  action:function() {
    var args = Array.prototype.slice.call(arguments);
    var type=args.shift();

    if (type==="setdoc") { 
      this.setState({doc:args[0]});
    }
    else if ('clearActiveQuery' === type) {
      bridge.broadcast('clearDocviewActiveHits');
    } else if (type=="openproject") { 
      var proj=args[0]; 
      var autoopen=args[1];
      var tab=args[2]||this.refs.maintab;
      var that=this; 
      var tabs = this.state.tabs;
      tabs[1].pjname = proj.name;   
      kde.open(proj.name,function(err,engine){
        var meta=engine.get("meta");
        proj.template=meta.template;
        project.openProject(proj);
        var obj={"id":"p_newtab","caption":"",dbid:proj.name,
          "content":projectview,"active":true, "projectmain":true,"notclosable":true,
          "params":{"action":that.action, "project":proj, "autoopen":autoopen, "kde":engine }};
        //that.newsearchtab(proj);
        tab.newTab(obj);
        this.setState({tabs:tabs}); 
      },this);
    } else if (type=="newquery") {
      this.forceUpdate();
    } else if (type=="openfile") {
      var proj=args[0];    
      var filename=args[1];
      var pageid=args[2] ||"2";  
      var template=args[3];
      if (typeof proj=="string") {
        proj=this.getProjectByName(proj);
      } 
      kde.open(proj.shortname,function(err,engine){
        this.openfile(engine,proj,filename,pageid,template);  
      },this);
    } else if (type=="selectfile" || type=="selectfolder") {
      //this.state.auxs.updated=true;
      this.forceUpdate();
    } else if (type=="openimage") {
      /*
      var file=args[0];
      var pagename=args[1];
      var proj=args[2];
      var obj={"id":"sourceimage"
        ,"caption":'source'
        ,"content":imageview
        ,"dbid":proj.shortname
        ,"active":false
        ,"params":
          {"action":this.action, src:file
            ,project:proj,user:this.user,pagename:pagename}};
        //this.refs.auxtab.newTab(obj);
        */
    } else if (type=="login") {
      var status = args[1];
      //var res={name:args[0].name,pw:args[3]};
      if(status == true) {
        localStorage.setItem("user",JSON.stringify(args[0]));
        this.user = args[0];
        this.users = args[2];
        this.setState({error:"",tabs:this.defaultMainTabs()}); 
        this.enumProjects(this.state.settings);
        this.startforwork();
      }
      else if(status == "failed") {
        this.setState({error:"Invalid Password",tabs:this.defaultMainTabs()})
      }
      else {
        this.setState({error:"Invalid Username",tabs:this.defaultMainTabs()});
      } 
    } else if (type=="logout") {
      localStorage.setItem("user","{}");
      this.user=JSON.parse(localStorage.getItem("user")); 
      this.setState({tabs:this.defaultMainTabs()/*,auxs:this.defaultAuxTabs()*/});
    } else if (type=="start") {
        var that = this;
        var ip = location.host.split(":")[0];
        var db =  new PouchDB('http://'+ip+':5984/project');
        pouch.readallfrompouch(db,this.gostart,0);
    } else if (type=="index") {
      this.refs.maintab.goTab("tuser");
    } else if (type=="buildindex") {
      this.refs.builddialog.start(args[0].shortname);
    } else if (type=="searchkeyword") {
      kde.open(args[1],function(engine){
      engine.activeTofind=args[0];
      this.setState({keyword:args[0]});
      if(this.state.tabs[0].search_pop == false)this.pop_search(args[0]);
          else {this.search(args[0]);}
          this.forceUpdate(); 
      },this);
    } else if (type=="searchquote") {
      var quote=args[0],cb=args[1];
      var that=this;
      kde.open("ccc",function(engine){
        kse.search(engine,quote.text,{range:{start:0}},function(data){
          if (data.excerpt && data.excerpt.length) {
            cb( that.excerpt2link(engine,data.excerpt,quote.text.length),quote);
          } else cb([]);
        });
      });

    } else if (type=="closedb") {
      var dbid=args[0];
      kde.close(dbid);
    } else if (type=="openlink") {
      var payload=args[0];
      var thelink={file:payload.file,pageid:payload.i,
                         linktarget:payload, linksource:args[1]};
      this.openlink(payload.db,thelink);
    } else if (type=="makelink") {
      var targetpage=args[0];
      var linktarget=args[1];
      var linksource=args[2]; 
      sourcedb=linksource.db; 
      var payload=
      {"type":"linkby","db":linksource.db,"file":linksource.file
      ,"start":linksource.start,"len":linksource.len,"i":linksource.pageid
      ,"pagename":linksource.page.name,
      "author":this.user.name};

      targetpage.addMarkup(linktarget.start, linktarget.len, payload);

      var payload2={
        "type":"linkto","db":linktarget.db,"file":linktarget.file
        ,"start":linktarget.start,"len":linktarget.len,"i":linktarget.i
        ,"author":this.user.name
      }

      linksource.page.addMarkup(linksource.start,linksource.len, payload2);

      //save to
      //console.log(args[0],args[1],args[2]);
      //save link
    } else if (type=="myalert") {
        var type = args[0];
        if(type == 0) {
           $(".alert_ok").removeClass("in").show();
           $(".alert_ok").delay(200).addClass("in").fadeOut(700);
         }
        else {
           $(".alert_err").removeClass("in").show();
           //$(".alert_err").delay(200).addClass("in").fadeOut(3000);
        }
    } else if (type=="myinput") {
        var status = args[0];
        var id = args[1];
        switch(status) {
          case 0:
             document.getElementById(id+"_form").className = "form-group has-error has-feedback";
             document.getElementById(id+"_icon").className = "glyphicon glyphicon-remove form-control-feedback";
          break;
          case 1:
             document.getElementById(id+"_form").className = "form-group has-success has-feedback";
             document.getElementById(id+"_icon").className = "glyphicon glyphicon-ok form-control-feedback";
          break;
          case 2:
             document.getElementById(id+"_form").className = "form-group has-warning has-feedback";
             document.getElementById(id+"_icon").className = "glyphicon glyphicon-warning-sign form-control-feedback";
          break;
        }
    } else if (type=="change_mainphoto") {
           var that = this;
           that.getDOMNode().querySelector('#tpic').src = "photo/"+this.state.tabs[0].text+".jpg?"+ new Date().getTime(); 
    }
  },
  page:function() {
    return this.state.doc.getPage(this.state.pageid);
  },
  /*
  newtab:function() {
    this.state.tabs.push( {"id":"t5","caption":"About","content":about,"notclosable":true})
    this.forceUpdate();
  },*/
   //<button onClick={this.newtab}>newtab</button>
  makescrollable:function() {
    /*
    var f=this.refs.maintab.getDOMNode();
    //var aux=this.refs.auxtab.getDOMNode();
    //f.style.height='50%';
    var contenttop=f.querySelector(".tab-content").offsetTop;
    if (this.state.layout=="vertical") {
      f.style.width='50%';
      f.style.float='left';
      f.style.height=document.body.offsetHeight-contenttop;
      //aux.style.float='right';
      //aux.style.width='50%';
      //aux.style.height=document.body.offsetHeight-contenttop;
    } else {
      f.style.width='100%';
      f.style.float='none';
      //aux.style.width='100%';
      //aux.style.float='none';
      f.style.height='47%';
      //aux.style.height='47%';
    }
    */
  },
  gostart:function() {
      var lastfile=localStorage.getItem(this.user.name+".lastfile");
      lastfile={file:"",project:""};
      this.refs.maintab.goTab("projects",lastfile);  
  },
  startforwork:function() {
    this.action("start");
  },
  logoutwork:function() {
    this.action("logout");
  },
  componentDidUpdate:function() {
    this.makescrollable();
  },
  pop_search:function() {
    this.search(this.state.keyword);
  },
  user_profile:function() {
    this.action("index");
  },
  search:function(keyword) {
    var self = this;
    if(this.state.tabs[1].pjname == "") {this.action("myalert",1);;return;}

    var node=$(this.refs.btn1.getDOMNode());

    if (! self.state.initPopover) {
      node.popover({html:true});
      node.data("content", <Searchmain/> );
      node.data("action", this.action)
      self.setState({initPopover: true});
    }
    node.on('hidden.bs.popover', function() {
      self.action('clearActiveQuery');
    });

    node.popover('show');

    var $popcontent=node.siblings(".popover").find(".popover-content")
    React.renderComponent(<Searchmain action={this.action} keyword={keyword} bambos={this.state.tabs} db={this.state.tabs[1].pjname} engine={this.state.tabs[1].pjname}/>,$popcontent[0]);
  },
  pop_profile:function() {
    var node=$(this.refs.btn2.getDOMNode());
    node.popover({html:true});
    node.data("content", <About/> );
    node.data("action", this.action)
    node.popover('show');
    var $popcontent=node.siblings(".popover").find(".popover-content")
    React.renderComponent(<About action={this.action} db={this.state.projects[0].shortname} tab={this.state.tabs} project={this.state.projects[0]} />,$popcontent[0]);
  },
  setting_button:function() {
    if(this.state.tabs[0].profile.su == true) return <span><img src="images/setting.png" className="top_icon" onClick={this.user_profile}></img></span>
  },
  barphoto_error:function() {
     this.getDOMNode().querySelector('#tpic').src = 'images/photo.png';
  },
  rendersignin:function(){
    $('html').on('click', function(e) {
    if ((typeof $(e.target).data('original-title') == 'undefined'|| (typeof $(e.target).data('original-title') == 'string')) &&
    !$(e.target).parents().is('.popover.in')) {
    $('[data-original-title]').popover('destroy');
    }
  });
  return <div>
      <div className="container-fluid headerbar">
      <div className="alert_err alert-danger" style={{width:window.innerWidth*0.97}}>
            <strong>You need to open a project!</strong>
      </div>
      <div className="col-md-8">
      <img src="images/s_logo.png" className="top_icon" onClick={this.startforwork}></img>
      <img src="images/search.png" className="top_icon" ref="btn1" onClick={this.pop_search} data-toggle="popover1" title="Search keyword" data-placement="bottom-right"></img>
      {this.setting_button()}</div>
      <div className="col-md-4">
      <img src={"photo/"+this.state.tabs[0].text+".jpg?"+ new Date().getTime()} id="tpic"className="pull-right top_icon" ref="btn2" data-toggle="popover2" title="Open profile" data-placement="bottom-left" onClick={this.pop_profile} onError={this.barphoto_error}></img>
      </div>
    </div>
    <div className="maintab"><Tabui ref="maintab" lastfile={this.state.lastfile} tabs={this.state.tabs}/></div>
    </div>
  },
  render:function() {
      if (this.state.tabs[0].text != "Guest") {
      return this.rendersignin();
      }
      return <div className="default_tab">
        <Tabui ref="maintab" lastfile={this.state.lastfile} tabs={this.state.tabs} />
      </div>
  }
});
module.exports=main;