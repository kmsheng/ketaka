var pouch=require("./persistentmarkup_pouchdb");
var React=require("react");
var projectlist = React.createClass({
  getInitialState: function() {
    return {bar: "world",hovered:-1,selected:-1,rev:"",ce:[],pr:[],cearr:[],prarr:[],projects:[],proj:false,first:true,edit:false,add:false,authority:false};
  },
  componentDidMount:function() {
    if (this.props.tab ) this.props.tab.instance=this; // for tabui 
  },
  selectproject:function(e) {
    if (this.state.edit == true) return;
    else if (!e.target.parentElement.attributes['data-i']) return;
    var i=parseInt(e.target.parentElement.attributes['data-i'].value);
    this.check_user(e.target.parentElement.id,i);
    this.setState({selected:i,proj:e.target.parentElement.id});
  },
  hoverProject:function(e) {
    if (e.target.parentElement.nodeName!='TR') return;
    var hovered=e.target.parentElement.attributes['data-i'].value;
    if (this.state.hovered==hovered) return;
    this.setState({hovered:hovered});
  },
  renderProject:function(p,i) {
    var d=p.lastModified;
    var cls=(i==this.state.selected)?"success":"";
   // var formatted=d.getDay()+'/'+d.getMonth()+'/'+d.getFullYear();
    return (<tr key={'p'+i} data-i={i} className={cls} id={p.shortname} 
     onClick={this.selectproject}
     onDoubleClick={this.openproject}
     onMouseOver={this.hoverProject}>
      <td>{p.newname}</td>
    </tr>);
//<button onClick={this.buildindex} className="btn btn-warning">Build Index</button>
  },
  sortHeader:function(e) {
    var field=e.target.attributes['data-field'];
    field=field?field.value: e.target.innerText;
    this.state.projects.sort(function(a,b){
      if (a[field]==b[field]) return 0;
      if (a[field]>b[field]) return 1;
      else return -1
    })
    this.forceUpdate();
  },
  openproject:function() {
    if (this.state.edit == true) return;
    if(this.state.edit == true) {this.canceledit();}
    var p=this.state.projects[this.state.hovered];
    if (!p || this.state.authority == false) return;
    this.props.action("openproject",p);
    //open recently edited file automatically
  },
  onShow:function(params) {
    if (!params || !this.state.projects) return;
    var match=this.state.projects.filter( function(p) {return p.shortname==params.project; });
    if(match.length) this.props.action("openproject",match[0],params);
  },
  addproject:function() {
    this.setState({add:true});
    this.editproject();
  },
  editproject:function() {
    var ip = location.host.split(":")[0];
    var db = new PouchDB('http://'+ip+':5984/account');
    pouch.readallfrompouch(db,this.getAllusers,0);
  },
  getAllusers:function(res) {
    var temp_ce=[],temp_pr=[];
    for(var i=0;i<res.rows.length;i++)
         {
            if(res.rows[i].doc.admin == true && res.rows[i].doc.su == false) temp_ce.push(res.rows[i].doc._id);
            else if (res.rows[i].doc.admin == false && res.rows[i].doc.su == false) temp_pr.push(res.rows[i].doc._id);
         }
        if(this.state.add == false) this.setState({edit:true,ce:temp_ce,pr:temp_pr});
        else this.setState({edit:true,ce:temp_ce,pr:temp_pr,cearr:[],prarr:[]});
  },
  canceledit:function() {
    if(this.state.add == true) {
      this.check_user(this.state.proj,this.state.selected);
      this.setState({edit:false,add:false});
    }
    else this.setState({edit:false,add:false});
  },
  confirm:function(){
     var project_info = this.state.projects;
     project_info[0].ce = $('.btn-group2 > .btn.active').text();
     project_info[0].pr = $('.btn-group1 > .btn.active').text();
     project_info[0].desc = document.getElementById('desc').value;
     var chiefeditor = this.tomyString(this.tomyArray(project_info[0].ce,"  "));
     var proofreader = this.tomyString(this.tomyArray(project_info[0].pr,"  "));
     if(this.state.add == true) this.addnewproject(chiefeditor,proofreader,project_info);
     else if(this.state.add == false) this.saveproject(chiefeditor,proofreader,project_info);
  },
  check_photo:function(e) {
     var img = e.target;
     img.src= 'images/photo.png';
  },
  saveproject:function(ce,pr,pj) {
    if(ce[1].length == 0 || pr[1].length == 0) {that.props.action("myalert",1);return;}
    var that = this;
    var ip = location.host.split(":")[0];
    var db = new PouchDB('http://'+ip+':5984/project');
    var des = document.getElementById('desc').value;
    var name = document.getElementById('name').value;
    var projects = this.state.projects;
    projects[that.state.selected].newname = name;
    var data =[{name:name,chief:ce[0],desc:des,proofreader:pr[0]},{chief:ce[1],pf:pr[1],pj:pj}];
    pouch.readfrompouch(db,this.state.proj,this.saveprojectstate,2,data);
  },
  tomyArray:function(str,del)
  {
     var arr = str.split(del);
     return arr;
  },
  tomyString:function(data)
  {
      var mystring ="",arr =[],temparr=[];
      for(var i=0;i<data.length-1;i++)
      {
        if(i == 0) {mystring += data[i];}
        else mystring += "+"+data[i];
        arr.push(data[i]);
      }
      temparr.push(mystring,arr);
      return temparr;
  },
  saveprojectstate:function(data) {
    this.setState({cearr:data.chief,prarr:data.pf,edit:false,projects:data.pj});
  },
  check_project:function(){
     var pj ="";
     if(this.state.projects == "") 
     {
        var ip = location.host.split(":")[0];
        var db = new PouchDB('http://'+ip+':5984/project');
        pj = pouch.readallfrompouch(db,this.change_projname,2);

     }
     else {
      pj = this.state.projects.map(this.renderProject);
     }
     return pj;
  },
  change_projname:function(res) {
    var projects = this.props.projects();
    var pj ="";
     for(var i=0;i<res.rows.length;i++){  
        for(var j=0;j<projects.length;j++){
            if(projects[j].name == res.rows[i].doc._id) projects[j].newname = res.rows[i].doc.name;
         }
        }
        this.setState({projects:projects});
        pj = projects.map(this.renderProject);
        return pj;
  },
  check_user:function(pj,i) {
      var ip = location.host.split(":")[0];
      var db = new PouchDB('http://'+ip+':5984/project');
      pouch.readfrompouch(db,pj,this.splituserlist,1);
        
  },
  splituserlist:function(res) {
      var authority="";
      var project_info = this.state.projects;
      project_info[0].ce = res.chief;
      project_info[0].pr = res.proofreader;
      project_info[0].desc = res.desc;
      var cearr = res.chief.split("+"),prarr = res.proofreader.split("+");
      var margearr = cearr.concat(prarr);
      if(this.props.tab.profile.su == true || margearr.indexOf(this.props.tab.profile.name) >= 0) {authority = true;}
      else { authority = false;}
      this.setState({first:false,cearr:cearr,prarr:prarr,authority:authority,projects:project_info});
  },
  addnewproject:function(ce,pr,pj)
  {
      var ip = location.host.split(":")[0];
      var file = document.getElementById("upload").value;
      var filename = file.split('\\');
      var name = document.getElementById('name').value;
      var des = document.getElementById('desc').value;
      var data = {
      _id:filename[filename.length-1],url:"http://"+ip+"/ketaka/kdb/"+filename[filename.length-1],desc:des}
      var data2 = {
      _id:filename[filename.length-1].replace(".kdb",""),name:name,desc:des,chief:ce[0],proofreader:pr[0]}
      this.writetodb("kdbs",data);
      this.writetodb("project",data2);
      this.setState({cearr:ce[1],prar:pr[1],projects:pj,edit:false});
      this.check_user(this.state.proj,this.state.selected);

  },
  writetodb:function(dbname,todo)
  {
    var ip = location.host.split(":")[0];
    var db = new PouchDB('http://'+ip+':5984/'+dbname);
    pouch.savetopouch(db,todo,this.candosomething);
  },
  candosomething:function() {
      //can dosomething here
  },
  member_list:function(data,status)
  {
    var cls="",out=[];
    if(data.length == 0) out.push(<div></div>);
    for (var i=0;i<data.length;i++) {
      if(status == "off")  out.push(<button className="menber_style"><img src={"photo/"+data[i]+".jpg?"+ new Date().getTime()} className="showphoto_style" onError={this.check_photo}></img><br />{data[i]}</button>);
      else if (status.indexOf(data[i]) > -1) out.push(<button type="checkbox" id={data[i]} className="btn picturebutton_style active"><img src={"photo/"+data[i]+".jpg?"+ new Date().getTime()} onError={this.check_photo} className="showphoto_style" ></img><br />{data[i]}&nbsp;&nbsp;</button>);
      else out.push(<button type="checkbox" id={data[i]} className="btn picturebutton_style"><img src={"photo/"+data[i]+".jpg?"+ new Date().getTime()} className="showphoto_style" onError={this.check_photo}></img><br />{data[i]}&nbsp;&nbsp;</button>);
    };
    return out;
    /*
    return data.map(function(r,i){ // excerpt is an array 
      if (!r) return <div></div>;
      else if(status == "off") return <button className="menber_style"><img src={"photo/"+r+".jpg"} className="showphoto_style"></img><br />{r}</button>
      else if (status.indexOf(r) > -1) return <button type="checkbox" id={r} className="btn picturebutton_style active"><img src={"images/"+r+".jpg"} className="showphoto_style" ></img><br />{r}&nbsp;&nbsp;</button>
      else return <button type="checkbox" id={r} className="btn picturebutton_style"><img src={"images/"+r+".jpg"} className="showphoto_style" ></img><br />{r}&nbsp;&nbsp;</button>
    });*/ 
  },
  showadd:function()
  {
    if(this.state.add == true)
    {
      return(
        <div>
        <div className="col-md-2"><h4>Kdb file</h4></div>
        <div className="col-md-10"><form action="upload.php" method="post" encType="multipart/form-data"><input type="hidden" name="folder" value="kdb"></input><input type="file" name="upload" id="upload"></input>
        <div><input type="submit" className="btn btn-success btn-block pull-left" name="button" id="button" value="Upload" style={{width:"110px",marginBottom:"10px"}}></input></div>
        </form></div>
        <div className="col-md-12"><br /></div>
        </div>
      );
    }
  },
  editbutton:function()
  {
    if(this.props.tab.profile.su == true){
      return <button className="btn btn-warning btn-lg button_default" onClick={this.editproject}>Edit</button>}
  },
  addbutton:function()
  {
    if(this.props.tab.profile.su == true){
      return <button className="btn btn-success add_button_style" onClick={this.addproject} ><img src="images/add.png" style={{height:"16px",width:"16px"}}></img></button>}
  },
  buildindex:function() {
  },
  render_normal:function()
  {//{this.props.projects()[0].pr}
      return ( 
      <div>
        <div className="col-md-2">
          <h1 className="header_text">Project</h1>{this.addbutton()}
          <div className="folderList">
        <table className="table table-bordered table-hover">
        <thead onClick={this.sortHeader}>
        </thead><br />
        <tbody>
         {this.check_project()}
        </tbody></table></div></div><br /><br />
        <div className="col-md-10 leftborder">
        {this.render_nan()}
        </div></div>
    );
  },
  render_edit:function()
  {
    var temp_desc,temp_name;
    if(this.state.add != true) {temp_desc= this.state.projects[0].desc;temp_name = this.state.projects[this.state.selected].newname;}
    return ( 
      <div>
        <div>
        <div className="alert_err alert-danger" style={{width:window.innerWidth}}>
            <strong>Need choose Proof Readers and Chief Editor!</strong>
        </div></div>
        <div className="col-md-2">
          <h1 className="header_text">Project</h1>
          <div className="folderList">
        <table className="table table-bordered table-hover">
      <thead onClick={this.sortHeader}></thead><br />
        <tbody>
         {this.check_project()}
        </tbody></table></div></div>
        <br /><br />
        <div className="col-md-10">
        <div className="col-md-12 leftborder">
        {this.showadd()}
        <div className="col-md-2"><h4>Name</h4></div>
        <div className="col-md-10"><input type="text" id="name" className="form-control" placeholder="Name" defaultValue={temp_name}></input></div>
        <div className="col-md-12"><br /></div>
        <div className="col-md-2"><h4> Discription</h4></div>
        <div className="col-md-10"><textarea id="desc" rows="2" className="form-control" placeholder="Discription" resize="none">{temp_desc}</textarea></div>
        <div className="col-md-12"><br /></div>
        <div className="col-md-2"><h4 >Proof Readers</h4></div>
        <div className="col-md-10">
        <div className="btn-group1" data-toggle="buttons">{this.member_list(this.state.pr,this.state.prarr)}</div></div>
        <div className="col-md-12"><br /></div>
        <div className="col-md-2"><h4 >Chief Editor</h4></div>
        <div className="col-md-10">
        <div className="btn-group2" data-toggle="buttons">{this.member_list(this.state.ce,this.state.cearr)}</div></div>
        <div className="col-md-12"><br /><br /><br /><br /></div>
        <div className="col-md-4 col-md-offset-8">
        <button className="btn btn-warning btn-lg button_default" onClick={this.canceledit} >Cancel</button>&nbsp;&nbsp;&nbsp;
        <button className="btn btn-success btn-lg button_default" onClick={this.confirm}>Save</button>
        </div>
        </div>
        </div>
      </div>
      );
  },
  render_nan:function(){
    if(this.state.first ==true) {
      return <div></div>}
    else if(this.state.authority ==false){
      return (
        <div className="col-md-8 col-md-offset-4"><h1>You havent been asign in this project.</h1>
        </div>
        );}
    else {
      return ( 
        <div>
        <div className="col-md-2"><h4> Name</h4></div>
        <div className="col-md-10"><h4>{this.state.projects[this.state.selected].newname}</h4></div>
        <div className="col-md-12"><br /><br /></div>
        <div className="col-md-2"><h4> Discription</h4></div>
        <div className="col-md-10"><h4>{this.state.projects[0].desc}</h4></div>
        <div className="col-md-12"><br /><br /></div>
        <div className="col-md-12"><br /><br /></div>
        <div className="col-md-2"><h4 >Proof Readers</h4></div>
        <div className="col-md-10"><div className="btn-group1"  data-toggle="buttons">{this.member_list(this.state.prarr,"off")}</div></div>
        <div className="col-md-12"><br /><br /></div>
        <div className="col-md-2"><h4 >Chief Editor</h4></div>
        <div className="col-md-10"><div className="btn-group1"  data-toggle="buttons">{this.member_list(this.state.cearr,"off")}</div></div>
        <div className="col-md-12"><br /><br /><br /><br /></div>
        <div className="col-md-4 col-md-offset-8">
        {this.editbutton()}&nbsp;&nbsp;&nbsp;
        <button className="btn btn-success btn-lg button_default" onClick={this.openproject}>Open</button>&nbsp;&nbsp;&nbsp;
        </div></div>
       ); 
    } 
  },
  render: function() {
    if(this.state.edit==true){ return this.render_edit();}
    else {return this.render_normal();}
  }
});
module.exports=projectlist;