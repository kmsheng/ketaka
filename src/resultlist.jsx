/** @jsx React.DOM */
var React=require("react");
//var othercomponent=Require("other"); 
var resultlist = React.createClass({
  getInitialState: function() {
    return {bar: "world"};
  },
  gopage:function(e) {
    var pageid=parseInt(e.target.attributes["data-page"].value);
    var fileid=parseInt(e.target.attributes["data-file"].value);
    var pagename=e.target.innerHTML;
    this.props.action("gopage",pageid,fileid,pagename);
  }, 
  warning:function() {
    if (this.props.Q.rawresult.length>1000) {
      return ",only first 1000 hits are shown";
    } else return "";
  },
  show:function() {
    var that=this;
    var bambo = this.getbambos();
    var except = [];
    var except_count =0;
    if (!this.props.Q || !this.props.Q.excerpt) {
      return <div></div>
    }
    else if(bambo.length >0){
    for(var k=0;k<this.props.Q.excerpt.length;k++)
    {
          for(var j=0;j<bambo.length;j++)
          {
            if(this.props.Q.excerpt[k].file == bambo[j]) 
            {
              except[except_count] = this.props.Q.excerpt[k];
              except_count++;
            }
          }
          if(this.props.Q.excerpt[k].file>bambo[bambo.length-1]) 
          {this.props.Q.excerpt = except; break;}
      }

    }
    else
    {
        except = this.props.Q.excerpt;
    }
    if (except == "") {
      return <div><h2>No result in this bambo!</h2></div>
    }
    return except.map(function(r,i){ // excerpt is an array 
      if (!r) return <div></div>;
      return <div>
      {r.seq+1} [<a href="#" data-file={r.file} data-page={r.seg}  onClick={that.gopage}>{r.segname}</a>]
      <div className="result" dangerouslySetInnerHTML={{__html:r.text}}></div>
      </div>
    });  
  },   
  getbambos:function() {
    var arr = [];
    var count =0;
    if(this.props.bambos.length >3)
    {
      for(var i=4;i<this.props.bambos.length;i++)
      {
        arr[count] = this.props.bambos[i].fid;
        count++;
      }
    }
    return arr;
  },
  showhit:function() {
    if (!this.props.Q.rawresult|| !this.props.Q.rawresult.length) return "0";
    else return this.props.Q.rawresult.length;
  },
  render: function() {
      if (this.props.Q) return <div className="resultlist" >
        {this.show()}
      </div>
      else return <div></div>
  }
});
module.exports=resultlist;

/*
querystring:<span className="query">{this.props.Q.query}</span>
          <span className="label label-info">{this.showhit()}</span>{this.warning()}
          */