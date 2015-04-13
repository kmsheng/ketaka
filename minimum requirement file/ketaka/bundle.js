(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"d:\\ksana2015\\ketaka\\index.js":[function(require,module,exports){
//var boot=require("boot");
//boot("ksanaforge-workshop","main","main");

var React=require("react");
var runtime=require("ksana2015-webruntime");
runtime.boot("workshop",function(){
	ksana.runtime=runtime;
	var Main=React.createElement(require("./src/main.jsx"));
	ksana.mainComponent=React.render(Main,document.getElementById("main"));
});
},{"./src/main.jsx":"d:\\ksana2015\\ketaka\\src\\main.jsx","ksana2015-webruntime":"d:\\ksana2015\\node_modules\\ksana2015-webruntime\\index.js","react":"react"}],"d:\\ksana2015\\ketaka\\src\\about.jsx":[function(require,module,exports){
/** @jsx React.DOM */

//var othercomponent=Require("other"); 
var React=require("react");
var about = React.createClass({displayName: "about",
  getInitialState: function() {
    return {bar: "world"};
  },
  pro_logout:function() {
     this.props.action("logout");
  },
  pro_profile:function() {
     this.props.action("index");
  },
  popoverphoto_error:function() {
     this.getDOMNode().querySelector('#pop_photo').src = 'images/photo.png';
  },
  getadmin:function() {
    if(this.props.tab[0].profile.admin ==true && this.props.tab[0].profile.su ==true){
      return "Administrator";
    }else if(this.props.tab[0].profile.admin ==true){
      return "Chief editor";
    }else {
      return "Proof reader";
    }
  },
  render: function() {
    return (
      React.createElement("div", null, 
         React.createElement("div", {className: "col-md-5"}, React.createElement("img", {src: "photo/"+this.props.tab[0].text+".jpg?"+ new Date().getTime(), className: "photo_style", id: "pop_photo", onError: this.popoverphoto_error})), 
         React.createElement("div", {className: "col-md-7"}, React.createElement("h4", null, this.props.tab[0].profile.name), 
         React.createElement("h2", {className: "label label-info"}, this.getadmin()), React.createElement("br", null), React.createElement("br", null), 
         React.createElement("div", null, React.createElement("button", {className: "btn btn-block btn-success col-md-1 about_button_style", onClick: this.pro_profile}, "Profile"), 
         React.createElement("button", {className: "btn btn-block btn-success pull-right about_button_style", onClick: this.pro_logout}, "Logout")
         )
         )
      )
    );
  } 
});
module.exports=about;
},{"react":"react"}],"d:\\ksana2015\\ketaka\\src\\buildindex.jsx":[function(require,module,exports){
var React=require("react");
var emptystatus={done:false,progress:0,message:""};
var buildindex = React.createClass({displayName: "buildindex",
  //mixins: Require('kse-mixins'),
  getInitialState: function() {
    return {status:emptystatus};
  },
  stoptimer:function() {
    clearInterval(this.buildtimer);
    this.buildtimer=0;
  },
  getstatus:function() {
    /*
    this.$ksana('buildStatus',this.state.status).done(function(status){
      var elapsed=Math.floor((new Date()-this.state.starttime)/1000);
      if (status.done) this.stoptimer();
      this.setState({status:status, elapsed:elapsed});
    });
*/
  },
  start:function(proj) {
    if (this.buildtimer) return;//cannot start another instance
    this.setState({status:emptystatus,starttime:new Date(),elapsed:0});
    /*
    this.$ksana('buildIndex',proj).done(function(status){
      this.state.status=status;
      $(this.refs.dialog.getDOMNode()).modal({backdrop:'static'}).modal('show');
      this.buildtimer=setInterval( this.getstatus,1000);
    });
*/
  },
  close:function() {
    $(this.refs.dialog.getDOMNode()).modal('hide');
  },
  stop:function() {
    /*
    this.$ksana('stopIndex',this.state.status).done(function(s){
      this.setState({status:s});
    });
*/
  }, 
  buttons:function() {
    if (this.state.status.done) {
      return (
        React.createElement("div", null, 
        React.createElement("button", {ref: "btnclose", onClick: this.close, className: "btn btn-success"}, "Close")
        )
      );
    } else {
      return (
        React.createElement("div", null, 
        React.createElement("button", {ref: "btnstop", onClick: this.stop, className: "btn btn-danger"}, "Stop Building")
        )
      )
    }
  },
  componentWillUnmount:function() {
    clearInterval(this.buildtimer);
  },
  render: function() {
    var p=Math.floor(this.state.status.progress * 100);
    var pp=Math.floor(this.state.status.progress * 1000) / 10;
    var msg=this.state.status.message;
    var proj=this.state.status.projectname;
    return (
    React.createElement("div", {ref: "dialog", className: "modal fade", tabIndex: "-1", role: "dialog", "aria-labelledby": "mySmallModalLabel", "aria-hidden": "true"}, 
      React.createElement("div", {className: "modal-dialog modal-sm"}, 
        React.createElement("div", {className: "modal-content well"}, 
        React.createElement("h3", null, "Building Index for ", proj, " ", pp, "%"), 
        React.createElement("h4", null, "time elapsed ", this.state.elapsed, " seconds"), 
        React.createElement("div", {className: "progress progress-striped"}, 
          React.createElement("div", {className: "progress-bar progress-bar-warning", role: "progressbar", "aria-valuenow": p, "aria-valuemin": "0", "aria-valuemax": "100", style: {"width": p+"%"}}, 
            React.createElement("span", {className: "sr-only"}, p, "% Complete")
          )
        ), 
        React.createElement("span", null, msg), 
        React.createElement("div", {className: "pull-right"}, 
        this.buttons()
        )
      )
    )
  )
    );
  }
});
module.exports=buildindex;
},{"react":"react"}],"d:\\ksana2015\\ketaka\\src\\caret.js":[function(require,module,exports){
var hasClass=function (el, selector) {
   var className = " " + selector + " ";
   return (" " + el.className + " ").replace(/[\n\t]/g, " ").indexOf(className) > -1;
};

var Create=function(_surface) {
	var surface=_surface;
	var caretnode,carettimer,shiftkey;

  var moveCaret=function(domnode) {
    if (!domnode) return; 
    caretnode=domnode;
    var rect=domnode.getBoundingClientRect();
    var caretdiv=surface.refs.caretdiv.getDOMNode();
    var caret=surface.refs.caret.getDOMNode();
    var surfacerect=surface.refs.surface.getDOMNode().getBoundingClientRect();
    var left=rect.left  -3;
    var top=rect.top;
    caretdiv.style.top=top +"px";
    caretdiv.style.left=left +"px";
    caretdiv.style.height=rect.height +"px";
    surface.refs.surface.getDOMNode().focus();
    surface.props.action("caretmoved",left,top,rect.height);
    //this.moveInputBox(rect);
  };

  var selstartFromCaret=function() {
    if (!caretnode || !caretnode.attributes['data-n']) return ;
    var len=0;
    var sel=parseInt(caretnode.attributes['data-n'].value);
    if (sel!==surface.props.selstart) {
      if (shiftkey) {
        if (sel>surface.props.selstart) {
          len=sel-surface.props.selstart;
          sel=surface.props.selstart;
        }
      }
    }
    return {start:sel,len:len}
  };
  var updateSelStart=function() {
    if (!carettimer) clearTimeout(carettimer);
    carettimer=setTimeout(function(){
      var sel=selstartFromCaret();
      if (!sel) return;//cannot select last token...
      surface.props.onSelection(sel.start,sel.len);
    },100);
  };


  var beginOfLine=function() {
    var n=caretnode.previousSibling;
    while (n&& !hasClass(n,"br")) {
      if (n.previousSibling) n=n.previousSibling;
      else break;
    }
    if (!n) return null;
    return (n.previousSibling==null)?n:n.nextSibling;
  }

  var endOfLine=function() {
    var n=caretnode.nextSibling;
    while (n&& !hasClass(n,"br")) {
      if (n.nextSibling) n=n.nextSibling;
      else break;
    }
    return n;
  }  

  var distance=function(x1,y1,x2,y2) {
    return Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
  }
  var moveCaretUp=function() {
    var n=beginOfLine(),ox=caretnode.offsetLeft, oy=caretnode.offsetTop;
    var mindis=100000000, closest=null;
    if (!n) return;
    if (n.previousSibling==null) return;//top line
    n=n.previousSibling;
    while (n) {
      var dis=distance(ox,oy,n.offsetLeft,n.offsetTop);
      if (dis<mindis) {mindis=dis;closest=n;}
      n=n.previousSibling;
    }
    moveCaret(closest);
  };

  var moveCaretDown=function(){
    var n=endOfLine(),ox=caretnode.offsetLeft, oy=caretnode.offsetTop;
    if (!n) return;
    var mindis=100000000, closest=null;
    if (n.nextSibling==null) return;//top line
    n=n.nextSibling;
    while (n) {
      var dis=distance(ox,oy,n.offsetLeft,n.offsetTop);
      if (dis<mindis) {mindis=dis;closest=n;}
      n=n.nextSibling;
    }
    moveCaret(closest);
  };


  var strikeout=function() {
    surface.props.action("strikeout");
  };
  var caretPos=function() {
    var caretpos=0;
    if (surface.props.sellength>0) {
      caretpos=surface.props.selstart+surface.props.sellength;
    } else {
      caretpos=surface.props.selstart;
    }
    return caretpos;
  };

  var addSuggestion=function(start,len,defaulttext) {
    var prev=caretPos();
    if (prev===0) return 0;  
    
    var len=prev-start;
    surface.props.action("addsuggestion",start,len,defaulttext);
  };

  var inlinedialog=function(thekey) {
    var sel={};
    //if (surface.props.sellength==0) {
      var here=selstartFromCaret();
      moveCaret(caretnode.previousSibling);
      var sel=selstartFromCaret();
      moveCaret(caretnode.nextSibling);
      sel.len=here.start-sel.start;

    if (surface.hasMarkupAt(sel.start)) {
      surface.openinlinedialog(sel.start);
    } else {
      addSuggestion(sel.start,sel.len,thekey||"");
    }
  }

  var enter=function() {
    var prev=caretPos();
    if (prev===0) return 0;  
    var sel=selstartFromCaret();
    var len=prev-sel.start;
    surface.props.action("enter",sel.start,len);
    moveCaret(caretnode.nextSibling);
    updateSelStart();
  }
var validchar=function(kc) {
  return  (kc>=0x41 && kc<=0x5F);
}
this.keypress=function(e) {
  var kc=e.which;
  inlinedialog(String.fromCharCode(kc));
}
this.keydown=function(e) {
   var prevent=true;
    shiftkey=e.shiftKey;
    var kc=e.which;
    if (kc==37) {
      if (e.ctrlKey) {
        if (!surface.inlinedialogopened) surface.props.action("prevmistake");
      } else {
        moveCaret(caretnode.previousSibling);
      }
    }
    else if (kc==39) {
      if (e.ctrlKey) {
        if (!surface.inlinedialogopened) surface.props.action("nextmistake");
      } else {
        moveCaret(caretnode.nextSibling);  
      }
      
    }
    else if (kc==40) moveCaretDown();
    else if (kc==38) moveCaretUp();
    else if (kc==46) strikeout();
    else if (kc==36) moveCaret(beginOfLine());
    else if (kc==35) moveCaret(endOfLine());
    else if (kc==32) inlinedialog();
    else if (kc==13) enter();
    else if (kc==27) surface.closeinlinedialog();
    else if (validchar(kc) || (kc>=112 && kc<=123))  {
      //if (kc==67 && e.ctrlKey) {
      //  surface.props.action("copy",surface.selectedText());
      //} else {
        prevent=false;
      //}
    }
    if (kc>=27&&kc<50)  updateSelStart();
    if (prevent) e.preventDefault();

  }
  this.show=function() {
    //this.refs.surface.getDOMNode().focus();
    var pos=surface.props.selstart+surface.props.sellength;
    var c=surface.refs.surface.getDOMNode().querySelector(
      'span[data-n="'+(pos)+'"]');
    moveCaret(c);
  } 

}

module.exports={Create:Create};
},{}],"d:\\ksana2015\\ketaka\\src\\contentnavigator.jsx":[function(require,module,exports){
/** @jsx React.DOM */

var React=require("react"); 

var contentnavigator = React.createClass({displayName: "contentnavigator",
  getInitialState: function() {
    return {pagename:this.pageName()};
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
  pageIdChange:function() {
    clearTimeout(this.pageidtimer);
    this.pageidtimer=setTimeout(this.setPageId.bind(this) ,500);
  },
  nextPage:function() {
    this.props.action("next");
  },
  prevPage:function() {
    this.props.action("prev");
  },
  firstPage:function() {
    this.props.action("first");
  },
  lastPage:function() {
    this.props.action("last");
  },
  componentDidUpdate:function() {
    if (this.refs&&this.refs.pageid) {
      this.refs.pageid.getDOMNode().value=this.pageName();
    }
  }, 
  nextMistake:function() {
    this.props.action("nextmistake");
  },
  prevMistake:function() {
    this.props.action("prevmistake");
  },
  preview:function() {
    this.props.action("preview");
  },
  endpreview:function() {
    this.props.action("endpreview");
  },
  previewmenu:function() {

    if (this.props.preview) {
      return React.createElement("button", {className: "btn btn-warning", onClick: this.endpreview}, "End Preview")
    } else {
      return React.createElement("button", {className: "btn btn-success", onClick: this.preview}, "Preview")
    }
  },
  adminmenu:function() {
    if (this.props.user.admin) {
      return (
              React.createElement("button", {className: "btn btn-default", onClick: this.nextMistake}, "Next mistake")
              );
    } else return React.createElement("div", null);

  } ,
  renderStatus:function() {
    if (!this.props.selecting)return;
    var out=[];
    out.push(React.createElement("span", {className: "label label-default"}, this.props.selecting.start));
    if (this.props.selecting.end!=this.props.selecting.start) {
      out.push(React.createElement("span", {className: "label label-default"}, this.props.selecting.end));
    }
      
    return out;      
  },
  render: function() {
    if (!this.props.page) return React.createElement("div", null)
    return (
      React.createElement("div", {className: "row"}, 
      React.createElement("div", {className: "col-md-4"}, 
        React.createElement("div", {className: "input-group"}, 
             React.createElement("span", {className: "input-group-btn"}, 
              React.createElement("button", {id: "btnfirstpage", className: "btn btn-default", onClick: this.firstPage}, "First"), 
              React.createElement("button", {className: "btn btn-default", onClick: this.prevPage}, "Prev")
             ), 
            React.createElement("input", {id: "pageid", ref: "pageid", defaultValue: this.pageName(), onChange: this.pageIdChange, className: "form-control"}), 
            React.createElement("span", {className: "input-group-btn"}, 
              React.createElement("button", {className: "btn btn-default", onClick: this.nextPage}, "Next"), 
              React.createElement("button", {id: "btnlastpage", className: "btn btn-default", onClick: this.lastPage}, "Last")
            )
        )
      ), 

      React.createElement("div", {className: "col-md-5"}, 
        this.adminmenu(), 
        this.previewmenu(), 
        this.renderStatus()
      )
      )
    );
  }
});

module.exports=contentnavigator;
},{"react":"react"}],"d:\\ksana2015\\ketaka\\src\\contextmenu_classical.jsx":[function(require,module,exports){
var React=require("react");
var contextmenu_classical = React.createClass({displayName: "contextmenu_classical",
  getInitialState: function() {
    return {selectedText:"",bar: "world"};
  },  
  onPopup:function(context) {
    this.setState(context);
  },  
  copy:function(e) {
    if (!process) return;
    var gui = nodeRequire('nw.gui');
    var clipboard = gui.Clipboard.get();
    var text=e.target.attributes['data-text'].value;
    clipboard.set(text); 
  },  
  searchkeyword:function(e) {
    this.props.action("searchkeyword",this.state.text);
  },

  markup:function(e) {
    var type=(typeof e =="string")?e:e.target.attributes["data-markup"].value;
    this.props.action("addmarkup",{type:type});
  }, 
  linebreak:function(e) {
    this.props.action("addmarkup",{type:"suggest",text:"※",insert:"true"},true);
  },
  deleteText:function(e) {
    this.props.action("strikeout");
  },
  clearMarkup:function() { 
    this.props.action("clearmarkup");
  },
  render: function() {
    return ( 
    React.createElement("div", {className: "dropdown"}, 
      React.createElement("button", {className: "btn dropdown-toggle sr-only", type: "button", id: "dropdownMenu1", "data-toggle": "dropdown"}, 
        "Dropdown", 
        React.createElement("span", {className: "caret"})
      ), 
      React.createElement("ul", {className: "dropdown-menu", role: "menu", "aria-labelledby": "dropdownMenu1"}, 
        React.createElement("li", null, React.createElement("a", {role: "menuitem", tabIndex: "-1", href: "#", onClick: this.markup, "data-markup": "suggest"}, "Suggest")), 
        React.createElement("li", null, React.createElement("a", {role: "menuitem", tabIndex: "-1", href: "#", onClick: this.deleteText}, "Delete")), 
        React.createElement("li", null, React.createElement("a", {role: "menuitem", tabIndex: "-1", href: "#", onClick: this.linebreak}, "line break")), 
        React.createElement("li", null, React.createElement("a", {role: "menuitem", tabIndex: "-1", href: "#", onClick: this.clearMarkup}, "Clear Markup")), 
        React.createElement("li", {className: "divider"}), 
        React.createElement("li", null, React.createElement("a", {role: "menuitem", tabIndex: "-1", href: "#", onClick: this.copy, "data-text": this.state.text}, "Copy")), 
        React.createElement("li", null, React.createElement("a", {role: "menuitem", tabIndex: "-1", href: "#", onClick: this.searchkeyword}, "Search"))
      )
    ) 
    );
  }
});
module.exports=contextmenu_classical;
},{"react":"react"}],"d:\\ksana2015\\ketaka\\src\\contextmenu_tibetan.jsx":[function(require,module,exports){
var React=require("react");
var contextmenu_tibetan = React.createClass({displayName: "contextmenu_tibetan",
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
    if(this.props.len>1) return React.createElement("a", {role: "menuitem", tabIndex: "-1", href: "#"}, "Suggest")
	else return React.createElement("a", {role: "menuitem", tabIndex: "-1", href: "#", onClick: this.addSuggestion}, "Suggest")
  },
  render: function() {
    var disabled=(this.props.len>1)?"disabled":"";
    return ( 
    React.createElement("div", {className: "dropdown"}, 
      React.createElement("button", {className: "btn dropdown-toggle sr-only", type: "button", id: "dropdownMenu1", "data-toggle": "dropdown"}, 
        "Dropdown", 
        React.createElement("span", {className: "caret"})
      ), 
      React.createElement("ul", {className: "dropdown-menu", role: "menu", "aria-labelledby": "dropdownMenu1"}, 
        React.createElement("li", {className: disabled}, this.onShowswitch()), 
        React.createElement("li", null, React.createElement("a", {role: "menuitem", tabIndex: "-1", href: "#", onClick: this.markup, "data-markup": "comment"}, "Comment")), 
        React.createElement("li", null, React.createElement("a", {role: "menuitem", tabIndex: "-1", href: "#", onClick: this.deleteText}, "Delete")), 
        React.createElement("li", null, React.createElement("a", {role: "menuitem", tabIndex: "-1", href: "#", onClick: this.clearMarkup}, "Clear Markup")), 
        React.createElement("li", {className: "divider"}), 
        React.createElement("li", null, React.createElement("a", {role: "menuitem", tabIndex: "-1", href: "#", onClick: this.searchkeyword}, "Search"))
      )
    ) 
    );
  }
});
module.exports=contextmenu_tibetan;
},{"react":"react"}],"d:\\ksana2015\\ketaka\\src\\cssgen.js":[function(require,module,exports){
var createStyleSheet=function() {
	var style = document.createElement("style");
	style.appendChild(document.createTextNode(""));
	document.head.appendChild(style);
	return style.sheet;
};
/*
	styles is a object mapping tagname with css rule
	tagset is tag used in the page, overlap tag are concat with ,
	use prefix to prepend all rules
*/
var insertRule=function(sheet,tags,prefix,SS) {
	var background_images=[]; 
	var combined=" ";
	for (var j=0;j<SS.length;j++) {
		var S=SS[j];
		for (var k in S) {
			if (k==="background-image") {
				background_images.push(S[k]);
			} else {
				combined+=k+":"+S[k]+";";
			}
		}
	}
	if (background_images.length) {
		combined+='background-image:'+background_images.join(",");
	}
	var rule=prefix+"."+tags.join("__")+" {"+combined+"}";
 	try {
 		sheet.insertRule(rule,sheet.rules.length);	
 	} catch(e) {
 		console.log(e);
 	}
}
var applyStyles=function(styles,tagset,prefix) {
	prefix=prefix||"";
	var sheet=document.styleSheets[1];
	if (!sheet) sheet=createStyleSheet() ;
	else { //remove all children
		while (sheet.firstChild) sheet.removeChild(sheet.firstChild);
	} 
	
	for (var i=0;i<tagset.length;i++) {
		var tags=tagset[i].split(",");
		var SS=[];
		for (var j in tags) {
			var s=styles[tags[j]]; 
			if (s) SS.push(s);
		}
		insertRule(sheet,tags,prefix,SS);
	}
}
var api={applyStyles:applyStyles};
module.exports=api;
},{}],"d:\\ksana2015\\ketaka\\src\\devmenu.jsx":[function(require,module,exports){
var React=require("react");
//var surfacetest=require("./surfacetest");

var devmenu = React.createClass({displayName: "devmenu",
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
        "workshop", { nw: gui.Window.get() , react:ksana.mainComponent});

      tester.moveTo(1920,-350);
      tester.resizeTo(550,950);
    })
    this.tester=tester;
    
  },
  
  surfacetest:function() {
   // React.renderComponent(surfacetest(),document.getElementById("main"));
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
      React.createElement("div", null, 
        React.createElement("button", {onClick: this.moveWindow}, "move window"), 
        React.createElement("button", {onClick: this.surfacetest}, "surface test"), 
        React.createElement("button", {onClick: this.maintest}, "main test")
      )
    );
  }
});
module.exports=devmenu;
},{"react":"react"}],"d:\\ksana2015\\ketaka\\src\\docsurface.jsx":[function(require,module,exports){
/** @jsx React.DOM */
//if (typeof $=="undefined") $=require("jquery");
var React=require("react");
var Token = React.createClass({displayName: "Token",
  render:function() {
    var classname=this.props.cls?this.props.cls.trim():"";
    var opts={ 'data-n':this.props.n}
    if (this.props.appendtext) opts['data-to']=this.props.appendtext;
    if (classname) opts.className=classname;
    return React.DOM.span(opts,this.props.ch);
  } 
});
var caret=require("./caret");  
var Surface = React.createClass({displayName: "Surface",
  componentWillUpdate:function(nextProps,nextState) {
    if (nextProps.selstart!=this.props.selstart
      && nextProps.selstart!=this.props.selstart+this.props.sellength) {
      //nextState.markup=null;
      //this.inlinedialogopened=null;
    } 
    if (nextProps.page!=this.props.page) {
      nextState.markup=null;
      this.inlinedialogopened=null;
    }
  },
  selectedText:function() {
    return this.props.page.inscription.substr(this.props.selstart,this.props.sellength);
  },
  moveInputBox:function(rect) {
    var inputbox=this.refs.inputbox.getDOMNode();
    var surfacerect=this.refs.surface.getDOMNode().getBoundingClientRect();
    inputbox.focus();
  },        
  showinlinedialog:function(start) {
    if (!this.refs.inlinedialog) return;
    if (!start && this.state.markup) start=this.state.markup.start;
    if (start < 0) return;

    var domnode=this.getDOMNode().querySelector('span[data-n="'+start+'"]');
    if (!domnode) return;

    var dialog=this.refs.inlinedialog.getDOMNode();
    var dialogheight=dialog.firstChild.offsetHeight;
    /*
    dialog.style.left=(domnode.offsetLeft - this.getDOMNode().offsetLeft)+"px" ;
    dialog.style.top=(domnode.offsetTop - this.getDOMNode().offsetTop + domnode.offsetHeight)+"px" ;
    
    if (dialogheight>0 && dialogheight<parseInt(dialog.style.top)) {
      dialog.style.top=parseInt(dialog.style.top)-dialogheight-domnode.offsetHeight;
    }
    */
    dialog.style.left="0px";
    dialog.style.top="0px";

    dialog.style.display='inline';
    this.inlinedialogopened=dialog;
  },
  getRange:function() {
    var sel = getSelection();
    if (!sel.rangeCount) return;
    var range = sel.getRangeAt(0);
    var s=range.startContainer.parentElement;
    var e=range.endContainer.parentElement;
    if (s.nodeName!='SPAN' || e.nodeName!='SPAN') return;
    var start=parseInt(s.getAttribute('data-n'),10);
    var end=parseInt(e.getAttribute('data-n'),10);
    return [start,end];
  },
  getSelection:function() {
    var R=this.getRange();
    if (!R) return;
    var start=R[0];
    var end=R[1];
    var length=0;
    var sel = getSelection();
    if (!sel.rangeCount) return;
    var range = sel.getRangeAt(0);    
    var s=range.startContainer.parentElement;
    var e=range.endContainer.parentElement;
    var n=e.nextSibling,nextstart=0;
    if (!n) return null;           
    if (n.nodeName=="SPAN") {
      nextstart=parseInt(n.getAttribute('data-n'),10);  
    }
    var selectionlength=end-start+sel.extentOffset-sel.anchorOffset;
    if (start+selectionlength==nextstart) {//select till end of last token
      length=selectionlength;
    } else {
      if (selectionlength)   length=nextstart-start; //https://github.com/ksanaforge/workshop/issues/50
      else length=end-start;
      //if (range.endOffset>range.startOffset &&!length) length=1;
      if (length<0) {
          var temp=end; end=start; start=end;
      }
    }

    //sel.empty();
    this.refs.surface.getDOMNode().focus();
    return {start:start,len:length};
  },
  openinlinedialog:function(n) {
    var n=parseInt(n); 
    var m=this.getMarkupsAt(n);
    if (!m.length || !this.props.template.inlinedialog) return;
    var mm=m[0];//find markup at position
    for (var i=1;i<m.length;i++) {
      if (m[i].start==n) mm=m[i];
    }
    this.props.onSelection(mm.start,mm.len);
    var dialog=this.props.template.inlinedialog[mm.payload.type];
    if (dialog) {
      this.setState({markup:mm});
    }
  },
  hasMarkupAt:function(n) {
    return this.getMarkupsAt(n).length>0;
  },
  tokenclicked:function(e) {
    if (!e.target.attributes['data-n']) return;
    var n=e.target.attributes['data-n'].value;
    if (n) this.openinlinedialog(n);
    return (!!n);
  },
  mouseDown:function(e) {
    if (this.inlinedialogopened) {
        e.preventDefault();
        return;
    }
    if(e.button === 0) this.leftMButtonDown = true;
  },
  mouseMove:function(e) {
    if (!this.leftMButtonDown) return;
    var sel=this.getRange();
    if (!sel) return;
    if (sel[0]!=this.laststart || this.lastend!=sel[1]) {
      this.props.action("makingselection",sel[0],sel[1]);
    }
    this.laststart=sel[0];
    this.lastend=sel[1];
  },
  nextTokenStart:function(pos) {
    if (!this.offsets)return 0;
    for (var i=0;i<this.offsets.length;i++) {
      if (this.offsets[i]>pos) return this.offsets[i];
    }
    return 0;
  },
  mouseUp:function(e) {
    this.leftMButtonDown=false;
    if (this.inlinedialogopened) return;

    //if (this.inInlineDialog(e.target))return;
    var sel=this.getSelection();
    if (!sel) return;


    if (sel.len==0 && e.button==0 ) { //use e.target
      var n=e.target.attributes['data-n'];
      if (n) {
        if (e.shiftKey && sel.start>this.props.selstart) { //shift key pressed, extend mouse selection
          sel.len=parseInt(n.value)-this.props.selstart;
          sel.start=this.props.selstart;
        } else {
          //this.setState({selstart:parseInt(n.value),sellength:0});
          sel.start=parseInt(n.value);
        }
        var attributes=e.target.getAttribute("class");
        if (attributes && attributes.indexOf("linkto")>-1) {
          var M=this.props.page.markupAt(sel.start);
          this.props.action("openlink",M[0].payload);
        } else{
          this.props.onSelection(sel.start,sel.len,e.pageX,e.pageY,e);
        } 
      }
      return;
    }
    if (!sel) return;
    if (e.button==2) {
      if (this.props.sellength>0) {
        if (sel.start>=this.props.selstart && sel.start<=this.props.selstart+this.props.sellength) {
          sel.start=this.props.selstart;
          sel.len=this.props.sellength;
        } 
      } else if (sel.start>-1) {
        var next=this.nextTokenStart(sel.start);
        if (next) {
          sel.len=next-sel.start;
        }
      }   
    } 
    this.showMakelinkDialog(sel.start);
    this.props.onSelection(sel.start,sel.len,e.pageX,e.pageY,e);
  },
  closeinlinedialog:function() {
    if (this.inlinedialogopened) {
      this.inlinedialogopened.style.display='none';
    }
    this.inlinedialogopened=false;
    this.refs.surface.getDOMNode().focus();
    this.setState({markup:false})
  },
  inlinedialogaction:function() {
    this.props.action.apply(this.props,arguments);
    this.closeinlinedialog();
  },
  addMakelinkDialog:function() {
    return React.createElement("span", {ref: "inlinedialog", className: "inlinedialog"}, 
        this.props.template.makelinkdialog({action:this.inlinedialogaction,
          linktarget:this.state.linktarget,
          linksource:this.state.linksource,
          page:this.props.page,
          user:this.props.user})
      )

  },
  addInlinedialog:function() {
    if (!this.props.template.inlinedialog) return null;
    if (this.state.linktarget) {
      return this.addMakelinkDialog();
    }
    if (!this.state.markup) return null;

    var m=this.state.markup;
    var text=this.props.page.inscription.substr(m.start,m.len);
    var dialog=this.props.template.inlinedialog[m.payload.type];
    if (dialog) return (
      React.createElement("span", {ref: "inlinedialog", className: "inlinedialog"}, 
        dialog({action:this.inlinedialogaction,text:text,markup:m,
          user:this.props.user})
      )
    );
    return null;
  },
  
  renderRevision:function(R,xml) {
    var extraclass="";
    if (R[0].len===0) {
      extraclass+=" insert"; 
//          replaceto=R[0].payload.text;
      xml.push(React.createElement("span", {className: extraclass+" inserttext"}, R[0].payload.text));
    } else  {
      if (R[0].payload.text) {
        if (i>=R[0].start && i<R[0].start+R[0].len) extraclass+=" replace"; 
        if (i===R[0].start+R[0].len) {
          xml.push(React.createElement("span", {className: extraclass+" replacetext"}, R[0].payload.text));
        } 
      }
      else if (i>=R[0].start && i<R[0].start+R[0].len) extraclass+=" delete";  
    }
      //if (R[0].start!=i)replaceto="";
    return extraclass;
  },
  getMarkupsAt:function(offset) {
    return this.props.action("getmarkupsat",offset);
  },
  prepareViewonly:function(page) {
    var admin_viewable_tags=this.props.template.admin_viewable_tags||[];
    if (admin_viewable_tags.length==0) return [];
    var author=this.props.user.name;
    var viewonly=page.filterMarkup(function(m){
      return (admin_viewable_tags.indexOf(m.payload.type)>-1) 
        && (author!=m.payload.author);
    })
    return viewonly;
  },
  putSurfaceElement:function(viewonlys,offsets,idx) {
    var surface_elements=this.props.template.surface_elements; //from workshop-project
    var res=[];
    if (surface_elements)  {
        var viewonly=viewonlys.filter(function(v){return (v.start==offsets[idx]);});
        if (viewonly) viewonly.map(function(v){
          var element=surface_elements[v.payload.type];
          if (element) res.push(React.createElement(element,{payload:v.payload}));
          else {
            console.error("element ",v.payload.type,"not defined in surface_elements")
          }
        });        
    }
    return res;
  },
  toXML : function(opts) {
    var page=this.props.page;
    if (!page) return [];
    var inscription=page.inscription;
    var res=this.props.template.tokenize(inscription+"　");
    var isSkip=this.props.isSkip;
    var TK=res.tokens;
    var offsets=res.offsets;
    this.offsets=offsets;
    if (!TK || !TK.length) return [] ;
    var xml=[], hits=this.props.hits ||[], nhit=0, voff=0;
    //hits format [vpos, phrase_width, phrase_id]
    var tagset={};//tags used in the page, comma to seperate overlap tag 
    var selstart=opts.selstart||0,sellength=opts.sellength||0;
    var viewonlys = this.prepareViewonly(page);

    for (var i=0;i<TK.length;i++) {
      var tk=TK[i];
      var classes="",extraclass="";
      var markupclasses=[],appendtext="";
      var M=this.getMarkupsAt(offsets[i]);
      if (offsets[i]>=selstart && offsets[i]<selstart+sellength) extraclass+=' selected';
      if (nhit<hits.length){ 
        if (voff>=hits[nhit][0]&& voff<hits[nhit][0]+hits[nhit][1] ) {
          extraclass+=' hl'+hits[nhit][2];
        } else if (voff>=hits[nhit][0]+hits[nhit][1]) {
          nhit++;
        }
      }
      if (!isSkip(tk)) voff++;
      var inlinedialog=null;      
      for (var j in M) {
        markupclasses.push(M[j].payload.type);
        if (M[j].start==offsets[i]) {
          markupclasses.push(M[j].payload.type+"_b");
        }
        if (M[j].start+M[j].len==offsets[i]+1) {
          markupclasses.push(M[j].payload.type+"_e");
        }
        /*
        if (M[j].start+M[j].len==i+1) { //last token
          var text=page.inscription.substr(M[j].start,M[j].len);
          inlinedialog=this.addInlinedialog(M[j],text);
        }
        */
        //append text
        if (M[j].payload.selected) {
          appendtext=M[j].payload.choices[M[j].payload.selected-1].text;
          var insert=M[j].payload.choices[M[j].payload.selected-1].insert;
          if (!insert) extraclass+=" remove";
          if (M[j].start+M[j].len!=offsets[i]+tk.length) appendtext=""; 
        }

        if (typeof M[j].payload.text!='undefined') {
          appendtext=M[j].payload.text;
          var insert=M[j].payload.insert;
          if (!insert) extraclass+=" remove";
          if (M[j].start+M[j].len!=offsets[i]+tk.length) appendtext=""; 
        }
      }  
      markupclasses.sort();
   
      if (markupclasses.length) tagset[markupclasses.join(",")]=true;
      var ch=tk;  
      if (ch==="\n") {ch="\u21a9";extraclass+=' br';}
      classes=(markupclasses.join("__")).trim()+" "+extraclass;
      xml.push(React.createElement(Token,{ key:i , cls:classes ,n:offsets[i],ch:ch, appendtext:appendtext}));
      if (inlinedialog) xml.push(inlinedialog);
      var res=this.putSurfaceElement(viewonlys,offsets,i);
      if (res.length) xml.push(res);
    }     
    xml.push(React.createElement(Token, {key: i, n: offsets[i]}));

    if (this.props.onTagSet) {
      this.props.onTagSet(Object.keys(tagset).sort(),this.state.uuid);
    }
    if (this.props.preview && this.props.template.typeset) {
      xml=this.props.template.typeset(xml);
    }
    return xml;
  },  
  render: function() {
    var opts={selstart:this.props.selstart, sellength:this.props.sellength};
    var xml=this.toXML(opts); 
 
    return (
      React.createElement("div", {"data-id": this.state.uuid, className: "surface"}, 
          this.addInlinedialog(), 
          React.createElement("div", {ref: "surface", tabIndex: "0", 
            onKeyDown: this.caret.keydown, 
            onKeyPress: this.caret.keypress, 
            onClick: this.tokenclicked, 
            onMouseDown: this.mouseDown, 
            onMouseUp: this.mouseUp, 
            onMouseMove: this.mouseMove
            }, xml
          ), 
          React.createElement("div", {ref: "caretdiv", className: "surface-caret-container"}, 
             React.createElement("div", {ref: "caret", className: "surface-caret"}, "|")
          )

      )
    );
  },
  getInitialState:function() {
    return {uuid:'u'+Math.random().toString().substring(2), 
    markup:null,linktarget:this.props.linktarget,linksource:this.props.linksource};
  },
  componentWillMount:function() {
    this.caret=new caret.Create(this);

  }, 
  showMakelinkDialog:function(dialgpos) {
    if (!this.state.linktarget) return;

    var markups=this.getMarkupsAt(dialogpos);
    var linkby=markups.filter(function(m){return m.payload.type=="linkby"});
 
    //already build link
    if (linkby.length && linkby[0].start==this.state.linktarget.start) return;
    //has other markup at same pos
    if (markups.length !=linkby.length) return; 
    this.showinlinedialog(dialogpos);
  },
  componentDidMount:function() {
    this.showMakelinkDialog(this.props.selstart);
    this.caret.show();
  },
  componentDidUpdate:function() {
    if (this.props.scrollto) this.scrollToSelection();
    this.caret.show();
    this.showinlinedialog();
    
    //$(".viewonlyHolder").popover();
  }
});

module.exports=Surface;
},{"./caret":"d:\\ksana2015\\ketaka\\src\\caret.js","react":"react"}],"d:\\ksana2015\\ketaka\\src\\document.js":[function(require,module,exports){
/*
  Multiversion text with external durable markups
  define a "fail to migrate markup" by setting length to -1
*/
(function(){"use strict";})();
var createMarkup=function(textlen,start,len,payload) {
	if (textlen==-1) textlen=1024*1024*1024; //max string size 1GB
	//the only function create a new markup instance, be friendly to V8 Hidden Class

	if (len<0) len=textlen;
	if (start<0) start=0;
	if (start>textlen) start=textlen;
	if (start+len>textlen) {
		len-=start+len-textlen;
		if (len<0) len=0;
	}

	return {start:start,len:len,payload:payload};
};
var cloneMarkup=function(m) {
	if (typeof m=='undefined') return null;
	return createMarkup(-1,m.start,m.len,JSON.parse(JSON.stringify(m.payload)));
};
/*
TODO , handle migration of fission page
*/
var migrateMarkup=function(markup, rev) {
	var end=markup.start+markup.len;
	var text=rev.payload.text||"";
	var newlen=(text.length-rev.len);
	var revend=rev.start+rev.len;
	var m=cloneMarkup(markup); //return a new copy

	if (end<=rev.start) return m;
	else if (revend<=markup.start) {
		m.start+=newlen;
		return m;
	} else { //overlap
		//  markup    x    xx      xx    xyz      xyyyz        xyz  
		//  delete   ---   ---    ---     ---      ---        ---     
		//  dout     |     |      |		   x        xz          z            
		//  insert   +++   +++    +++     +++      +++        +++
		//  iout     +++x  +++xx  +++xx  x+++yz   x+++yyyz    +++ xyz
		if (rev.start>markup.start) {
			var adv=rev.start-markup.start;  //markup in advance of rev
			var remain=( markup.len -adv) + newlen ; // remaining character after 
			if (remain<0) remain=0;
			m.len = adv + remain ;
		} else {
			m.start=rev.start;
			var behind=markup.start-rev.start;
			m.len=markup.len - (rev.len-behind);
		}
		if (m.len<0) m.len=0;
		return m;
	}
};
var applyChanges=function(sourcetext ,revisions) {
	revisions.sort(function(r1,r2){return r2.start-r1.start;});
	var text2=sourcetext;
	revisions.map(function(r){
		text2=text2.substring(0,r.start)+r.payload.text+text2.substring(r.start+r.len);
	});
	return text2;
};
var addMarkup=function(start,len,payload) {
	this.__markups__().push(createMarkup(this.inscription.length,start, len, payload ));
	this.doc.markDirty();
};
var addRevision=function(start,len,str) {
	var valid=this.__revisions__().every(function(r) {
		return (r.start+r.len<=start || r.start>=start+len);
	});
	var newrevision=createMarkup(this.inscription.length,start,len,{text:str});
	if (valid) this.__revisions__().push(newrevision);
	this.doc.markDirty();
	return valid;
};

var diff2revision=function(diff) {
	var out=[],offset=0,i=0;
	while (i<diff.length) {
		var d=diff[i];
		if (0==d[0]) {
			offset+=d[1].length;
		} else  if (d[0]<0) { //delete
			if (i<diff.length-1 && diff[i+1][0]==1) { //combine to modify
				out.push({start:offset,len:d[1].length,payload:{text:diff[i+1][1]}});
				i++;
			} else {
				out.push({start:offset,len:d[1].length,payload:{text:""}});
			}
			offset+=d[1].length;
		} else { //insert
			out.push({start:offset,len:0,payload:{text:d[1]}});
			//offset-=d[1].length;
		}
		i++;
	}
	return out;
}


var addRevisionsFromDiff=function(diff,opts) { //Google Diff format
	var revisions=diff2revision(diff);
	this.addRevisions(revisions,opts);
	return revisions.length;
}

var addMarkups=function(newmarkups,opts) {
	if (!newmarkups) return;
	if (!newmarkups.length) return;
	if (opts &&opts.clear) this.clearMarkups();
	var maxlength=this.inscription.length;
	var markups=this.__markups__();
	for (var i=0;i<newmarkups.length;i++) {
		var m=newmarkups[i];
		var newmarkup=createMarkup(maxlength, m.start, m.len, m.payload);
		markups.push(newmarkup);
	}
};
var addRevisions=function(newrevisions,opts) {
	if (!(newrevisions instanceof Array)) return;
	if (!newrevisions.length) return;
	if (opts &&opts.clear) this.clearRevisions();
	var revisions=this.__revisions__();
	var maxlength=this.inscription.length;
	for (var i=0;i<newrevisions.length;i++) {
		var m=newrevisions[i];
		var newrevision=createMarkup(maxlength, m.start, m.len, m.payload );
		revisions.push(newrevision);	
	}
};
var downgradeMarkups=function(markups) {
	var downgraded=[];

	for (var i in markups) {
		var m=markups[i];
		for (var j=0;j<this.revert.length;j++) {
			m=migrateMarkup(m,this.revert[j]);
		}
		downgraded.push(m);
	}
	return downgraded;
};
var upgradeMarkups=function(markups,revs) {
	var migratedmarkups=[];
	markups.map(function(m){
		var s=m.start, l=m.len, delta=0, deleted=false;
		revs.map(function(rev){
			if (rev.start<=s) { //this will affect the offset
				delta+= (rev.payload.text.length-rev.len);
			}
			if (rev.start<=s && rev.start+rev.len>=s+l) {
				deleted=true;
			}
		});
		var m2=cloneMarkup(m);
		m2.start+=delta;
		if (deleted) m2.len=0;
		migratedmarkups.push(m2);
	});
	return migratedmarkups;
};
var upgradeMarkupsTo=function(M,targetPage) {
	var pg=targetPage, lineage=[], doc=this.doc;
	while (true) {
			var pid=pg.parentId;
			if (!pid) break; // root	
			if (pid==pg.id)break;
			lineage.unshift(pg);
			pg=doc.getPage(pid);
	}
	lineage.map(function(pg){
		var parentPage=doc.getPage(pg.parentId);
		var rev=revertRevision(pg.revert,parentPage.inscription);
		M=parentPage.upgradeMarkups(M,rev);
	});
	return M;
};

var downgradeMarkupsTo=function(M,targetPage) {
	var pg=this,doc=this.doc;
	var ancestorId=targetPage.id;
	while (true) {
			var pid=pg.parentId;
			if (!pid) break; // root	
			M=pg.downgradeMarkups(M);
			if (pid==ancestorId)break;
			pg=doc.getPage(pid);
	}
	return M;
};
var offsprings=function() {
	var out=[];
	var page=this;
	while (page.__mutant__().length) {
		var mu=page.__mutant__();
		page=mu[mu.length-1];
		out.push(page);
	}
	return out;
}
var version=function() {  //return version number of this page
	var v=0, page=this, doc=this.doc;
	while (page.parentId) {
		v++;
		page=doc.getPage(page.parentId);
	}
	return v;
}

var hasAncestor=function(ancestor) {
	var ancestorId=ancestor.id;
	var pg=this,doc=this.doc;
	
	while (true) {
		if (!pg.parentId) return false; // root	
		if (pg.parentId==ancestorId) return true;
		pg=doc.getPage(pg.parentId);
	}
	return false;
};
var getAncestors=function() {
	var pg=this,ancestor=[], doc=this.doc;
	while (true) {
			var pid=pg.parentId;
			if (!pid) break; // root	
			pg=doc.getPage(pid);
			ancestor.unshift(pg);
	}
	return ancestor;
};

var clear=function(M,start,len,author) { //return number of item removed
	var count=0;
	if (typeof start=='undefined') {
		count=M.length;
	  M.splice(0, M.length);
	  return count;
	}
	if (len<0) len=this.inscription.length;
	var end=start+len;
	for (var i=M.length-1;i>=0;--i) {
		if (M[i].start>=start && M[i].start+M[i].len<=end) {
			if (author && author!=M[i].payload.author) continue;
			M.splice(i,1);
			count++;
		}
	}
	this.doc.markDirty();
	return count;
};
var clearRevisions=function(start,len,author) {
	clear.apply(this,[this.__revisions__(),start,len,author]);
	this.doc.markDirty();
};
var clearMarkups=function(start,len,author,filename) {
	var ip = location.host.split(":")[0];
	var pouch=require("./persistentmarkup_pouchdb");
	var db =  new PouchDB('http://'+ip+':5984/'+filename);
	for(var i=0;i<this.__markups__().length;i++){
		if(this.__markups__()[i].start >= start && this.__markups__()[i].start <= start+len){
			var docid = filename+"_"+author+"_"+this.id+"_"+this.__markups__()[i].start;
			pouch.removetopouch(db,docid);
		}
	}
	clear.apply(this,[this.__markups__(),start,len,author]);
	this.doc.markDirty();
};
var getOrigin=function() {
	var pg=this;
	while (pg && pg.parentId) {
		pg=this.doc.getPage(pg.parentId);
	}
	return pg;
}
var isLeafPage=function() {
	return (this.__mutant__().length===0);
};
//convert revert and revision back and forth
var revertRevision=function(revs,parentinscription) {
	var revert=[], offset=0;
	revs.sort(function(m1,m2){return m1.start-m2.start;});
	revs.map(function(r){
		var newinscription="";
		var	m=cloneMarkup(r);
		var newtext=parentinscription.substr(r.start,r.len);
		m.start+=offset;
		var text=m.payload.text||"";
		m.len=text.length;
		m.payload.text=newtext;
		offset+=m.len-newtext.length;
		revert.push(m);
	});
	revert.sort(function(a,b){return b.start-a.start;});
	return revert;
};
var markupAt=function(pos,markups) {
	var markups=markups||this.__markups__();
	return markups.filter(function(m){
		var len=m.len;if (!m.len) len=1;
		return (pos>=m.start && pos<m.start+len);
	});
};
var revisionAt=function(pos) {
	return this.__revisions__().filter(function(m){
		return (pos>=m.start && pos<=m.start+m.len);
	});
};

var compressRevert=function(R) {
	var out=[];
	for (var i in R) {
		if (R[i].payload.text==="") {
			out.push([R[i].start,R[i].len]);
		} else out.push([R[i].start,R[i].len,R[i].payload.text]);
	}
	return out;
};
var decompressRevert=function(R) {
	var out=[];
	for (var i=0;i<R.length;i++) {
		if (R[i].length) { //array format
			out.push({start:R[i][0],len:R[i][1], payload:{text:R[i][2]||""}})
		} else {
			out.push({start:R[i].s,len:R[i].l, payload:{text:R[i].t||""}});	
		}
	}
	return out;
};

var toJSONString=function(opts) {
	var obj={};
	opts=opts||{};
	if (this.name) obj.n=this.name;
	if (opts.withtext) obj.t=this.inscription;
	if (this.parentId) obj.p=this.parentId;
	if (this.revert) obj.r=compressRevert(this.revert);
	var meta=this.__meta__();
	/*
	if (meta.daugtherStart) {
		obj.ds=meta.daugtherStart;
		obj.dc=meta.daugtherCount;
	}
	*/
	return JSON.stringify(obj);
};
var compressedRevert=function() {
	return compressRevert(this.revert);
}
var filterMarkup=function(cb) {
	return this.__markups__().filter(function(m){
		return cb(m);
	});
}
var findMarkup=function(query) { //same like jquery
	var name=query.name;
	var output=[];
	this.__markups__().map(function(M){
		if (M.payload.name==name) {
			output.push(M);
		}
	});
	return output;
};
/*
var fission=function(breakpoints,opts){
	var meta=this.__meta__();
	var movetags=function(newpage,start,end) {
		var M=this.__markups__();
		M.map(function(m){
			if (m.start>=start && m.start<end) {
				newpage.addMarkup(m.start-start,m.len, m.payload);
			}
		});
	};
	meta.daugtherStart=this.doc.version;
	meta.daugtherCount=breakpoints.length+1;
	// create page ,add transclude from
	var start=0, t="";
	for (var i=0;i<=breakpoints.length;i++) {
		var end=breakpoints[i]||this.inscription.length;
		t=this.inscription.substring(start,end);
		var transclude={id:this.id, start:start };//
		var newpage=this.doc.createPage({text:t, transclude:transclude});
		newpage.__setParentId__(this.id);
		movetags.apply(this,[newpage,start,end]);
		start=end;
	}

	//when convert to json, remove the inscription in origin text
	//and retrived from fission mutant
};
*/
var toggleMarkup=function(start,len,payload) {
	var M=this.__markups__();
	for (var i=0;i<M.length;i++){
		if (start===M[i].start && len==M[i].len && payload.type==M[i].payload.type) {
			M.splice(i, 1);
			return;
		} 
	}
	this.addMarkup(start,len,payload);
};

var mergeMarkup = function(markups,offsets,type) {
	markups=markups||this.__markups__();
	var M=require("./markup");
	M.addTokenOffset(markups,offsets);
	var res= M.merge(markups, type||"suggest");
	return M.applyTokenOffset(res,offsets);
}

var strikeout=function(start,length,user,type) {
	this.clearMarkups(start,length,user);
	var markups=this.__markups__();
	var M=require("./markup");
	type=type||"suggest";
	return M.strikeout(markups,start,length,user,type);
}

var preview=function(opts) { 
	//suggestion is from UI , with insert in payload
	var revisions=require("./markup").suggestion2revision(opts.suggestions);
	return this.doc.evolvePage(this,{preview:true,revisions:revisions,markups:[]});
}

/*
  change to prototype
*/
var newPage = function(opts) {
	var PG={};
	var inscription="";
	var hasInscription=false;
	var markups=[];
	var revisions=[];
	var mutant=[];

	opts=opts||{};
	opts.id=opts.id || 0; //root id==0
	var parentId=0 ,name="";
	if (typeof opts.parent==='object') {
		inscription=opts.parent.inscription;
		name=opts.parent.name;
		hasInscription=true;
		parentId=opts.parent.id;
	}
	var doc=opts.doc;
	var meta= {name:name,id:opts.id, parentId:parentId, revert:null };

	//these are the only 2 function changing inscription,use by Doc only
	var checkLength=function(ins) {
		if (ins.length>doc.maxInscriptionLength) {
			console.error("exceed size",ins.length, ins.substring(0,100));
			ins=ins.substring(0,doc.maxInscriptionLength);
		}
		return ins;
	};
	PG.__selfEvolve__  =function(revs,M) { 
		//TODO ;make sure inscription is loaded
		var newinscription=applyChanges(inscription, revs);
		var migratedmarkups=[];
		meta.revert=revertRevision(revs,inscription);
		inscription=checkLength(newinscription);
		hasInscription=true;
		markups=upgradeMarkups(M,revs);
	};
	Object.defineProperty(PG,'inscription',{
		get : function() {
			if (meta.id===0) return ""; //root page
			if (hasInscription) return inscription;
			/*
			if (meta.daugtherStart) {
				inscription="";
				for (var i=0;i<meta.daugtherCount;i++) {//combine from daugther
					var pg=this.doc.getPage(meta.daugtherStart+i);
					inscription+=pg.inscription;
				}
			} else {
			*/
				var mu=this.getMutant(0); //revert from Mutant
				if (mu) {
					inscription=checkLength(applyChanges(mu.inscription,mu.revert));					
				} else {
					inscription="";
				}
				
			//}
			hasInscription=true;
			return inscription;
	}});
	//protected functions

	PG.__markups__     = function() { return markups;} ; 
	PG.__revisions__   = function() { return revisions;} ;
	PG.hasRevision     = function() { return revisions.length>0;} ;
	Object.defineProperty(PG,'id',{value:meta.id});
	Object.defineProperty(PG,'doc',{value:doc});
	Object.defineProperty(PG,'parentId',{get:function() {return meta.parentId;}});
	PG.__setParentId__ = function(i) { meta.parentId=i;	};
	PG.getMarkup       = function(i){ return cloneMarkup(markups[i]);} ;//protect from modification
	Object.defineProperty(PG,'markupCount',{get:function(){return markups.length;}});

	Object.defineProperty(PG,'revert',{get:function(){return meta.revert;}});
	PG.__setRevert__   = function(r) { meta.revert=decompressRevert(r);};
	//PG.__setDaugther__ = function(s,c) { meta.daugtherStart=s;meta.daugtherCount=c;};
	PG.getRevision     = function(i) { return cloneMarkup(revisions[i]);};
	PG.getMutant       = function(i) { return mutant[i]; };
	PG.__mutant__      = function()  { return mutant;};
	PG.__setmutant__   = function(c)  { mutant=c;};
	Object.defineProperty(PG,'revisionCount',{get:function(){return revisions.length;}});
		
	PG.setName           = function(n){ meta.name=n; return this;};
	Object.defineProperty(PG,'name',{get:function(){return meta.name;}});
	PG.__meta__        = function() {return meta;};
	Object.defineProperty(PG,'version',{get:version});
	//Object.defineProperty(PG,'daugtherStart',{get:function(){return meta.daugtherStart;}});
	//Object.defineProperty(PG,'daugtherCount',{get:function(){return meta.daugtherCount;}});
	PG.clearRevisions    = clearRevisions;
	PG.clearMarkups      = clearMarkups;
	PG.addMarkup         = addMarkup;
	PG.toggleMarkup      = toggleMarkup;
	PG.addMarkups        = addMarkups;
	PG.addRevision       = addRevision;
	PG.addRevisions      = addRevisions;
	PG.addRevisionsFromDiff=addRevisionsFromDiff;
	PG.hasAncestor       = hasAncestor;
	PG.upgradeMarkups    = upgradeMarkups;
	PG.downgradeMarkups  = downgradeMarkups;
	PG.upgradeMarkupsTo  = upgradeMarkupsTo;
	PG.downgradeMarkupsTo=downgradeMarkupsTo;
	PG.getAncestors      = getAncestors;
	PG.isLeafPage        = isLeafPage;
	PG.markupAt          = markupAt;
	PG.revisionAt        = revisionAt;
//	PG.getmutant          = getmutant;
	PG.toJSONString      = toJSONString;
	PG.findMarkup				 = findMarkup;
	PG.filterMarkup			 = filterMarkup;
//	PG.fission           = fission;
	PG.mergeMarkup       = mergeMarkup;
	PG.strikeout         = strikeout;
	PG.preview           = preview;
	PG.getOrigin       = getOrigin;
	PG.revertRevision = revertRevision;
	PG.offsprings       = offsprings;
	PG.compressedRevert=compressedRevert;
	Object.freeze(PG);
	return PG;
};
var createDocument = function(docjson,markupjson) {
	var DOC={};
	var pages=[];
	var names={};
	var meta={doctype:"dg1.0",filename:""};
	var dirty=0;
	var tags={};
	var sep="_.id";


	var createFromJSON=function(json) {
			rootPage.clearRevisions();
			var t=json.text||json.t ,page;
			if (t) {
				rootPage.addRevision(0,0,json.text || json.t);
				page=evolvePage(rootPage);				
			} else {
				page=createPage();
			}
			var name=json.n||json.name||"";
			if (!names[name]) {
				names[name]=pages.length-1;
			} else if (!json.p) {
				console.warn("repeat name "+name);
			}
			page.setName(name);
			if (json.p) page.__setParentId__(json.p);
			if (json.r) page.__setRevert__(json.r);
			/*
			if (json.ds) {
				page.__setDaugther__(json.ds,json.dc);
			}
			*/
			page.addMarkups(json.markups,true);
			page.addRevisions(json.revisions,true);
			return page;
	};
	var endCreatePages=function(opts) {
		//build mutant array
		if (opts&&opts.clear) pages.map(function(P){
			var mu=P.__mutant__();
			mu=[];
		});
		pages.map(function(P,idx,pages){
			if (P.parentId) pages[P.parentId].__mutant__().push(P);
		});		
	}
	var addMarkups=function(markups) {
		if (markups) for (var i=0;i<markups.length;i++){
			var m=markups[i].doc;
			var pageid=m.pageid;
			m.payload._rev = markups[i].doc._rev;
			pages[pageid].addMarkup(m.start,m.len,m.payload);
		}
		/*if (markups) for (var i=0;i<markups.length;i++){
			var m=markups[i];
			var pageid=m.i;
			pages[pageid].addMarkup(m.start,m.len,m.payload);
		}*/		
	}
	var createPages=function(json,markups) {
		var count=0,i;
		for (i=0;i<json.length;i++) {
			if (i==0 && !json[i].t) continue; //might be header
			createPage(json[i]);
		}

		endCreatePages({clear:true});
		addMarkups(markups);
		return this;
	};
	var createPage=function(input) {
		var id=pages.length,page;
		if (typeof input=='undefined' || typeof input.getMarkup=='function') {
			//root page
			var parent=input||0;
			page=newPage({id:id,parent:parent,doc:DOC});
			pages.push(page) ;
		} else if (typeof input=='string') { 
			page=createFromJSON({text:input});
		} else {
			page=createFromJSON(input);
		}
		return page;
	};
	var evolvePage=function(pg,opts) {//apply revisions and upgrate markup
		var nextgen;
		opts=opts||{};
		if (opts.preview) { 
			nextgen=newPage({parent:pg,doc:DOC,id:-1});  //id cannot null
		} else {
			nextgen=createPage(pg);	
		}
		if (pg.id) pg.__mutant__().push(nextgen);
		var revisions=opts.revisions||pg.__revisions__();
		var markups=opts.markups||pg.__markups__();
		nextgen.__selfEvolve__( revisions ,markups );

		return nextgen;
	};

	var findMRCA=function(pg1,pg2) {
		var ancestors1=pg1.getAncestors();
		var ancestors2=pg2.getAncestors();
		var common=0; //rootPage id
		while (ancestors1.length && ancestors2.length &&
		   ancestors1[0].id==ancestors2[0].id) {
			common=ancestors1[0];
			ancestors1.shift();ancestors2.shift();
		}
		return common;
	};

	var migrate=function(from,to) { //migrate markups of A to B
		if (typeof from=='number') from=this.getPage(from);
		var M=from.__markups__();
		var out=null;
		if (typeof to=='undefined') {
			out=from.downgradeMarkups(M);
		} else {
			if (typeof to=='number') to=this.getPage(to);
			if (from.id===to.id) {
				return M;
			} else if (to.hasAncestor(from)) {
				out=from.upgradeMarkupsTo(M,to);
			} else if (from.hasAncestor(to)){
				out=from.downgradeMarkupsTo(M,to);
			} else {
				var ancestor=findMRCA(from,to);
				out=from.downgradeMarkupsTo(M,ancestor);
				out=ancestor.upgradeMarkupsTo(out,to);
			}
		}
		return out;
	};
	var findPage=function(name) {
		for (var i=0;i<this.pageCount;i++) {
			if (name===pages[i].name) return pages[i];
		}
		return null;
	};
	var getLeafPages=function() {
		var arr=[],i=0;
		for (i=0;i<this.pageCount;i++) {arr[i]=true;}
		for (i=0;i<this.pageCount;i++) {
			var pid=pages[i].parentId;
			arr[pid]=false;
		}
		var leafpages=[];
		arr.map(function(p,i){ if (p) leafpages.push(i); });
		return {leafPages:leafpages, isLeafPages:arr};
	};
	/*
		convert revert to a string.
		starting with ascii 1
	*/
	var toJSONString=function() {
		var out=["["+JSON.stringify(meta)], s=",";
		var isLeafPages=this.getLeafPages().isLeafPages;
		for (var i=0;i<pages.length;i++) {
			if (i===0) continue;
			s+=pages[i].toJSONString({"withtext":isLeafPages[i]});
			out.push(s);
			s=",";
		}
		out[out.length-1]+="]";
		//make line number save as version number
		return out.join('\n');
	};

	//get a page , if version is not specified, return lastest
	//version ==0 first version, version==1 second ..
	var pageByName=function(name,version) {
		var parr=names[name];
		if (!parr) {
			return null; //pagename not found
		}
		if (typeof version=="undefined") {
			version=-1; //lastest
		}
		var pg=pages[parr];
		if (version==0) return pg; //the first version
		while (pg.__mutant__().length) {
			var mu=pg.__mutant__();
			pg=mu[mu.length-1];
			version--; 
			if  (version==0) break;
		}
		return pg;
	};

	var map=function(context,callback) {
		var cb=callback,ctx=context;
		if (typeof context=="function") {
			cb=context;
			ctx=this;
		}
		for (var i=1;i<this.pageCount;i++) {
			var pg=pages[i];
			if (pg.parentId!=0)  continue; //not a root page, 
			while (pg.__mutant__().length) {
				var mu=pg.__mutant__();
				pg=mu[mu.length-1];
			}
			cb.apply(ctx,[pg,i-1]);
		}
	}
	var pageNames=function() {
		var out=[];
		for (var i=1;i<this.pageCount;i++) {
			var pg=pages[i];
			if (pg.parentId!=0)  continue; //not a root page, 
			out.push(pg.name);
		}
		return out;
	}

	var rootPage=createPage();

	DOC.getPage=function(id) {return pages[id];};
	DOC.markDirty=function() {dirty++;};
	DOC.markClean=function() {dirty=0;};
	DOC.setTags=function(T)  {tags=T;};
	DOC.setSep=function(s)  {sep=s;};
	/*
		external markups must be saved with version number.
	*/


	Object.defineProperty(DOC,'meta',{value:meta});
	Object.defineProperty(DOC,'maxInscriptionLength',{value:8192});
	Object.defineProperty(DOC,'version',{get:function(){return pages.length;}});
	Object.defineProperty(DOC,'pageCount',{get:function(){return pages.length;}});
	Object.defineProperty(DOC,'dirty',{get:function() {return dirty>0; }});
	Object.defineProperty(DOC,'ags',{get:function() {return tags;}});
	Object.defineProperty(DOC,'sep',{get:function() {return sep;}});

	
	DOC.createPage=createPage;
	DOC.createPages=createPages;
	DOC.addMarkups=addMarkups;
	DOC.evolvePage=evolvePage;
	DOC.findMRCA=findMRCA;
	DOC.migrate=migrate; 
	DOC.downgrade=migrate; //downgrade to parent
	DOC.migrateMarkup=migrateMarkup; //for testing
	DOC.getLeafPages=getLeafPages;
	DOC.findPage=findPage;
	DOC.pageByName=pageByName;
	DOC.toJSONString=toJSONString;

	DOC.map=map;
	DOC.pageNames=pageNames;
	DOC.endCreatePages=endCreatePages;

	if (docjson) DOC.createPages(docjson,markupjson);
	dirty=0;
	
	Object.freeze(DOC);
	return DOC;
};
/*
	TODO move user markups to tags
*/
/*
var splitInscriptions=function(doc,starts) {
	var combined="",j=0;
	var inscriptions=[],oldunitoffsets=[0];
	for (var i=1;i<doc.pageCount;i++) {
		var page=doc.getPage(i);
		var pageStart=doc.maxInscriptionLength*i;
 		combined+=page.inscription;
		oldunitoffsets.push(combined.length);
	}
	var last=0,newunitoffsets=[0];
	starts.map(function(S){
		var till=oldunitoffsets[ S[0] ]+ S[1];
		newunitoffsets.push(till);
		inscriptions.push( combined.substring(last,till));
		last=till;
	})
	inscriptions.push( combined.substring(last));
	newunitoffsets.push(combined.length);
	return {inscriptions:inscriptions,oldunitoffsets:oldunitoffsets , newunitoffsets:newunitoffsets};
}

var sortedIndex = function (array, tofind) {
  var low = 0, high = array.length;
  while (low < high) {
    var mid = (low + high) >> 1;
    array[mid] < tofind ? low = mid + 1 : high = mid;
  }
  return low;
};

var addOldUnit=function() {
// convert old unit into tags 
}

var reunitTags=function(tags,R,newtagname) {
	var out=[];
	tags.map(function(T){
		if (T.name===newtagname) return;
		var tag=JSON.parse(JSON.stringify(T));
		var pos=R.oldunitoffsets[T.sunit]+T.soff;
		var p=sortedIndex(R.newunitoffsets,pos+1)-1;
		if (p==-1) p=0;
		tag.sunit=p;tag.soff=pos-R.newunitoffsets[p];

		eunit=T.eunit||T.sunit;eoff=T.eoff||T.soff;
		if (eunit!=T.sunit || eoff!=T.soff) {
			pos=R.oldunitoffsets[eunit]+eoff;
			p=sortedIndex(R.newunitoffsets,pos)-1;
			if (p==-1) p=0;
			if (eunit!=T.sunit) tag.eunit=p;
			if (eoff!=T.soff)   tag.eoff=pos-R.newunitoffsets[p];
		}
		out.push(tag);
	});
	return out;
}
var reunit=function(doc,tagname,opts) {
	var unitstarts=[];
	doc.tags.map(function(T){
		if (T.name===tagname)	unitstarts.push([T.sunit,T.soff]);
	});

	var R=splitInscriptions(doc,unitstarts);
	var newdoc=createDocument();
	R.inscriptions.map(function(text){newdoc.createPage(text)});

	newdoc.tags=reunitTags(doc.tags,R,tagname);
	return newdoc;
}
*/
// reunit is too complicated, change to fission
// a big chunk of text divide into smaller unit
//
module.exports={ createDocument: createDocument};
},{"./markup":"d:\\ksana2015\\ketaka\\src\\markup.js","./persistentmarkup_pouchdb":"d:\\ksana2015\\ketaka\\src\\persistentmarkup_pouchdb.js"}],"d:\\ksana2015\\ketaka\\src\\docview.jsx":[function(require,module,exports){
/** @jsx React.DOM */
/*
  maintain selection state of a surface
  context menu
*/
var Surface=require("./docsurface.jsx"); 
//var bootstrap=require("bootstrap");
var cssgen=require("./cssgen");
//var linkbymenu=require("./linkbymenu.jsx");
//var linktomenu=require("./linktomenu.jsx");//possible link to
var React=require("react");
var Docview = React.createClass({displayName: "Docview",
  componentWillMount:function() {
    if (this.props.page) this.offsets=this.props.template.tokenize(this.props.page.inscription).offsets;
    else this.offsets=[];
  },
  shouldComponentUpdate:function(nextProps,nextState) {
    var p=this.props,np=nextProps;
    var s=this.state,ns=nextState;
    return (p.page!=np.page || p.pageid!=np.pageid ||
     s.selstart!=ns.selstart || s.sellength!=ns.sellength
     ||s.newMarkupAt!=ns.newMarkupAt
     ||this.hits!=np.hits
     ||this.state.linkby!=nextState.linkby
     ||this.state.linkto!=nextState.linkto);

  },
  componentWillUpdate:function(nextProps,nextState) {
    if (nextProps.pageid!=this.props.pageid) {
      nextState.selstart=0;
      nextState.sellength=0;
      //nextState.newMarkupAt=null;
    }
     //if (nextProps.page) this.offsets=nextProps.template.tokenize(nextProps.page.inscription).offsets;
     else this.offsets=nextProps.template.tokenize(nextProps.page.inscription).offsets; 
  },
  componentDidUpdate:function() {
    if (this.state.newMarkupAt > -1) {
      this.refs.surface.openinlinedialog(this.state.newMarkupAt);
    }
  },
  getInitialState: function() { 
    var s=0,l=0,linktarget=null,linksource=null; 
    if (this.props.linktarget) {
      s=this.props.linktarget.start;
      l=this.props.linktarget.len;
      linktarget=this.props.linktarget;
      linksource=this.props.linksource;
    }
    return {selstart:s, sellength:l,newMarkupAt:null, linktarget:linktarget,linksource:linksource};
  },
  concatMarkups:function(m1,m2) { // m1 has higher priority
    var out=[],positions={};
    m1.map(function(m){ 
      out.push(m);
      for (var i=0;i<m.len;i++) positions[m.start+i]=true;
    });

    for (var i=0;i<m2.length;i++) {
      var m=m2[i],nom1=true;
      for (var j=0;j<m.len;j++) {
        nom1=nom1&&!positions[m.start+j];
      }
      if (nom1) out.push(m);
    }
    return out;
  },  
  getMarkups:function(M,offset) { //create dynamic markups from other users
    var page=this.props.page;
    var user=this.props.user;
    M=M||page.filterMarkup(function(){return true});
    if (!M.length) return []; 
    var filterCB=function(e){return e.payload.author===user.name};
    var out=M.filter(filterCB);
    if (user.admin) {
      var merged=M.filter(function(e){return e.payload.author!=user.name});
      merged=page.mergeMarkup(merged,this.offsets);
      if (typeof offset!='undefined'){
        merged=merged.filter(function(e){return offset>=e.start && offset<e.start+e.len});
      }
      out=this.concatMarkups(out,merged);
      out.sort(function(m1,m2){return m1.start-m2.start});
    }
    return out;
  } ,  
  getMarkupsAt:function(offset) {
    var M=this.props.page.markupAt(offset);
    return this.getMarkups(M,offset);
  },  
  getSelectedText:function(s,l) {
    if (!this.props.page || !this.props.page.inscription) return "";
    s=s||this.state.selstart;
    l=l||this.state.sellength;

    return this.props.page.inscription.substr(s,l);
  },
  selectedToken:function() {
    if (!this.offsets || !this.offsets.length) return {};
    var s=this.offsets.indexOf(this.state.selstart);
    var e=this.offsets.indexOf(this.state.selstart+this.state.sellength);
    return {start:s,len:e-s};
  },
  openlinkmenu:function(x,y,name) {
    var obj=this.refs[name];
    if (obj) {
      x=x-obj.getDOMNode().parentElement.offsetLeft;
      var menu=obj.getDOMNode();
      menu.classList.add("open");
      menu.style.left=x+'px';
      menu.style.top=(y-this.getDOMNode().offsetTop)+'px'; 
      
    }
  }, 
  showlinkbymenu:function(e) {
    var x=e.pageX, y=e.pageY;
    this.setState({linkby:this.linkby});
    setTimeout( this.openlinkmenu.bind(this,x,y,"linkbymenu"),200);
  },
  showlinktomenu:function(e) {
    var x=e.pageX, y=e.pageY;
    this.setState({linkto:this.linkto});
    setTimeout( this.openlinkmenu.bind(this,x,y,"linktomenu"),200);
  },
  /*
  linkByMenu:function() {
    if (this.state.linkby && this.state.linkby.length) {
      return linkbymenu({ref:"linkbymenu",linkby:this.linkby,action:this.action});
    } else {
      return <span></span>
    }
  },
  linkToMenu:function() {
    if (this.state.linkto && this.state.linkto.length) {
      var linksource={
        page:this.props.page
        ,pagename:this.props.page.name
        ,db:this.props.kde.dbname
        ,file:this.props.page.doc.meta.filename
        ,pageid:this.props.pageid
        ,start:this.quote.start
        ,len:this.quote.len
        ,kde:this.props.kde
      };
      return linktomenu({ref:"linktomenu",linkto:this.linkto,  linksource:linksource,action:this.action});
    } else {
      return <span></span>
    }
  },
  */
  contextMenu:function() {
    var sel=this.selectedToken();
    if (this.props.template.contextmenu) {
      var text=this.getSelectedText();
      return React.createElement(this.props.template.contextmenu,
        {ref:"menu",user:this.props.user, action:this.action, 
        start:sel.start,len:sel.len,
        selstart:this.state.selstart,sellength:this.state.sellength,
        text:this.getSelectedText()}
      );  
    } else {
      return React.createElement("span", null)
    }    
  },

  onTagSet:function(tagset,uuid) {
    if (!tagset || !tagset.length)return;
    if (JSON.stringify(this.tagset)!=JSON.stringify(tagset)) {
      this.tagset=tagset;
      cssgen.applyStyles(this.props.styles,tagset,"div[data-id='"+uuid+"'] ");
    }
  }, 
  addSuggestion:function(start,len,defaulttext) {
    var text=this.getSelectedText(start,len)+defaulttext;
    var payload={type:"suggest",
                  author:this.props.user.name,
                  text:text
                };
    this.props.page.clearMarkups(start,len,this.props.user.name);
    this.props.page.addMarkup(start,len,payload);

    this.setState({selstart:start+len,sellength:0,newMarkupAt:start});
  },
  findMistake:function(direction) {
    var sel={start:0,len:0};
    var M=this.getMarkups();
    M =M.sort(function(m1,m2){return m1.start-m2.start});
    var s=this.state.selstart+this.state.sellength;
    if (!M.length) return sel;
    if (direction>0) {
      for (var i=0;i<M.length;i++) {
        if (this.props.user.admin ==true && M[i].start>=s && M[i].payload.author != this.props.user.name) {
          sel.start=M[i].start;sel.len=M[i].len;
          break;
        }
        else if (this.props.user.admin !=true && M[i].start>=s && M[i].payload.author == this.props.user.name && M[i].payload.type == "suggest") {
          sel.start=M[i].start;sel.len=M[i].len;
          break;
        }
      }
    } else if (direction<0) {
      for (var i=M.length-1;i>-1;i--) {
        if (M[i].start+M[i].len<s && M[i].payload.author != this.props.user.name) {
          sel.start=M[i].start;sel.len=M[i].len;
          break;
        }
         else if (this.props.user.admin !=true && M[i].start+M[i].len<s && M[i].payload.author == this.props.user.name && M[i].payload.type == "suggest") {
          sel.start=M[i].start;sel.len=M[i].len;
          break;
        }
      };
    }
    return sel;
  },
  goPrevMistake:function() {
    var sel=this.findMistake(-1);
    if (sel.start > -1 && sel.len != 0) {
      this.setState({selstart:sel.start,sellength:sel.len,newMarkupAt:sel.start});
    }
    return sel;
  },
  goNextMistake:function() {
    var sel=this.findMistake(1);
    if (sel.start > -1 && sel.len != 0) {
      this.setState({selstart:sel.start,sellength:sel.len,newMarkupAt:sel.start});
    //return sel.start;
    }
  return sel;
  },
  goNextPageMistake:function(start,len) {
  this.setState({selstart:start,sellength:len,newMarkupAt:start});
  },
  goPrevPageMistake:function(start,len) {
  this.setState({selstart:start,sellength:len,newMarkupAt:start});
  },
  action:function() {
    var maxlen=10;
    var args = [],r,username=this.props.user.name;
    var ss=this.state.selstart, sl=this.state.sellength;
    var newstart=this.state.selstart+this.state.sellength;

    Array.prototype.push.apply( args, arguments );
    var action=args.shift();
    if (action=="strikeout") {
      if (sl>maxlen || sl == 0) return;

      this.props.page.strikeout(ss,sl,username);
      this.setState({selstart:newstart+1,sellength:0});
    } else if (action=="addsuggestion") {
      var ss=args[0]||this.state.selstart;
      var sl=args[1]||this.state.sellength;
      var text=args[2]||"";
      if (sl>maxlen) return;
      this.addSuggestion(ss,sl,text);
    } else if (action=="addmarkup") {
      var payload=args[0];
      var silent=args[1];
      payload.author=this.props.user.name;
      if (sl>maxlen) return;
      this.props.page.addMarkup(ss,sl,payload); 
      this.setState({selstart:newstart,sellength:0});
      if (!silent) this.setState({newMarkupAt:ss});
    } else if (action=="addmarkupat") {
      var payload=args[2];
      var silent=args[3];
      payload.author=this.props.user.name;
      if (args[1]>maxlen) return;
      this.props.page.addMarkup(args[0],args[1],payload); 
      this.setState({selstart:newstart,sellength:0,newMarkupAt:null});
    } else if (action=="clearmarkup") {
      var filename=this.props.dbname+args[0];
      var that=this;
      this.props.page.clearMarkups(ss,sl,username,filename);
      that.setState({selstart:newstart,sellength:0});
    } else if (action=="getmarkupsat") {
      return this.getMarkupsAt(args[0]);
/*      
    } else if (action=="copy") {
      if (typeof process=="undefined") return;
      var text=args[0];
      var gui = nodeRequire('nw.gui');
      var clipboard = gui.Clipboard.get();
      clipboard.set(text);
*/
    } else if (action=="caretmoved") {
      this.showLinkButtons(args[0],args[1],args[2]);
    } else if (action=="openlink") { 
      if (this.quote) this.setState({selstart:this.quote.start,sellength:this.quote.len}); //select the quote
      return this.props.action.apply(this,arguments); //pass to parent
    } else {
      return this.props.action.apply(this,arguments);
    }
  },
  showLinkButtons:function(left,top,height) {
    return;
    if (this.linktimer) clearTimeout(this.linktimer);
    var that=this;
    this.linktimer=setTimeout(function(){
      var linkto=that.refs.linkto.getDOMNode();
      var linkby=that.refs.linkby.getDOMNode();
      that.props.action("linkto",that.state.selstart,that.state.sellength,function(arr,quote){
        if (arr.length){
          that.quote=quote;
          that.linkto=arr;
          linkto.style.top=top - Math.floor(linkto.offsetHeight/3); 
          linkto.style.left=left ;  
          linkto.style.visibility="visible";
        } else linkto.style.visibility="hidden";
      });
      that.props.action("linkby",that.state.selstart,that.state.sellength,function(arr){
        if (arr.length) {
          that.linkby=arr;
          linkby.style.top=top-height-linkto.offsetHeight-Math.floor(linkby.offsetHeight/1.5);
          linkby.style.left=left-linkby.offsetWidth;
          linkby.style.visibility="visible";
        } else linkby.style.visibility="hidden";
      }); 
    },500);
  },  
  closemenu:function() {
    this.refs.menu.getDOMNode().classList.remove("open");
  },
  openmenu:function(x,y) {
    if (this.refs.menu) {
      var menu=this.refs.menu.getDOMNode();
      menu.classList.add("open");
      menu.style.left=x+30+'px';
      //var menuheight=menu.querySelector(".dropdown-menu").offsetHeight;
      //var yy=y-this.getDOMNode().offsetTop;
      //if (yy+menuheight-30>this.getDOMNode().offsetHeight) {
      //yy-=menuheight+30;
      //}
      //if (yy<0) yy=0;
      menu.style.top=y-200+'px'; 
    }
  },
  onSelection:function(start,len,x,y,e) {
    this.setState({selstart:start,sellength:len,newMarkupAt:null}); //open for jump next page
    if (this.refs.menu && this.refs.menu.onPopup) {
      if (len && e && e.button==2) {
        var context={
          text:this.getSelectedText(start,len),
          selstart:start,
          sellength:len
        }
        this.refs.menu.onPopup(context); //set menu context
        setTimeout( this.openmenu.bind(this,x,y),200);
      } else {
        this.closemenu();
      }
    }

    if (this.props.onSelection) {  
      this.props.onSelection(start,len,x,y);
    }
    this.props.action("makingselection",start,start+len);
  },
  render: function() {
    //console.log("docview render");
    this.hits=this.props.hits;
    return (
      React.createElement("div", {className: "docview main-wrapper"}, 
      this.contextMenu(), 
       React.createElement(Surface, {ref: "surface", 
                page: this.props.page, 
                user: this.props.user, 
                action: this.action, 
                template: this.props.template, 
                selstart: this.state.selstart, 
                sellength: this.state.sellength, 
                onSelection: this.onSelection, 
                onTagSet: this.onTagSet, 
                linktarget: this.state.linktarget, 
                linksource: this.state.linksource, 
                preview: this.props.preview, 
                isSkip: this.props.isSkip, 
                hits: this.props.hits
                }
       )
      )
    );
  }
});
module.exports=Docview;
/*
      <div ref="linkto" className="btnlinkto-container">
        <span onClick={this.showlinktomenu} className="btnlinkto">{"\u21dd"}</span>
      </div> 
      <div ref="linkby" className="btnlinkby-container">
        <span onClick={this.showlinkbymenu} className="btnlinkby">{"\u21c7"}</span>
      </div>

*/
},{"./cssgen":"d:\\ksana2015\\ketaka\\src\\cssgen.js","./docsurface.jsx":"d:\\ksana2015\\ketaka\\src\\docsurface.jsx","react":"react"}],"d:\\ksana2015\\ketaka\\src\\docview_tibetan.jsx":[function(require,module,exports){
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

var Docview_tibetan = React.createClass({displayName: "Docview_tibetan",
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
		markups[i].pagename=this.getPageName();
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
		  if(suggest_markups[j].payload.state != "" && type == 1 && suggest_markups[j].payload.type != "revision") {
		     suggest_markups[j].payload.state = "";
			 final_markups[final_markups.length]= suggest_markups[j];
		  }
          else if(suggest_markups[j].payload.author == markups[i].payload.contributor && suggest_markups[j].payload.type != "revision") {
            suggest_markups[j].payload.state = "approve";
			final_markups[final_markups.length]= suggest_markups[j];
          }
          else if(suggest_markups[j].payload.type == "suggest" && suggest_markups[j].payload.author != this.props.user.name && suggest_markups[j].payload.type != "revision") {
            suggest_markups[j].payload.state = "reject";
			final_markups[final_markups.length]= suggest_markups[j];
          } 
          else if(suggest_markups[j].payload.type == "suggest" && suggest_markups[j].payload.type != "revision")
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
  closeAlert:function(e) {
      $(".alert_err").delay(200).addClass("in").fadeOut(200);
  },
  getAlert:function() {
    return  ( React.createElement("div", null, React.createElement("div", {className: "alert_ok alert-success", style: {width:window.innerWidth*0.95}}, 
            React.createElement("strong", null, "Saved successfully!")
            ), React.createElement("div", {className: "alert_err alert-danger", style: {width:window.innerWidth*0.95}}, 
            React.createElement("a", {href: "#", id: "error", className: "close", onClick: this.closeAlert}, "×"), React.createElement("strong", null, "Saved failed!")
            )));
  },
  render: function() {
    localStorage.setItem(this.storekey(),this.state.pageid);
    if (!this.state.doc) return React.createElement("span", null)
    return ( 
      React.createElement("div", null, 
      React.createElement("div", {className: "docview_tibetan", style: {marginLeft:"20px",height:document.body.offsetHeight-68+"px"}}, 
        React.createElement("div", null, this.getAlert()), 
        React.createElement("div", null, this.nav()), 
        React.createElement("div", {id: "inlinetext", style: {height:document.body.offsetHeight-(document.body.offsetWidth -20)/4.17-110+"px",overflowY:"scroll",overflowX:"hidden"}}, 
        React.createElement(Docview, {ref: "docview", 
            page: this.page(), 
            pageid: this.state.pageid, 
            user: this.props.user, 
            dbname: this.props.kde.dbname, 
            template: this.props.project.tmpl, 
            customfunc: this.props.kde.customfunc, 
            styles: styles, 
            isSkip: isSkip, 
            hits: this.state.activeHits, 
            autoselect: this.props.selection, 
            action: this.action
          })
          )
      )
      )
    );
  }
});
module.exports=Docview_tibetan;
},{"./document":"d:\\ksana2015\\ketaka\\src\\document.js","./docview.jsx":"d:\\ksana2015\\ketaka\\src\\docview.jsx","./imageview.jsx":"d:\\ksana2015\\ketaka\\src\\imageview.jsx","./legacy2014":"d:\\ksana2015\\ketaka\\src\\legacy2014.js","./markup":"d:\\ksana2015\\ketaka\\src\\markup.js","./nav_tibetan.jsx":"d:\\ksana2015\\ketaka\\src\\nav_tibetan.jsx","./persistentmarkup_pouchdb":"d:\\ksana2015\\ketaka\\src\\persistentmarkup_pouchdb.js","./styles":"d:\\ksana2015\\ketaka\\src\\styles.js","ksana-analyzer":"d:\\ksana2015\\node_modules\\ksana-analyzer\\index.js","ksana-search":"d:\\ksana2015\\node_modules\\ksana-search\\index.js","react":"react"}],"d:\\ksana2015\\ketaka\\src\\element_comment_tibetan.jsx":[function(require,module,exports){
var React=require("react");
var element_comment_tibetan = React.createClass({displayName: "element_comment_tibetan",
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
    React.createElement("span", {tabindex: "0", href: "#", className: "viewonlyHolder", 
          "data-toggle": "popover", 
          onClick: this.openViewonly, 
          "data-trigger": "focus", 
          "data-content": this.props.payload.hint +" by "+this.props.payload.author, 
          title: this.props.payload.type+" by "+this.props.payload.author
    }, React.createElement("span", {className: "author"}, this.props.payload.author.substr(0,5)), ".")
    );
  }
});
module.exports=element_comment_tibetan;
},{"react":"react"}],"d:\\ksana2015\\ketaka\\src\\filelist.jsx":[function(require,module,exports){
var React=require("react");
var FileListing = React.createClass({displayName: "FileListing",
  getInitialState:function() {
    return {selected:0,hovered:-1};
  },
  select:function(e) {
    var ee=e.target.parentElement.attributes['data-i'];
    if (!ee) return;
    var selected=parseInt(ee.value);
    this.setState({selected:selected});
    this.props.onSelectFile(selected);
  },
  shouldComponentUpdate:function(nextProps,nextState) {

    var shouldUpdate= (nextState.hovered != this.state.hovered || this.state.hovered==-1
      ||nextState.selected!=this.state.selected || this.props.files!=nextProps.files);

    if (this.props.files!=nextProps.files) {
      if (nextProps.selected!=this.state.selected) {
        nextState.selected=nextProps.selected;
      }
    }
    return shouldUpdate;
  },
  leave:function(e) {
    this.setState({hovered:-1});
  },
  openfile:function(e) {
    var e=e.target;
    while (e) {
      if (e.attributes['data-i']) {
        var i=parseInt(e.attributes['data-i'].value);
        break;
      } else e=e.parentElement;
    }
    this.setState({selected:i});
    this.props.onOpenFile(i);
  },
  getSegNameInFile:function(i) {
      var segnames=this.props.kde.get("segnames");
      var filerange=this.props.kde.getFileRange(i);
      
      return {start:segnames[filerange[0]],end: segnames[filerange[1]]}
  },
  renderFiles:function() {
    var cls="",out=[], filestart=this.props.start;
    for (var i=0;i<this.props.files.length;i++) {
      var f=this.props.files[i],hit="";
      if (this.props.hits) hit=this.props.hits[filestart+i]?this.props.hits[filestart+i].length:"";
      if (!hit) hit="";
      if (i==this.state.selected) cls="success"; else cls="";
	  var segnames=this.getSegNameInFile(i);
      out.push(React.createElement("tr", {key: 'f'+i, onClick: this.select, 
           onMouseEnter: this.hoverFile, onMouseLeave: this.leave, 
           className: cls, "data-i": i}, 
        React.createElement("td", {onDoubleClick: this.openfile}, f.substring(0,f.length-4), 
        
        React.createElement("span", {className: "label label-info"}, hit), 
        React.createElement("span", {className: "pull-right", style: {visibility:this.state.hovered==i?"":"hidden"}}, 
        React.createElement("span", null, segnames.start, "-", segnames.end), 
		React.createElement("button", {className: "btn btn-success", onClick: this.openfile}, "Open")
        )
        )
        ));
    };
    return out;
  }, 
  hoverFile:function(e) {
    if (e.target.parentElement.nodeName!='TR') return;
    var hovered=e.target.parentElement.attributes['data-i'].value;
    if (this.state.hovered==hovered) return;

    this.setState({hovered:hovered});
  },
  render:function() {
    return React.createElement("div", {className: "fileList"}, 
    React.createElement("table", {className: "table table-hover"}, 
    React.createElement("tbody", null, this.renderFiles())));
  }
});

var filelist = React.createClass({displayName: "filelist",
  getInitialState: function() {
    return {bar: "world",files:[],selectedFile:0};
  },
  shouldComponentUpdate:function(nextProps,nextState) {
    return (nextProps.kde.activeQuery!=this.activeQuery || typeof this.activeQuery=="undefined"
      || nextState.files!=this.state.files|| nextState.folders!=this.state.folders);
  }, 
  selectFile:function(i) {
    var f=this.state.folder+'/'+this.state.files[i];
    this.props.kde.activeFile=f;
    this.props.action("selectfile",this.props.kde,f);
  },
  openFile:function(i) {
    var f=this.state.folder+'/'+this.state.files[i];
    var gotopageid,linktarget,linksource;
    if (this.props.autoopen)  {
      gotopageid=this.props.autoopen.pageid;
      linktarget=this.props.autoopen.linktarget;
      linksource=this.props.autoopen.linksource;
    }
    this.props.action("openfile",this.props.kde.kdbid,f,gotopageid,null,linktarget,linksource);
    if (this.props.autoopen) {
      this.props.autoopen.pageid="";
      this.props.autoopen.linktarget=null;
    }
    this.setState({selectedFile:i});
  },
  getFileHits:function() {
    if (!this.props.kde.activeQuery) return [];
    return this.props.kde.activeQuery.byFile;
  },
  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement(FileListing, {files: this.state.files, 
            selected: this.state.selectedFile, 
            onSelectFile: this.selectFile, 
            onOpenFile: this.openFile, 
            start: this.state.filestart, 
            hits: this.getFileHits()}
        )
      )
    );
  },
  componentDidMount:function() {
    var that=this;
    this.props.kde.get("fileNames",function(files){
      that.setState({"files":files});
    })
  }
});
module.exports=filelist;
},{"react":"react"}],"d:\\ksana2015\\ketaka\\src\\imageview.jsx":[function(require,module,exports){
var React=require("react"); 
var imageview = React.createClass({displayName: "imageview",
  getInitialState: function() {
    return {bar: "world"};
  },
  expandFileName:function(src) {
    if (src.substring(0,4)=="http") return src;
    var s=src.split('.');
    var folder=s[0];
    var filename=s[1];
    folder='00'+folder;
    folder=folder.substring(folder.length-3);
    filename='00'+filename;
    filename=filename.substring(filename.length-4);

    return "http://dharma-treasure.org/kangyur_images/lijiang/"
    +folder+'/'+folder+'-'+filename+".jpg";
  }, 
  adjustImage:function() {
    //this.refs.imagediv.getDOMNode().style.height="740";
    var maxwidth=document.offsetWidth/2;
    if (!this.props.project.setting) return ;
    var adjustImage=this.props.project.setting.adjustImage;
    var img=this.refs.image.getDOMNode();
    var container=img.parentElement.parentElement;
    if (adjustImage) adjustImage(img,this.props.pagename,container);
  }, 
  componentDidMount:function() {
    this.adjustImage(); 
  }, 
  componentDidUpdate:function() {
    this.adjustImage();
  },   
  render: function() {
    return (
      React.createElement("div", {ref: "imagediv", id: "imagediv"}, 
        React.createElement("img", {ref: "image", className: "sourceimage", src: this.expandFileName(this.props.src)})
      )
    );
  }
}); 
//<button className="btn btn-default">image control buttons</button>
module.exports=imageview;
},{"react":"react"}],"d:\\ksana2015\\ketaka\\src\\inlinedialog_accept_tibetan.jsx":[function(require,module,exports){
var React=require("react");
var inlinedialog_accept_tibetan = React.createClass({displayName: "inlinedialog_accept_tibetan",
  apply:function(e) {
    this.props.action("markupupdate");
  },
  keyup:function(e) {
    if (e.keyCode==13)  this.apply(e);
    else if (e.keyCode==27) this.props.action("markupdate");
  },
  clear:function() {
    var n=this.refs.inputtext.getDOMNode();
    n.focus();
    n.value="";
  },
  remove:function() {
    this.props.action("removemarkup",this.props.markup);
  },
  at_moveto:function() {
    var target = document.getElementById("accept_tibetan").style;
    var range = window.innerWidth - 400;
    var width = document.getElementById("points").value*(range/10);
    target.left = width+"px";
  },
  markup:function() {
    return this.props.markup.payload;
  },
  contributor:function() {
    if (this.markup().contributor){
      return  React.createElement("span", null, 
          React.createElement("span", {className: "col-sm-4"}, React.createElement("h5", null, "contributor")), 
          React.createElement("span", {className: "col-sm-6"}, React.createElement("h5", null, this.markup().contributor))
        )
    } else return null;
  },
  render: function() {
    return ( 
      React.createElement("div", {onKeyUp: this.onkeyup, id: "accept_tibetan", className: "inlinedialog well accept_pos", style: {marginTop:"70px"}}, 
        React.createElement("span", {className: "col-md-12"}, this.props.text), 
        React.createElement("div", null, 
           React.createElement("input", {type: "range", id: "points", min: "0", max: "10", defaultValue: "0", style: {width:"400px"}, onMouseUp: this.at_moveto})
          ), 
          React.createElement("span", {className: "col-md-12"}, 
            React.createElement("span", {className: "col-md-4"}, React.createElement("h5", null, "suggestion")), 
            React.createElement("span", {className: "col-md-6"}, React.createElement("h5", null, this.markup().text)), 
            React.createElement("span", {className: "col-md-2"}, React.createElement("input", {checked: this.markup().insert, type: "checkbox"}))
          ), 
         React.createElement("span", {className: "col-md-12"}, this.contributor()), 
        React.createElement("span", null, 
          React.createElement("span", {className: "col-md-4 col-md-offset-4"}, 
            React.createElement("button", {className: "form-control btn btn-warning control_S-halfsize", onClick: this.remove}, "Reset")
          ), 
          React.createElement("span", {className: "col-md-4"}, 
            React.createElement("button", {className: "form-control btn btn-success control_S-halfsize", onClick: this.apply}, "Ok")
          )
        )
      )
    );
  },
  focus:function() {
    if (this.refs.inputtext) this.refs.inputtext.getDOMNode().focus();
  },
  componentDidMount:function() {
    setTimeout(  this.focus,300);
  },
});
module.exports=inlinedialog_accept_tibetan;
},{"react":"react"}],"d:\\ksana2015\\ketaka\\src\\inlinedialog_applychange.jsx":[function(require,module,exports){
var React=require("react");
var Change=React.createClass({displayName: "Change",
  author_error:function(e) {
     var img = e.target;
     img.src= 'images/photo.png';
  },
  render:function() {
    var opts={
      "className":"btn btn-success control_S-halfsize",
      "data-choice":this.props.i, 
      "name":this.props.name,
      "onClick":this.props.select
    }
    return (
     React.createElement("span", {"data-date": this.props.now, className: "col-md-12"}, 
       React.createElement("span", {className: "col-md-2"}, React.createElement("img", {src: "photo/"+this.props.m.author+".jpg?"+ new Date().getTime(), onError: this.author_error, style: {height:"40px",width:"40px",backgroundColor:"#dddddd"}}), React.createElement("h6", {className: "pull-left", style: {color:"blue"}}, this.props.m.author)), 
       React.createElement("span", {className: "col-md-7", style: {wordBreak:"break-all",fontSize:"80%",display:"inline-block"}}, this.props.m.text, React.createElement("br", null), React.createElement("h5", null, this.props.m.reason)), 
       React.createElement("span", {className: "col-md-3"}, React.DOM.button(opts,"Approve"))
    ));
  }
})
var inlinedialog_applychange = React.createClass({displayName: "inlinedialog_applychange",
  getInitialState: function() {
    return {now : new Date()};
  },
  keyup:function(e) {
    if (e.keyCode==13)  this.myanwser(e);
    else if (e.keyCode==27) this.props.action("markupdate");
  },
  markup:function() {
    return this.props.markup.payload;
  },
  select:function(e) {
    var selected=parseInt(e.target.attributes['data-choice'].value);
    var accepted=this.markup().choices[selected];
    var payload={type:"revision" ,text:accepted.text, 
        contributor:accepted.author};
    var m=this.props.markup;
    this.props.action("addmarkupat",m.start,m.len,payload);
    this.props.action("nextmistake","next");
  },
  myanwser:function() {
    var inputtext=this.refs.inputtext.getDOMNode().value||this.refs.origintext.getDOMNode().innerHTML;
    var payload={type:"revision" ,text:inputtext};
    var m=this.props.markup;
    this.props.action("addmarkup",payload,true);
    this.props.action("nextmistake","next");
  },
  choices:function(name) {
    var out=[];
    for (var i=0;i<this.markup().choices.length;i++) {
      out.push(Change({
        ref:'o'+i,
        now:this.state.now,
        select:this.select,
        m:this.markup().choices[i],
        i:i,name:name}));
    }
    return out;
  },
  setselected:function() {
    if (this.markup().selected) {
      this.refs['o'+(this.markup().selected-1)].getDOMNode()
      .querySelector("input[type=radio]").checked=true;
    } else {
      var radio=this.getDOMNode().querySelectorAll("input[type=radio]");
      for (var i=0;i<radio.length;i++) {
        radio[i].checked=false;
      }
    }
  },
  ac_moveto:function() {
    var target = document.getElementById("applychange").style;
    var range = window.innerWidth - 500;
    var width = document.getElementById("points").value*(range/10);
    target.left = width+"px";
  },
  componentDidMount:function() {
    this.setselected();
  },
  componentDidUpdate:function() {
    this.setselected();
  },
  clear:function() {
    var n=this.refs.inputtext.getDOMNode();
    n.focus();
    n.value="";
  },  
  close:function() {
    this.props.action("markupupdate");
    this.props.action("nextmistake","next");
  },
  otherAnswer:function() {
    return (
    React.createElement("span", {className: "col-md-12"}, 
        React.createElement("span", {className: "col-md-2", style: {fontSize:"50%",marginTop:"8px"}}, "Suggestion"), 
        React.createElement("span", {className: "col-md-7"}, React.createElement("input", {ref: "inputtext", className: "focus form-control input-lg"})), 
        React.createElement("span", {className: "col-md-3"}, React.createElement("button", {className: "btn btn-success control_S-halfsize", onClick: this.myanwser}, "Mine is better"))
    ));
  },
  render: function() {
    return (
      React.createElement("div", {onKeyUp: this.keyup, id: "applychange", className: "col-md-12 inlinedialog well", style: {width:"500px",marginTop:"70px"}}, 
      React.createElement("div", null, 
        React.createElement("input", {type: "range", id: "points", min: "0", max: "10", defaultValue: "0", style: {width:"500px"}, onMouseUp: this.ac_moveto})
       ), 
      React.createElement("span", {className: "col-md-6"}, React.createElement("span", {ref: "origintext"}, this.props.text)), 
      React.createElement("span", {className: "col-md-3"}, React.createElement("button", {className: "btn btn-warning ignore_button control_S-halfsize", style: {marginLeft:"-8px"}, onClick: this.close}, "Ignore")), 
      React.createElement("span", {className: "col-md-3"}, React.createElement("button", {className: "btn btn-danger control_S-halfsize", style: {marginLeft:"-8px"}, onClick: this.myanwser}, "Reject")), 
      React.createElement("hr", null), 
      this.choices("radioname"), 
      this.otherAnswer()
      )
    );
  } 
});
module.exports=inlinedialog_applychange;
},{"react":"react"}],"d:\\ksana2015\\ketaka\\src\\inlinedialog_comment_tibetan.jsx":[function(require,module,exports){
var React=require("react");
var inlinedialog_comment_tibetan = React.createClass({displayName: "inlinedialog_comment_tibetan",
  apply:function(e) {
    this.markup().text=this.props.text;
    this.markup().hint=this.refs.comment.getDOMNode().value;
    this.props.action("markupupdate");
  },
  keyup:function(e) {
    if (e.keyCode==27) {
      if (this.refs.comment.getDOMNode().value=="") {
          this.remove();
      } else {
        this.props.action("markupdate");  
      }      
    }
  }, 
  ct_moveto:function() {
    var target = document.getElementById("comment_tibetan").style;
    var range = window.innerWidth - 400;
    var width = document.getElementById("points").value*(range/10);
    target.left = width+"px";
  },
  remove:function() {
    if(this.props.markup.payload.hint == null) this.props.action("removemarkup",this.props.markup);
    else this.props.action("dismissmarkup",this.props.markup);
  },
  markup:function() {
    return this.props.markup.payload;
  },
  render: function() {
    return (
      React.createElement("div", {onKeyUp: this.keyup, id: "comment_tibetan", className: "inlinedialog well", style: {marginTop:"70px"}}, 
        React.createElement("div", null, 
           React.createElement("input", {type: "range", id: "points", min: "0", max: "10", defaultValue: "0", style: {width:"400px"}, onMouseUp: this.ct_moveto})
          ), 
        React.createElement("span", {className: "col-sm-12"}, this.props.text), 
        React.createElement("span", {className: "col-sm-3"}, React.createElement("h5", null, "Comment")), 
        React.createElement("span", {className: "col-sm-9"}, 
        React.createElement("span", {className: "col-sm-12", style: {marginBottom:"5px"}}, React.createElement("textarea", {rows: "3", ref: "comment", className: "form-control input-lg"})), 
        React.createElement("span", {className: "col-sm-6"}, React.createElement("button", {className: "form-control btn btn-warning control_S-halfsize", onClick: this.remove}, "Cancel")), 
        React.createElement("span", {className: "col-sm-6"}, React.createElement("button", {className: "form-control btn btn-success control_S-halfsize", onClick: this.apply}, "Apply"))
        )
      )
    );
  },
  focus:function() {
    if (this.refs.comment) this.refs.comment.getDOMNode().focus();
  },
  componentDidMount:function() {
    if (this.markup().hint && this.markup().hint != "undefined") this.refs.comment.getDOMNode().value = this.markup().hint;
    setTimeout(this.focus,300);
  },
  componentDidUpdate:function() {
    if (this.markup().hint && this.markup().hint != "undefined") this.refs.comment.getDOMNode().value = this.markup().hint;
  },
});
module.exports=inlinedialog_comment_tibetan;
},{"react":"react"}],"d:\\ksana2015\\ketaka\\src\\inlinedialog_makelink.jsx":[function(require,module,exports){
var React=require("react");
var inlinedialog_makelink = React.createClass({displayName: "inlinedialog_makelink",
  getInitialState: function() {
    return {bar: "world"};
  },
  apply:function() {
    this.props.action("makelink",this.props.page,this.props.linktarget,this.props.linksource);
  },
  cancel:function() {
    this.props.action("markupupdate");
  },
  render: function() {
    return ( 
      React.createElement("div", {className: "well"}, 
        React.createElement("span", {className: "input-group input-group-lg"}, 
          React.createElement("span", {className: "input-group-addon"}, "Makelink")
        ), 

        React.createElement("span", {className: "row"}, 
          React.createElement("span", {className: "col-sm-4"}, 
            React.createElement("button", {className: "form-control btn btn-danger", onClick: this.cancel}, "Cancel")
          ), 
          React.createElement("span", {className: "col-sm-8"}, 
            React.createElement("button", {className: "pull-right form-control btn btn-success", onClick: this.apply}, "Create Link")
          )
        )

      )
    );
  }
});
module.exports=inlinedialog_makelink;
},{"react":"react"}],"d:\\ksana2015\\ketaka\\src\\inlinedialog_suggest_tibetan.jsx":[function(require,module,exports){
var React=require("react");
var inlinedialog_suggest_tibetan = React.createClass({displayName: "inlinedialog_suggest_tibetan",
  apply:function() {    
    var text=this.refs.inputtext.getDOMNode().value;
    if (this.props.text==text) {
      this.remove(); //no chances
    } else {
      this.markup().text=text;  
      this.markup().reason=this.refs.reason.getDOMNode().value;
      this.markup().state = "";
    }
    this.props.action("markupupdate");
  },
  keyup:function(e) {
    if (e.keyCode==13)  this.apply(e);
    else if (e.keyCode==27) {
      if (this.refs.inputtext.getDOMNode().value==this.props.text) {
        this.props.action("removemarkup",this.props.markup);
      } else {
        this.props.action("markupdate");  //cancel
      }
    }
  }, 
  clear:function() {
    var n=this.refs.inputtext.getDOMNode();
    n.focus();
    n.value="";
  },
  st_moveto:function() {
    var target = document.getElementById("suggest_tibetan").style;
    var range = window.innerWidth - 400;
    var width = document.getElementById("points").value*(range/10);
    target.left = width+"px";
  },
  remove:function() {
    if(this.props.markup.payload.text == this.props.text) this.props.action("removemarkup",this.props.markup);
    else this.props.action("dismissmarkup",this.props.markup);
  },
  markup:function() {
    return this.props.markup.payload;
  },
  render: function() {
    if (this.props.markup.payload.state == "reject") {
      return (React.createElement("div", {onKeyUp: this.keyup, id: "suggest_tibetan", className: "inlinedialog well", style: {marginTop:"70px"}}, "This suggset has been rejected."));
      }
    else if (this.props.markup.payload.state == "approve") {
      return (React.createElement("div", {onKeyUp: this.keyup, id: "suggest_tibetan", className: "inlinedialog well", style: {marginTop:"70px"}}, "This suggset has been approved."));
      }
    else return (
       React.createElement("div", {onKeyUp: this.keyup, id: "suggest_tibetan", className: "inlinedialog well", style: {marginTop:"70px"}}, 
        React.createElement("div", null, 
           React.createElement("input", {type: "range", id: "points", min: "0", max: "10", defaultValue: "0", style: {width:"400px"}, onMouseUp: this.st_moveto})
          ), 
        React.createElement("span", null, this.props.text), React.createElement("br", null), 
        React.createElement("span", null, 
        React.createElement("span", {className: "col-sm-4"}, 
          React.createElement("h5", {className: "pull-right"}, "Suggestion"), 
          React.createElement("h5", {className: "pull-right"}, "Reason")
        ), 
          React.createElement("span", {className: "col-sm-8"}, 
            React.createElement("span", {className: "col-sm-12", style: {marginBottom:"10px"}}, React.createElement("input", {ref: "inputtext", type: "text", onMouseOver: this.st_moveto, className: "focus form-control input-lg", onKeyPress: this.change})), 
            React.createElement("span", {className: "col-sm-12", style: {marginBottom:"5px"}}, React.createElement("textarea", {rows: "2", ref: "reason", className: "form-control input-lg"})), 
            React.createElement("span", {className: "col-sm-6"}, React.createElement("button", {className: "form-control btn btn-warning control_S-halfsize", style: {marginLeft:"-20px"}, onClick: this.remove}, "Cancel")), 
            React.createElement("span", {className: "col-sm-6"}, React.createElement("button", {className: "form-control btn btn-success control_S-halfsize", onClick: this.apply}, "Apply"))
          )
        )
      )
    );
  },
  focus:function() {
    if (this.refs.inputtext) {
      var dn=this.refs.inputtext.getDOMNode();
      dn.focus();
      dn.selectionStart=dn.selectionEnd;
    }
  },
  componentDidMount:function() {
    if (this.refs.inputtext) {
          this.refs.inputtext.getDOMNode().value = this.markup().text;
          this.refs.reason.getDOMNode().value = this.markup().reason|| "";
    }

    setTimeout(this.focus,300);
  },
  componentDidUpdate:function() {
    if (this.refs.inputtext) {
      this.refs.inputtext.getDOMNode().value = this.markup().text;
      this.refs.reason.getDOMNode().value = this.markup().reason || "";
   }
  },
});
module.exports=inlinedialog_suggest_tibetan;
},{"react":"react"}],"d:\\ksana2015\\ketaka\\src\\legacy2014.js":[function(require,module,exports){
var toDoc=function(segnames,texts,others) {
	var D=require("./document");	
	var d=D.createDocument() ,revert=null;
	for (var i=0;i<texts.length;i++) {
		if (others.reverts && others.reverts[i].trim()) revert=JSON.parse(others.reverts[i]);
		else revert=null;
		var p=null;
		if (others.parents) p=others.parents[i];
		d.createPage({n:segnames[i],t:texts[i],p:p,r:revert});
	}
	if (others.markups) d.addMarkups(others.markups);
	d.endCreatePages();
	return d;
}

var getDocument=function(filename,markups,cb){
	var engine=this;
	var filenames=engine.get("filenames");

	if (typeof markups=="function")  { //no markups
		cb=markups;
		markups=null;
	}

	var i=filenames.indexOf(filename);
	if (i==-1) {
		cb(null);
	} else {
		var segnames=engine.getFileSegNames(i);
		var files=engine.get(["files",i],true,function(file){
			var parentId=null,reverts=null;
			if (file) {
				parentId=file.parentId;
				reverts=file.reverts;
			}
			engine.get(["filecontents",i],true,function(data){
				cb(toDoc(segnames,data,{parents:parentId,reverts:reverts,markups:markups}));
			});			
		});
	}
}

module.exports={getDocument:getDocument};
},{"./document":"d:\\ksana2015\\ketaka\\src\\document.js"}],"d:\\ksana2015\\ketaka\\src\\main.jsx":[function(require,module,exports){
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
var main = React.createClass({displayName: "main", 
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

    return {settings:null,tabs:tabs/*, auxs:auxs*/,pageid:1,error:"",db:null,projects:null,keyword:null};
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
       var caption =React.createElement("span", null, "   +   ");
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
           $(".alert_ok").delay(200).addClass("in").fadeOut(3000);
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
    if(this.state.tabs[1].pjname == "") {this.action("myalert",1);;return;}
    var node=$(this.refs.btn1.getDOMNode());
    node.popover({html:true});
    node.data("content", React.createElement(Searchmain, null) );
    node.data("action", this.action)
    node.popover('show');
    var $popcontent=node.siblings(".popover").find(".popover-content")
    React.renderComponent(React.createElement(Searchmain, {action: this.action, keyword: keyword, bambos: this.state.tabs, db: this.state.tabs[1].pjname, engine: this.state.tabs[1].pjname}),$popcontent[0]);
  },
  pop_profile:function() {
    var node=$(this.refs.btn2.getDOMNode());
    node.popover({html:true});
    node.data("content", React.createElement(About, null) );
    node.data("action", this.action)
    node.popover('show');
    var $popcontent=node.siblings(".popover").find(".popover-content")
    React.renderComponent(React.createElement(About, {action: this.action, db: this.state.projects[0].shortname, tab: this.state.tabs, project: this.state.projects[0]}),$popcontent[0]);
  },
  setting_button:function() {
    if(this.state.tabs[0].profile.su == true) return React.createElement("span", null, React.createElement("img", {src: "images/setting.png", className: "top_icon", onClick: this.user_profile}))
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
  return React.createElement("div", null, 
      React.createElement("div", {className: "container-fluid headerbar"}, 
      React.createElement("div", {className: "alert_err alert-danger", style: {width:window.innerWidth*0.97}}, 
            React.createElement("strong", null, "You need to open a project!")
      ), 
      React.createElement("div", {className: "col-md-8"}, 
      React.createElement("img", {src: "images/s_logo.png", className: "top_icon", onClick: this.startforwork}), 
      React.createElement("img", {src: "images/search.png", className: "top_icon", ref: "btn1", onClick: this.pop_search, "data-toggle": "popover1", title: "Search keyword", "data-placement": "bottom-right"}), 
      this.setting_button()), 
      React.createElement("div", {className: "col-md-4"}, 
      React.createElement("img", {src: "photo/"+this.state.tabs[0].text+".jpg?"+ new Date().getTime(), id: "tpic", className: "pull-right top_icon", ref: "btn2", "data-toggle": "popover2", title: "Open profile", "data-placement": "bottom-left", onClick: this.pop_profile, onError: this.barphoto_error})
      )
    ), 
    React.createElement("div", {className: "maintab"}, React.createElement(Tabui, {ref: "maintab", lastfile: this.state.lastfile, tabs: this.state.tabs}))
    )
  },
  render:function() {
      if (this.state.tabs[0].text != "Guest") {
      return this.rendersignin();
      }
      return React.createElement("div", {className: "default_tab"}, 
        React.createElement(Tabui, {ref: "maintab", lastfile: this.state.lastfile, tabs: this.state.tabs})
      )
  }
});
module.exports=main;
},{"./about.jsx":"d:\\ksana2015\\ketaka\\src\\about.jsx","./buildindex.jsx":"d:\\ksana2015\\ketaka\\src\\buildindex.jsx","./devmenu.jsx":"d:\\ksana2015\\ketaka\\src\\devmenu.jsx","./docview.jsx":"d:\\ksana2015\\ketaka\\src\\docview.jsx","./docview_tibetan.jsx":"d:\\ksana2015\\ketaka\\src\\docview_tibetan.jsx","./filelist.jsx":"d:\\ksana2015\\ketaka\\src\\filelist.jsx","./imageview.jsx":"d:\\ksana2015\\ketaka\\src\\imageview.jsx","./mainmenu.jsx":"d:\\ksana2015\\ketaka\\src\\mainmenu.jsx","./mainsearch.jsx":"d:\\ksana2015\\ketaka\\src\\mainsearch.jsx","./persistentmarkup_pouchdb":"d:\\ksana2015\\ketaka\\src\\persistentmarkup_pouchdb.js","./project":"d:\\ksana2015\\ketaka\\src\\project.js","./projectlist.jsx":"d:\\ksana2015\\ketaka\\src\\projectlist.jsx","./projectview.jsx":"d:\\ksana2015\\ketaka\\src\\projectview.jsx","./referenceview.jsx":"d:\\ksana2015\\ketaka\\src\\referenceview.jsx","./styles":"d:\\ksana2015\\ketaka\\src\\styles.js","./tabui.jsx":"d:\\ksana2015\\ketaka\\src\\tabui.jsx","./userlogin.jsx":"d:\\ksana2015\\ketaka\\src\\userlogin.jsx","ksana-database":"d:\\ksana2015\\node_modules\\ksana-database\\index.js","ksana-search":"d:\\ksana2015\\node_modules\\ksana-search\\index.js","react":"react"}],"d:\\ksana2015\\ketaka\\src\\mainmenu.jsx":[function(require,module,exports){
var React=require("react");
var Contentnavigator=require("./contentnavigator.jsx"); 
var BTN=React.createClass({displayName: "BTN",
  render:function() {
    return React.createElement("button", {className: "btn btn-primary", onClick: this.props.onClick}, 
    this.props.caption)
  }
})
var mainmenu = React.createClass({displayName: "mainmenu",
  getInitialState: function() {
    return {bar: "world"};
  },
  chooseFile:function () {
    var chooser = this.refs.fileDialog.getDOMNode();
    chooser.click();  
  },
  componentDidMount:function() {
    var chooser = this.refs.fileDialog.getDOMNode();
    chooser.addEventListener("change", function(evt) {
      console.log(this.value);
    }, false);
  },
  projectview:function() {
      this.props.action("projectview");
  },
  saveMarkup:function() {
    this.props.action("savemarkup");
  },  
  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement("button", {className: "btn btn-success", onClick: this.projectview}, "Project"), 

        React.createElement("input", {style: {"display":"none"}, ref: "fileDialog", type: "file", 
        accept: ".json,.js"}), 
        React.createElement(Contentnavigator, {action: this.props.action}), 
        
        React.createElement(BTN, {caption: "Open File", onClick: this.chooseFile}), 
        React.createElement(BTN, {caption: "Open Markup", onClick: this.chooseFile}), 
        React.createElement(BTN, {caption: "Save Markup", onClick: this.saveMarkup})

      )
    );
  }
});
module.exports=mainmenu;
},{"./contentnavigator.jsx":"d:\\ksana2015\\ketaka\\src\\contentnavigator.jsx","react":"react"}],"d:\\ksana2015\\ketaka\\src\\mainsearch.jsx":[function(require,module,exports){
/** @jsx React.DOM */
var Searchbox=require("./searchbox.jsx"); 
var Queryinfo=require("./queryinfo.jsx"); 
var Resultlist=require("./resultlist.jsx");  
//var bootstrap=require("bootstrap");
var kde=require("ksana-database");
var kse=require("ksana-search");

var React=require("react");
//var Fileinstaller=Require("fileinstaller"); 
var mainsearch = React.createClass({displayName: "mainsearch", 
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
      React.createElement("div", null, 
        React.createElement("div", {className: "row searcharea"}, 
          React.createElement("div", {className: "col-md-12"}, React.createElement(Searchbox, {action: this.action, kw: this.props.keyword, progress: this.state.progress, wildcard: this.state.wildcard})), 
          React.createElement("div", {className: "col-md-3"}, 
            React.createElement(Queryinfo, {action: this.action, Q: this.state.Q})
          ), 
          React.createElement("div", {className: "col-md-9"}, 
            React.createElement(Resultlist, {action: this.action, Q: this.state.Q2, bambos: this.props.bambos})
          )
        )
      )
    );
  }
});
module.exports=mainsearch;
},{"./queryinfo.jsx":"d:\\ksana2015\\ketaka\\src\\queryinfo.jsx","./resultlist.jsx":"d:\\ksana2015\\ketaka\\src\\resultlist.jsx","./searchbox.jsx":"d:\\ksana2015\\ketaka\\src\\searchbox.jsx","ksana-database":"d:\\ksana2015\\node_modules\\ksana-database\\index.js","ksana-search":"d:\\ksana2015\\node_modules\\ksana-search\\index.js","react":"react"}],"d:\\ksana2015\\ketaka\\src\\markup.js":[function(require,module,exports){
/*
	merge needs token offset, not char offset
*/
var splitDelete=function(m) {
	var out=[];
	for (i=0;i<m.l;i++) {
		var m2=JSON.parse(JSON.stringify(m));
		m2.s=m.s+i;
		m2.l=1;
		out.push(m2);
	}
	return out;
}
var quantize=function(markup) {
	var out=[],i=0,m=JSON.parse(JSON.stringify(markup));
	if (m.payload.insert) {
			m.s=m.s+m.l-1;
			m.l=1;
			out.push(m)
	} else {
		if (m.payload.text=="") { //delete
			out=splitDelete(m);
		} else { //replace
			if (m.l>1) {//split to delete and replace
				var m2=JSON.parse(JSON.stringify(m));
				m.payload.text="";
				m.l--;
				out=splitDelete(m);
				m2.s=m2.s+m2.l-1;
				m2.l=1;
				out.push(m2);
			} else {
				out.push(m);
			}
		}
	}
	return out;
}
var plural={
	"suggest":"suggests"
}
var combinable=function(p1,p2) {
	var t="";
	for (var i=0;i<p1.choices.length;i++) t+=p1.choices[i].text;
	for (var i=0;i<p2.choices.length;i++) t+=p2.choices[i].text;
	return (t==="");
}
var combine=function(markups) {
	var out=[],i=1,at=0;

	while (i<markups.length) {
		/*if (combinable(markups[at].payload,markups[i].payload)) {
			markups[at].l++;
		} else {*/
			markups[at].l++;
			out.push(markups[at]);
			at=i;
		//}
		i++;
	}
	out.push(markups[at]);
	return out;
}
var merge=function(markups,type){
	var out=[],i=0;
	for (i=0;i<markups.length;i++) {
		if (markups[i].payload.type===type)	out=out.concat(quantize(markups[i]));
	}
	var type=plural[type];
	if (typeof type=="undefined") throw "cannot merge "+type;
	if (!out.length) return [];
	out.sort(function(a,b){return a.s-b.s;});
	var out2=[{s:out[0].s, l:1, payload:{type:type,choices:[out[0].payload]}}];
	for (i=1;i<out.length;i++) {
		if (out[i].s===out2[out2.length-1].s ) {
			out2[out2.length-1].payload.choices.push(out[i].payload);
		} else {
			out2.push({s:out[i].s,l:1,payload:{type:type,choices:[out[i].payload]}});
		}
	}
	return combine(out2);
}
var addTokenOffset=function(markups,offsets) {
	for (var i=0;i<markups.length;i++) {
		var m=markups[i],at,at2;
		at=offsets.indexOf(m.start); //need optimized
		if (m.len) at2=offsets.indexOf(m.start+m.len);
		if(at == offsets.length-1) {
			at2 = m.len;
		}
		if (at==-1 || at2==-1) {
			console.trace("markup position not at token boundary");
			break;
		}

		m.s=at;
		if (m.len) m.l=at2-at;
	}
	return markups;
}

var applyTokenOffset=function(markups,offsets) {
	for (var i=0;i<markups.length;i++) {
		var m=markups[i];
		m.start=offsets[m.s];
		if(m.s == offsets.length-1) m.len = m.l;
		else m.len=offsets[m.s+m.l] - offsets[m.s];
		delete m.s;
		delete m.l;
	}
	return markups;
}

var suggestion2revision=function(markups) {
	var out=[];
	for (var i=0;i<markups.length;i++) {
		var m=markups[i];
		var payload=m.payload;
		if (payload.insert) {
			out.push({start:m.start+m.len,len:0,payload:payload});
		} else {
			out.push({start:m.start,len:m.len,payload:payload});
		}
	}
	return out;
}

var strikeout=function(markups,start,len,user,type) {
	var payload={type:type,author:user,text:""};
	markups.push({start:start,len:len,payload:payload});
}
module.exports={merge:merge,quantize:quantize,
	addTokenOffset:addTokenOffset,applyTokenOffset:applyTokenOffset,
	strikeout:strikeout, suggestion2revision : suggestion2revision
}
},{}],"d:\\ksana2015\\ketaka\\src\\nav_tibetan.jsx":[function(require,module,exports){
var React=require("react");
var nav_tibetan = React.createClass({displayName: "nav_tibetan",
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
      return React.createElement("button", {className: "btn btn-warning button_style", onClick: this.endpreview}, "End Preview")
    } else {
      return React.createElement("button", {className: "btn btn-success button_style", onClick: this.preview}, "Preview")
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
    out.push(React.createElement("span", {key: "s1", className: "label label-default"}, this.props.selecting.start));
    if (this.props.selecting.end!=this.props.selecting.start) {
      out.push(React.createElement("span", {key: "s2", className: "label label-default"}, this.props.selecting.end));
    }
      
    return out;      
  },
render: function() {
     if (!this.props.page) return React.createElement("div", null)
    return (
      React.createElement("div", {className: "row", onLoad: this.getDocview_style}, 
      React.createElement("img", {ref: "image", id: "sourceimage", className: "sourceimage", src: this.expandFileName1(this.props.page.name), onError: this.imgerror}), 
        React.createElement("div", {className: "col-md-2 col-md-offset-1"}, 
          React.createElement("img", {src: "images/small.png", id: "zoomout", style: {height:"30px",width:"30px",marginRight:"10px"}, onClick: this.zoom}), 
          React.createElement("img", {src: "images/large.png", id: "zoomin", style: {height:"30px",width:"30px",marginRight:"10px"}, onClick: this.zoom}), 
          React.createElement("img", {src: "images/jump_previous.png", id: "previous", style: {height:"30px",width:"30px",marginRight:"10px"}, onClick: this.nextMistake}), 
          React.createElement("img", {src: "images/jump_next.png", id: "next", style: {height:"30px",width:"30px",marginRight:"10px"}, onClick: this.nextMistake})
         ), 
        React.createElement("div", {className: "col-md-2 col-md-offset-1"}, 
        React.createElement("div", {className: "input-group"}, 
             React.createElement("span", {className: "input-group-btn"}, 
              React.createElement("img", {src: "images/first.png", onClick: this.firstPage}), 
              React.createElement("img", {src: "images/left.png", onClick: this.prevPage})
             ), 
            React.createElement("input", {id: "pageid", ref: "pageid", defaultValue: this.pageName(), onKeyPress: this.EntersetPageId, className: "form-control"}), 
            React.createElement("span", {className: "input-group-btn"}, 
              React.createElement("img", {src: "images/right.png", onClick: this.nextPage}), 
              React.createElement("img", {src: "images/last.png", onClick: this.lastPage})
            )
        )
      ), 
      React.createElement("div", {className: "col-md-4"}, 
        this.previewmenu(), 
        React.createElement("button", {className: "btn btn-success button_style", onClick: this.handsavemarkup}, "Save"), 
        React.createElement("button", {className: "btn btn-success button_style", onClick: this.handUpdate}, "Refresh")
      )
      )
    );
  }
});

module.exports=nav_tibetan;
},{"react":"react"}],"d:\\ksana2015\\ketaka\\src\\persistentmarkup_pouchdb.js":[function(require,module,exports){
/*
markup format:
{"start":start_offset,"len":length_in_byte,"payload":{"type":"markup_type",author":"p1","text":""},"i":page_id}
*/
//saveMarkup({dbid:dbid,markups:markups,filename:filename,i:this.state.pageid } ,function(data){

var combineMarkups=function(db,markups,fn,pageid,cb) {

	var key="M!"+pageid+"!"+fn;
	db.get(key,function(err,res){
		var existing=[] ;
		if (res && res.M) existing=res.M ;
		if (!markups || !markups.length) {
			if (err.error) cb([]);
			else cb(existing);
			return;
		}

		var author=markups[0].payload.author, others=[];
		if (existing) {
			others=existing.filter(function(m){return m.i!=pageid || m.payload.author != author});		
		}
		for (var i=0;i<markups.length;i++) {
			markups[i].i=pageid;
		}
		others=others.concat(markups);
		var sortfunc=function(a,b) {
			//each page less than 64K
			return (a.i*65536 +a.start) - (b.i*65536 +b.start);
		}
		others.sort(sortfunc);
		cb(others,res._rev);
	});
}

var saveMarkup=function(opts,cb){
	combineMarkups(opts.db,opts.markups,opts.filename,opts.i,function(markups,rev){
		for (var i=0;i<markups.length;i++) {
			markups[i].i=opts.i;
		}
		var key="M!"+opts.i+"!"+opts.filename;
		if (markups.length) {
			opts.db.put({M:markups,_rev:rev,_id:key},function(err,response){
				cb();
			});
		} else {
			cb();
		}
	});
}
var __loadMarkups=function(db,fn,pagecount,cb) {
	var out=[],keys=[];
	for (var i=1;i<pagecount;i++) {
		keys.push("M!"+i+"!"+fn);
	}
	db.allDocs({include_docs:true,keys:keys},function(err,res){
			res.rows.map(function(r){
				if (r.error) return;
				out=out.concat(r.doc.M);
			})
			cb(out);
	});
}
var loadMarkup=function(db,fn,pageid,cb) {
	if (pageid<0) {
		__loadMarkups(db,fn,-pageid,cb);
		return;
	}
	var key="M!"+pageid+"!"+fn;
	db.get(key,function(err,res){
		cb(res.M);
	});
}

var savetopouch=function(db,data,cb) {
	db.post(data, function(err, res) {
		cb(); 
    });
}
var savealltopouch=function(db,data,cb) {
	db.bulkDocs(data,function(err, res) {
        cb(err);
     });
}
var readfrompouch=function(db,data,cb,state,data2) {
	db.get(data, function(err,res) { 
		if(state == 0)cb(err); 
		else if(state == 1) cb(res);
		else if(state == 2) {
			db.put(data2[0], data, res._rev ,function(err, response) { 
				cb(data2[1]);
			});
		}
	});
}
var readallfrompouch=function(db,cb,state) {
	db.allDocs({include_docs: true},function(err, res) {
	    if(res.rows.length==0) db.destroy(function(err, info) { });
        if(state == 0) cb(res);
        else if(state == 1) cb(err);
        else if(state == 2) {
        	var data = cb(res);
        	return data;
        }
    });
}
var removetopouch=function(db,data) {
	db.get(data,function(err,res) {
			if(!err) {
				db.remove(res);
			}
    });
}

module.exports={
	saveMarkup:saveMarkup,
	loadMarkup:loadMarkup,
	savetopouch:savetopouch,
	readfrompouch:readfrompouch,
	readallfrompouch:readallfrompouch,
	removetopouch:removetopouch,
	savealltopouch:savealltopouch

}
},{}],"d:\\ksana2015\\ketaka\\src\\project.js":[function(require,module,exports){
var project_settings={};
var tibetan={
	"docview":"docview_tibetan"
	,"tokenize": require('ksana-analyzer').getAPI('tibetan1').tokenize
	,"inlinedialog": {
		"suggest":require("./inlinedialog_suggest_tibetan.jsx")
		,"comment":require("./inlinedialog_comment_tibetan.jsx")
		,"revision":require("./inlinedialog_accept_tibetan.jsx")
		,"suggests":require("./inlinedialog_applychange.jsx")
	}
	,"contextmenu" : require("./contextmenu_tibetan.jsx")
	,"layout":"horizontal"
	,"navigator":"nav_tibetan"
	,"admin_viewable_tags" :["comment"]
	,"surface_elements": {
		"comment" : require("./element_comment_tibetan.jsx")
	}
}
var chinese={
	"docview":"docview_chinese",
	"tokenize":require('ksana-analyzer').getAPI('simple1').tokenize
}
var classical={
	"docview":"docview_classical"
	,"tokenize":require('ksana-analyzer').getAPI('simple1').tokenize
	,"inlinedialog": {
		"suggest":require("./inlinedialog_suggest_tibetan.jsx")
	}
	,"makelinkdialog" : require("./inlinedialog_makelink.jsx")
	,"contextmenu" : require("./contextmenu_classical.jsx")
	,"layout":"vertical"
	//,"typeset":require('./typeset').classical
	,"navigator":"nav_classical"
	,"linebreak":"※"
}

var templates={tibetan:tibetan,chinese:chinese,classical:classical};
var openProject=function(proj) {
	proj.tmpl=templates[proj.template];
	proj.setting=project_settings[proj.name];
	if (!proj.tmpl) throw "template not found:"+proj.template;
	return proj; 
}

module.exports={openProject:openProject,templates:templates};
},{"./contextmenu_classical.jsx":"d:\\ksana2015\\ketaka\\src\\contextmenu_classical.jsx","./contextmenu_tibetan.jsx":"d:\\ksana2015\\ketaka\\src\\contextmenu_tibetan.jsx","./element_comment_tibetan.jsx":"d:\\ksana2015\\ketaka\\src\\element_comment_tibetan.jsx","./inlinedialog_accept_tibetan.jsx":"d:\\ksana2015\\ketaka\\src\\inlinedialog_accept_tibetan.jsx","./inlinedialog_applychange.jsx":"d:\\ksana2015\\ketaka\\src\\inlinedialog_applychange.jsx","./inlinedialog_comment_tibetan.jsx":"d:\\ksana2015\\ketaka\\src\\inlinedialog_comment_tibetan.jsx","./inlinedialog_makelink.jsx":"d:\\ksana2015\\ketaka\\src\\inlinedialog_makelink.jsx","./inlinedialog_suggest_tibetan.jsx":"d:\\ksana2015\\ketaka\\src\\inlinedialog_suggest_tibetan.jsx","ksana-analyzer":"d:\\ksana2015\\node_modules\\ksana-analyzer\\index.js"}],"d:\\ksana2015\\ketaka\\src\\projectlist.jsx":[function(require,module,exports){
var pouch=require("./persistentmarkup_pouchdb");
var React=require("react");
var projectlist = React.createClass({displayName: "projectlist",
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
    return (React.createElement("tr", {key: 'p'+i, "data-i": i, className: cls, id: p.shortname, 
     onClick: this.selectproject, 
     onDoubleClick: this.openproject, 
     onMouseOver: this.hoverProject}, 
      React.createElement("td", null, p.newname)
    ));
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
    if(data.length == 0) out.push(React.createElement("div", null));
    for (var i=0;i<data.length;i++) {
      if(status == "off")  out.push(React.createElement("button", {className: "menber_style"}, React.createElement("img", {src: "photo/"+data[i]+".jpg?"+ new Date().getTime(), className: "showphoto_style", onError: this.check_photo}), React.createElement("br", null), data[i]));
      else if (status.indexOf(data[i]) > -1) out.push(React.createElement("button", {type: "checkbox", id: data[i], className: "btn picturebutton_style active"}, React.createElement("img", {src: "photo/"+data[i]+".jpg?"+ new Date().getTime(), onError: this.check_photo, className: "showphoto_style"}), React.createElement("br", null), data[i], "  "));
      else out.push(React.createElement("button", {type: "checkbox", id: data[i], className: "btn picturebutton_style"}, React.createElement("img", {src: "photo/"+data[i]+".jpg?"+ new Date().getTime(), className: "showphoto_style", onError: this.check_photo}), React.createElement("br", null), data[i], "  "));
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
        React.createElement("div", null, 
        React.createElement("div", {className: "col-md-2"}, React.createElement("h4", null, "Kdb file")), 
        React.createElement("div", {className: "col-md-10"}, React.createElement("form", {action: "upload.php", method: "post", encType: "multipart/form-data"}, React.createElement("input", {type: "hidden", name: "folder", value: "kdb"}), React.createElement("input", {type: "file", name: "upload", id: "upload"}), 
        React.createElement("div", null, React.createElement("input", {type: "submit", className: "btn btn-success btn-block pull-left", name: "button", id: "button", value: "Upload", style: {width:"110px",marginBottom:"10px"}}))
        )), 
        React.createElement("div", {className: "col-md-12"}, React.createElement("br", null))
        )
      );
    }
  },
  editbutton:function()
  {
    if(this.props.tab.profile.su == true){
      return React.createElement("button", {className: "btn btn-warning btn-lg button_default", onClick: this.editproject}, "Edit")}
  },
  addbutton:function()
  {
    if(this.props.tab.profile.su == true){
      return React.createElement("button", {className: "btn btn-success add_button_style", onClick: this.addproject}, React.createElement("img", {src: "images/add.png", style: {height:"16px",width:"16px"}}))}
  },
  buildindex:function() {
  },
  render_normal:function()
  {//{this.props.projects()[0].pr}
      return ( 
      React.createElement("div", null, 
        React.createElement("div", {className: "col-md-2"}, 
          React.createElement("h1", {className: "header_text"}, "Project"), this.addbutton(), 
          React.createElement("div", {className: "folderList"}, 
        React.createElement("table", {className: "table table-bordered table-hover"}, 
        React.createElement("thead", {onClick: this.sortHeader}
        ), React.createElement("br", null), 
        React.createElement("tbody", null, 
         this.check_project()
        )))), React.createElement("br", null), React.createElement("br", null), 
        React.createElement("div", {className: "col-md-10 leftborder"}, 
        this.render_nan()
        ))
    );
  },
  render_edit:function()
  {
    var temp_desc,temp_name;
    if(this.state.add != true) {temp_desc= this.state.projects[0].desc;temp_name = this.state.projects[this.state.selected].newname;}
    return ( 
      React.createElement("div", null, 
        React.createElement("div", null, 
        React.createElement("div", {className: "alert_err alert-danger", style: {width:window.innerWidth}}, 
            React.createElement("strong", null, "Need choose Proof Readers and Chief Editor!")
        )), 
        React.createElement("div", {className: "col-md-2"}, 
          React.createElement("h1", {className: "header_text"}, "Project"), 
          React.createElement("div", {className: "folderList"}, 
        React.createElement("table", {className: "table table-bordered table-hover"}, 
      React.createElement("thead", {onClick: this.sortHeader}), React.createElement("br", null), 
        React.createElement("tbody", null, 
         this.check_project()
        )))), 
        React.createElement("br", null), React.createElement("br", null), 
        React.createElement("div", {className: "col-md-10"}, 
        React.createElement("div", {className: "col-md-12 leftborder"}, 
        this.showadd(), 
        React.createElement("div", {className: "col-md-2"}, React.createElement("h4", null, "Name")), 
        React.createElement("div", {className: "col-md-10"}, React.createElement("input", {type: "text", id: "name", className: "form-control", placeholder: "Name", defaultValue: temp_name})), 
        React.createElement("div", {className: "col-md-12"}, React.createElement("br", null)), 
        React.createElement("div", {className: "col-md-2"}, React.createElement("h4", null, " Discription")), 
        React.createElement("div", {className: "col-md-10"}, React.createElement("textarea", {id: "desc", rows: "2", className: "form-control", placeholder: "Discription", resize: "none"}, temp_desc)), 
        React.createElement("div", {className: "col-md-12"}, React.createElement("br", null)), 
        React.createElement("div", {className: "col-md-2"}, React.createElement("h4", null, "Proof Readers")), 
        React.createElement("div", {className: "col-md-10"}, 
        React.createElement("div", {className: "btn-group1", "data-toggle": "buttons"}, this.member_list(this.state.pr,this.state.prarr))), 
        React.createElement("div", {className: "col-md-12"}, React.createElement("br", null)), 
        React.createElement("div", {className: "col-md-2"}, React.createElement("h4", null, "Chief Editor")), 
        React.createElement("div", {className: "col-md-10"}, 
        React.createElement("div", {className: "btn-group2", "data-toggle": "buttons"}, this.member_list(this.state.ce,this.state.cearr))), 
        React.createElement("div", {className: "col-md-12"}, React.createElement("br", null), React.createElement("br", null), React.createElement("br", null), React.createElement("br", null)), 
        React.createElement("div", {className: "col-md-4 col-md-offset-8"}, 
        React.createElement("button", {className: "btn btn-warning btn-lg button_default", onClick: this.canceledit}, "Cancel"), "   ", 
        React.createElement("button", {className: "btn btn-success btn-lg button_default", onClick: this.confirm}, "Save")
        )
        )
        )
      )
      );
  },
  render_nan:function(){
    if(this.state.first ==true) {
      return React.createElement("div", null)}
    else if(this.state.authority ==false){
      return (
        React.createElement("div", {className: "col-md-8 col-md-offset-4"}, React.createElement("h1", null, "You havent been asign in this project.")
        )
        );}
    else {
      return ( 
        React.createElement("div", null, 
        React.createElement("div", {className: "col-md-2"}, React.createElement("h4", null, " Name")), 
        React.createElement("div", {className: "col-md-10"}, React.createElement("h4", null, this.state.projects[this.state.selected].newname)), 
        React.createElement("div", {className: "col-md-12"}, React.createElement("br", null), React.createElement("br", null)), 
        React.createElement("div", {className: "col-md-2"}, React.createElement("h4", null, " Discription")), 
        React.createElement("div", {className: "col-md-10"}, React.createElement("h4", null, this.state.projects[0].desc)), 
        React.createElement("div", {className: "col-md-12"}, React.createElement("br", null), React.createElement("br", null)), 
        React.createElement("div", {className: "col-md-12"}, React.createElement("br", null), React.createElement("br", null)), 
        React.createElement("div", {className: "col-md-2"}, React.createElement("h4", null, "Proof Readers")), 
        React.createElement("div", {className: "col-md-10"}, React.createElement("div", {className: "btn-group1", "data-toggle": "buttons"}, this.member_list(this.state.prarr,"off"))), 
        React.createElement("div", {className: "col-md-12"}, React.createElement("br", null), React.createElement("br", null)), 
        React.createElement("div", {className: "col-md-2"}, React.createElement("h4", null, "Chief Editor")), 
        React.createElement("div", {className: "col-md-10"}, React.createElement("div", {className: "btn-group1", "data-toggle": "buttons"}, this.member_list(this.state.cearr,"off"))), 
        React.createElement("div", {className: "col-md-12"}, React.createElement("br", null), React.createElement("br", null), React.createElement("br", null), React.createElement("br", null)), 
        React.createElement("div", {className: "col-md-4 col-md-offset-8"}, 
        this.editbutton(), "   ", 
        React.createElement("button", {className: "btn btn-success btn-lg button_default", onClick: this.openproject}, "Open"), "   "
        ))
       ); 
    } 
  },
  render: function() {
    if(this.state.edit==true){ return this.render_edit();}
    else {return this.render_normal();}
  }
});
module.exports=projectlist;
},{"./persistentmarkup_pouchdb":"d:\\ksana2015\\ketaka\\src\\persistentmarkup_pouchdb.js","react":"react"}],"d:\\ksana2015\\ketaka\\src\\projectview.jsx":[function(require,module,exports){
var React=require("react");
var FileControls=React.createClass({displayName: "FileControls",
  render:function() {
    return React.createElement("div", null, React.createElement("h1", {className: "header_text"}, "Bambos")) 
  }
});
var FolderList = React.createClass({displayName: "FolderList",
  getInitialState:function() {
    return {selected:0};
  },
  shouldComponentUpdate:function(nextProps,nextState) {

    return (nextProps.folders!=this.props.folders ||
      this.state.selected!=nextState.selected || this.props.hits != nextProps.hits);
  },
  select:function(e) {
    var i=e.target.parentElement.attributes['data-i'].value;
    this.setState({selected:i});
    this.props.onSelectFolder(i);
  },
  renderFolders:function() { 
    var folders = [];
    if(this.props.folders != null) folders = this.props.folders.sort(); 
    var cls="",out=[];
    for (var i=0;i<this.props.folders.length;i++) {
      var f=this.props.folders[i];
      var hit="";
      if (this.props.hits&&this.props.hits[i]) hit=this.props.hits[i];
      if (i==this.state.selected) cls="success"; else cls="";
      out.push(React.createElement("tr", {key: 'd'+i, className: cls, onClick: this.select, "data-i": i}, 
        React.createElement("td", null, f, 
        React.createElement("span", {className: "label label-info"}, hit)
        )
        ));
    };
    return out;
  },

  render:function() {
    return React.createElement("div", {className: "folderList"}, 
    React.createElement("table", {className: "table table-hover"}, 
    React.createElement("tbody", null, this.renderFolders())
    )
    );
  }
});
var FileList = React.createClass({displayName: "FileList",
  getInitialState:function() {
    return {selected:0,hovered:-1};
  },
  select:function(e) {
    var ee=e.target.parentElement.attributes['data-i'];
    if (!ee) return;
    var selected=parseInt(ee.value);
    this.setState({selected:selected});
    this.props.onSelectFile(selected);
  },
  shouldComponentUpdate:function(nextProps,nextState) {

    var shouldUpdate= (nextState.hovered != this.state.hovered || this.state.hovered==-1
      ||nextState.selected!=this.state.selected || this.props.files!=nextProps.files);

    if (this.props.files!=nextProps.files) {
      if (nextProps.selected!=this.state.selected) {
        nextState.selected=nextProps.selected;
      }
    }
    return shouldUpdate;
  },
  leave:function(e) {
    this.setState({hovered:-1});
  },
  openfile:function(e) {
    var e=e.target;
    while (e) {
      if (e.attributes['data-i']) {
        var i=parseInt(e.attributes['data-i'].value);
        break;
      } else e=e.parentElement;
    }
    this.setState({selected:i});
    this.props.onOpenFile(i);
  },
  getSegNameInFile:function(i) {
      var segnames=this.props.kde.getFileSegNames(this.props.start+i);
      var start=segnames[0];
      var end=segnames[segnames.length-1];
      if (start=="_") {
        start=segnames[1]; //ignore empty starting page _
      }
      return {start:start,end: end}
  },  
  renderFiles:function() {
    var cls="",out=[], filestart=this.props.start;
    for (var i=0;i<this.props.files.length;i++) {
      var f=this.props.files[i],hit="";
      if (this.props.hits) hit=this.props.hits[filestart+i]?this.props.hits[filestart+i].length:"";
      if (!hit) hit="";
      if (i==this.state.selected) cls="success"; else cls="";
	  var segnames=this.getSegNameInFile(i);
      out.push(React.createElement("tr", {key: 'f'+i, onClick: this.select, 
           onMouseEnter: this.hoverFile, onMouseLeave: this.leave, 
           className: cls, "data-i": i}, 
        React.createElement("td", {onDoubleClick: this.openfile}, f.substring(0,f.length-4), 
        
        React.createElement("span", {className: "label label-info"}, hit), 
		React.createElement("span", null, ",Page:", segnames.start, "-", segnames.end), 
        React.createElement("span", {className: "pull-right", style: {visibility:this.state.hovered==i?"":"hidden"}}, 
        React.createElement("button", {className: "btn btn-success", onClick: this.openfile}, "Open")
        )
        )
        ));
    };
    return out;
  }, 
  hoverFile:function(e) {
    if (e.target.parentElement.nodeName!='TR') return;
    var hovered=e.target.parentElement.attributes['data-i'].value;
    if (this.state.hovered==hovered) return;

    this.setState({hovered:hovered});
  },
  render:function() {
    return React.createElement("div", {className: "fileList"}, 
    React.createElement("table", {className: "table table-hover"}, 
    React.createElement("tbody", null, this.renderFiles())));
  }
});
var projectview = React.createClass({displayName: "projectview",
  getInitialState: function() {
    return {bar: "world",folders:[],files:[],selectedFile:0};
  },
  shouldComponentUpdate:function(nextProps,nextState) {
    return (nextProps.kde.activeQuery!=this.activeQuery || typeof this.activeQuery=="undefined"
      || nextState.files!=this.state.files|| nextState.folders!=this.state.folders);
  }, 
  autoopen:function() {
    //if (!this.props.autoopen || !this.props.autoopen.file) return;
    var folders=this.state.folders;
    if (this.props.autoopen && this.props.autoopen.file) {
        var folder=this.props.autoopen.file;
        folder=folder.substring(0,folder.lastIndexOf('/'));
        for(var i=0;i<folders.length;i++) {
          if (folders[i]==folder) {
            this.selectFolder(i);
            break;
          }
        }
    } else {
      if (!this.folderopen && this.state.folders.length) this.selectFolder( 0 ); 
      this.folderopen=true;
    }
  },
  componentDidMount:function() {
    var folders={};
    var filenames=this.props.kde.get("filenames");
    if (!filenames) {
      console.error("kde not loaded yet");
      return;
    } 
    filenames.map(function(f) { folders[f.substring(0,f.indexOf('/'))]=true});
    var _folders=Object.keys(folders);
    this.setState({folders:_folders});
    setTimeout( this.autoopen.bind(this),1); 
    if (this.props.tab ) this.props.tab.instance=this; // for tabui 
    this.activeQuery=this.props.kde.activeQuery;
  },
  selectFolder:function(i) {
    var folder=this.state.folders[i];
    var filenames=this.props.kde.get("filenames");

    var files=[],start;
    filenames.map(function(f,idx) {
      if(f.substring(0,folder.length)==folder) {
        if (!files.length) start=idx;
        files.push(f.substring(folder.length+1));
      }
    });

    this.setState({files:files, filestart:start, folder:folder,selectedFile:0});

    if (this.props.autoopen && this.props.autoopen.file) {
      for(var i=0;i<files.length;i++) {
        if (folder+'/'+files[i]==this.props.autoopen.file) {
          this.openFile(i);
          this.props.autoopen.file=""; //prevent from click on folder autoopen
          break;
        }
      }
    }
    this.props.kde.activeFolder=folder;
    this.props.action("selectfile",this.props.kde,folder);
  },
  selectFile:function(i) {
    var f=this.state.folder+'/'+this.state.files[i];
    this.props.kde.activeFile=f;
    this.props.action("selectfile",this.props.kde,f);
  },
  openFile:function(i) {
    var f=this.state.folder+'/'+this.state.files[i];
    var gotopageid;
    if (this.props.autoopen)  {
      gotopageid=this.props.autoopen.pageid;
    }
    this.props.action("openfile",this.props.kde.dbname,f,gotopageid,null);
    if (this.props.autoopen) {
      this.props.autoopen.pageid="";
    }
    this.setState({selectedFile:i});
  },
  
  makescrollable:function() {
    var tabheight=this.getDOMNode().getBoundingClientRect().height;
    var f=this.refs.folderList.getDOMNode();
    f.style.height=document.body.offsetHeight-130+"px";
    //f.style.height='90%';//tabheight-f.getBoundingClientRect().top;
//    f.style.height=document.body.offsetHeight/2-f.getBoundingClientRect().top;
    f=this.refs.fileList.getDOMNode();
//    f.style.height=document.body.offsetHeight/2-f.getBoundingClientRect().top;
    //f.style.height='90%';//f.style.height=tabheight- f.getBoundingClientRect().top;
    f.style.height=document.body.offsetHeight-130+"px";//f.style.height=tabheight- f.getBoundingClientRect().top;
  },
  componentDidUpdate:function() {
    this.activeQuery=this.props.kde.activeQuery;
    this.makescrollable();
    var that=this;
    if  (typeof this.state.folder=="undefined") {
        setTimeout(function(){
          that.selectFolder(0);
       },100);
    }
  },
  getFolderHits:function() {
    if (!this.props.kde.activeQuery) return [];
    return this.props.kde.activeQuery.byFolder;
  },
  getFileHits:function() {
    if (!this.props.kde.activeQuery) return [];
    return this.props.kde.activeQuery.byFile;
  },
  componentWillUnmount:function() {
    return;
    this.props.action("closedb",this.props.kde.kdbid);
  },
  render: function() {
    return (
      React.createElement("div", {className: "projectview"}, 
        React.createElement("div", {className: "row"}, 
        React.createElement("div", {className: "col-md-3"}, 
        React.createElement("div", null, React.createElement("h1", {className: "header_text"}, "Volumes")), 
        React.createElement(FolderList, {ref: "folderList", folders: this.state.folders, onSelectFolder: this.selectFolder, hits: this.getFolderHits()})
        ), 
        React.createElement("div", {className: "col-md-9"}, 
        React.createElement(FileControls, null), 
        React.createElement(FileList, {ref: "fileList", className: "fileList", 
           selected: this.state.selectedFile, 
            files: this.state.files, 
			kde: this.props.kde, 
            onSelectFile: this.selectFile, onOpenFile: this.openFile, start: this.state.filestart, hits: this.getFileHits()})
        )
        )
      )
    );   
  }
});
module.exports=projectview;
},{"react":"react"}],"d:\\ksana2015\\ketaka\\src\\queryinfo.jsx":[function(require,module,exports){
/** @jsx React.DOM */

//var othercomponent=Require("other"); 
var React=require("react");
var ExpandedToken=React.createClass({displayName: "ExpandedToken",
  tokenclick:function(e) {
    var n=e.target;
    if (n.tagName!="A") n=n.parentElement;
    var elements=n.parentNode.getElementsByClassName("active");
    for (var i=0;i<elements.length;i++){
      elements[i].classList.remove("active");
    }
    n.classList.toggle('active');
    var ntoken=parseInt(n.attributes["data-ntoken"].value);
    var group=parseInt(n.attributes["data-group"].value);
    this.props.action("tokenclick",ntoken, group);
  },
  showtokenwithhits:function(tokenwithhits,variants) {
    if (tokenwithhits!=variants.length) {
      return React.createElement("span", null, React.createElement("span", {className: "label label-warning"}, tokenwithhits), "/", 
      React.createElement("span", {className: "label label-info"}, this.props.token.variants.length))
    }else {
      return React.createElement("span", {className: "label label-info"}, this.props.token.variants.length)      
    }
  },
  render:function() {
    var that=this;
    var token=this.props.token;
    var tokenwithhits=0;
    this.props.token.variants.map(function(v){
      if (v[1]) tokenwithhits++
    });
    return React.createElement("div", {className: " col-md-12"}, 
      React.createElement("span", null, this.props.token.raw), this.showtokenwithhits(tokenwithhits,this.props.token.variants), 
       React.createElement("ul", {className: "expanded tokenlist list-group"}, 
      token.variants.map(function(t,idx){
        if (t[1]==0) return ; // variants without hit
        var classes="list-group-item";
        if (idx==0) classes+=" active";
        return React.createElement("a", {href: "#", "data-group": that.props.group, 
            "data-ntoken": idx, title: t[1], 
            onClick: that.tokenclick, className: classes}, t[0]
            )
      })
    ))
  }
});


var queryinfo = React.createClass({displayName: "queryinfo",
  getInitialState: function() {
    return {bar: "world",selected:[]};
  },
  help:function() {
    return React.createElement("span", null, React.createElement("strong", null, "Usage:"), 
      React.createElement("br", null), "press enter for quick search.", 
      React.createElement("br", null), "if the search phrase has only one wildcard syllable, hit [Filter] to eliminate impossible candidate.", 
      React.createElement("br", null), "use space or shad to seperate multiple terms.", 
      React.createElement("br", null), React.createElement("strong", null, "Wildcard Syllable:"), 
      React.createElement("br", null), "x% :  match syllable starts with x", 
      React.createElement("br", null), "%y :  match syllable ends with y", 
      React.createElement("br", null), "%x% :  match syllable containing x", 
      React.createElement("br", null), "x%y :  match syllable starts with x and ends with y", 
      React.createElement("br", null), "maximum 3 syllables can have wildcard.", 
      React.createElement("br", null), 
      React.createElement("br", null), React.createElement("i", null, "Special thanks to Khenpo Karma Namgyal from leksheyling")
    )
  },
  newsearchphrase:function() {
    var newq="",group=0;
    for (var i in this.props.Q.terms) {
      var T=this.props.Q.terms[i];
      if (T.variants.length) {
        var selected=this.state.selected[group]||0;
        newq+=T.variants[selected][0]+"་";
        group++;
      } else {
        newq+=T.raw+"་";
      }
    }
    return newq;
  },
  action:function() {
   var args = Array.prototype.slice.call(arguments);
    var type=args.shift();
    var res=null, that=this;
    if (type==="tokenclick") {
      this.state.selected[args[1]]=args[0];
      this.setState({selected:this.state.selected});
      this.props.action("search",this.newsearchphrase());
    } else this.props.action(arguments);
  },
  showExpandedTokens:function() {
    if (!this.props.Q) return;
    var res=[],expanded=0;
    for (var i in this.props.Q.terms) {
      var T=this.props.Q.terms[i];

      if (T.variants.length) {
        res.push(React.createElement(ExpandedToken, {action: this.action, token: T, group: i}));
        expanded++;
        if (expanded>=3) break;
      }
    }
    return res;
  },
  render: function() {
    if (!this.props.Q || !this.props.Q.terms.length) return this.help();
    else return (
      React.createElement("div", null, 
        this.showExpandedTokens()
      )
    );
  }
});
module.exports=queryinfo;
},{"react":"react"}],"d:\\ksana2015\\ketaka\\src\\referenceview.jsx":[function(require,module,exports){

var React=require("react");
//var othercomponent=Require("other"); 
var referenceview = React.createClass({displayName: "referenceview",
  getInitialState: function() {
    return {bar: "world"};
  },
  render: function() {
    return (
      React.createElement("div", null, 
        "Hello,", this.state.bar
      )
    );
  }
});
module.exports=referenceview;
},{"react":"react"}],"d:\\ksana2015\\ketaka\\src\\resultlist.jsx":[function(require,module,exports){
/** @jsx React.DOM */
var React=require("react");
//var othercomponent=Require("other"); 
var resultlist = React.createClass({displayName: "resultlist",
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
      return React.createElement("div", null)
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
      return React.createElement("div", null, React.createElement("h2", null, "No result in this bambo!"))
    }
    return except.map(function(r,i){ // excerpt is an array 
      if (!r) return React.createElement("div", null);
      return React.createElement("div", null, 
      r.seq+1, " [", React.createElement("a", {href: "#", "data-file": r.file, "data-page": r.seg, onClick: that.gopage}, r.segname), "]", 
      React.createElement("div", {className: "result", dangerouslySetInnerHTML: {__html:r.text}})
      )
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
      if (this.props.Q) return React.createElement("div", {className: "resultlist"}, 
        this.show()
      )
      else return React.createElement("div", null)
  }
});
module.exports=resultlist;

/*
querystring:<span className="query">{this.props.Q.query}</span>
          <span className="label label-info">{this.showhit()}</span>{this.warning()}
          */
},{"react":"react"}],"d:\\ksana2015\\ketaka\\src\\searchbox.jsx":[function(require,module,exports){
/** @jsx React.DOM */

//var othercomponent=Require("other"); 
//var tibetan=require("ksana-search").languages.tibetan;

var React=require("react"); 
var searchbox = React.createClass({displayName: "searchbox",
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
      return React.createElement("button", {onClick: this.filter, className: "btn btn-warning"+disabled, type: "button"}, "Filter")  
    } else {
      return React.createElement("span", null, Math.floor(this.props.progress*100)+"%")
    }
  },
  render: function() {
    return (
      React.createElement("div", {className: "searchbox"}, 
         React.createElement("div", null, 
              React.createElement("div", {className: "input-group input-group-lg"}, 
                React.createElement("input", {defaultValue: this.props.kw, ref: "tofind", onKeyPress: this.keypress, type: "text", className: "tofind", style: {width:window.innerWidth*0.7}}), 
                React.createElement("span", {className: "input-group-btn"}, 
                  React.createElement("button", {className: "btn btn-success btn-lg", type: "button", onClick: this.dosearch}, "Search")
              )
              )
          )
      )
    );
  }
});
module.exports=searchbox;
},{"react":"react"}],"d:\\ksana2015\\ketaka\\src\\styles.js":[function(require,module,exports){
var styles = [
  {
    "name":"part of speech",
    "markups": {
      "suggest":  {'border-bottom': '2px solid orange','cursor': 'pointer'},
      "comment":  {'border-bottom': '2px solid blue','cursor': 'pointer'},

      "revision":  {'border-bottom': '2px solid green','cursor': 'pointer'},
      "verb":  {"background-image":"url('svg/overline.svg')" },
      "verb_b":  {"background-image":"url('svg/overline_b.svg')" },
      "verb_e":  {"background-image":"url('svg/overline_e.svg')" },
      
      "suggests":  {
          'border-bottom': '3px solid red','cursor': 'pointer'
      },
      //"changes":  {"background-image":"url('svg/overline.svg')" },
      //"changes_b":  {"background-image":"url('svg/overline_b.svg')" },
      //"changes_e":  {"background-image":"url('svg/overline_e.svg')" },

      "noun":  {"background-image":"url('svg/yellowcircle.svg')"} ,
      "abstract" :  {"background-image":"url('svg/silvercircle.svg')"},
      "comma" :  {"background-image":"url('svg/comma.svg')"},
      "fullstop" :  {"background-image":"url('svg/fullstop.svg')"},
      "redstrikeout" :  {"background-image":"url('svg/redstrikeout.svg')"},
      "inserttext" : {"background-image": "url('svg/overline.svg')"},
      "linkto" : {"cursor": "pointer", "background-image": "url('svg/underline.svg')"},


    }
  }

];
module.exports=styles;
},{}],"d:\\ksana2015\\ketaka\\src\\tabui.jsx":[function(require,module,exports){
var React=require("react");
var contentpf="C_";
var Tabui = React.createClass({displayName: "Tabui",
  getInitialState:function(){
    return { }
  },
  shouldComponentUpdate:function(nextProps,nextState) {
    if (!this.props.tabs || !nextProps.tabs) return true;
    return (nextProps.tabs.length!=this.props.tabs.length || this.props.tabs.updated);
  },
  tabnav:function(T) {
    var closebutton=(T.notclosable)?"":
       React.createElement("button", {className: "close", type: "button", onClick: this.closeTab}, 
       String.fromCharCode(0xd7)
       );
    return (
      React.createElement("li", {ref: T.id, key: "N"+T.id}, 
        React.createElement("a", {"data-id": T.id, "data-target": "[data-id='C-"+T.id+"']", 
          onClick: this.clickTab, href: "#"}, T.caption, closebutton
        )
      )
    )
  },
  tabcontent:function(T) {
  
    if (T.params) T.params.tab = T;
    return React.createElement("div",{ref:contentpf+T.id, key:"C"+T.id,"data-id":"C-"+T.id
    ,className:"tab-pane"},React.createElement(T.content,T.params));
  },

  render:function() {
    var tabnav=this.tabnav, tabcontent=this.tabcontent;
    return (
    React.createElement("div", null, 
      React.createElement("ul", {className: "nav nav-tabs"}, 
       this.props.tabs.map(function(T){return tabnav(T) })  
      ), 
      React.createElement("div", {className: "tab-content"}, 
       this.props.tabs.map(function(T){return tabcontent(T) }) 
      )
    )  
  );
  },
  clickTab:function(e) {
    var anchor=e.target;
    if (anchor.nodeName!=='A') anchor=anchor.parentElement;
    e.preventDefault();

    var id=anchor.attributes['data-id'].value;
    if(id=="addbutton") id="p_newtab"; 
    this.props.tabs[1].nowbambo = id.substring(2,id.length); 
    this.goTab(id);
  },
  goTab:function(id,params) {
    $(this.refs[id].getDOMNode()).find("a").tab('show');
    var activated=this.props.tabs.filter(function(t){return t.id==id});
    if (activated.length && activated[0].params&&
      activated[0].params.tab &&
      activated[0].params.tab.instance&&
      activated[0].params.tab.instance.onShow) {
      activated[0].params.tab.instance.onShow(params);
    }
  },
  goActiveTab:function() {
    var goTab=this.goTab;
    var t=this.props.tabs.some(function(T){ 
      return T.active?goTab(T.id):false;
    });
    this.props.tabs.map(function(T){T.active=false});
  },
  closeTab:function(e) {
    var anchor=e.target.parentElement;
    var id=anchor.attributes['data-id'].value;
    var tabs=this.props.tabs;
    for (var i=0;i<tabs.length;i++) {
      if (tabs[i].id==id) {
        tabs.splice(i,1);
        //if (i) tabs[i-1].active=true;
        if (i && tabs.length > 4) 
        { 
            tabs[i-1].active=true; 
          } 
          else if (i && tabs.length  == 4)  
          { 
            tabs.splice(i-1,1); 
           tabs[i-3].active=true; 
          }  
         this.forceUpdate();
        //this.setState({"tabs":tabs});
        break;
      }
    }
  }, 
  newTab:function(T,idx) {
    var tabs=this.props.tabs;
    var idx=idx||tabs.length;
    var tabexists=false;
    for (var i=0;i<tabs.length;i++) {
      if (tabs[i].id==T.id) {
        tabs[i]=T;
        tabexists=true;
      } else {
        tabs[i].active=false;  
      }
    }
    if (!tabexists) tabs.splice(idx,0,T);
    //this.setState({"tabs":tabs});
    this.forceUpdate();
  },
  makeScrollable:function() {
    var h=document.body.offsetHeight-70; 
    var w=this.getDOMNode().offsetWidth;
    for (var i in this.refs) {
      if (i.substring(0,contentpf.length)!=contentpf)continue;
      var t=this.refs[i].getDOMNode();
      t.style.height=h;
      t.style.width=w;
      t.style.overflow="auto";
    }
  },
  componentDidMount:function() {
    this.goActiveTab();
  },
  componentDidUpdate:function() {
    this.props.tabs.updated=false;
    this.makeScrollable();
    this.goActiveTab();
  }
});

module.exports=Tabui;
},{"react":"react"}],"d:\\ksana2015\\ketaka\\src\\userinfo.jsx":[function(require,module,exports){
var pouch=require("./persistentmarkup_pouchdb");
var React=require("react");
//var crypto=require('./crypto');
var userinfo = React.createClass({displayName: "userinfo",
getInitialState: function() {
    return {bar: "world",pwtype:""};
  },
  changepassword:function() {
      if(this.state.pwtype == "") this.setState({pwtype:"change"});
      else this.setState({pwtype:""});
  },
  savepassword:function() {
    var ip = location.host.split(":")[0];
    var pwd = this.refs.new_password.getDOMNode().value,cpwd=this.refs.confirm_new_signup_pass.getDOMNode().value;
    if(this.refs.old_password.getDOMNode().value != this.props.user.pwd) {that.props.action("myinput",2,"confirm_new");return;}
    else if(pwd != cpwd || pwd =="" || cpwd == "") {return;}
    var db = new PouchDB('http://'+ip+':5984/account');
    var data = [{name:this.props.user.name,su:this.props.user.su,admin:this.props.user.admin,pwd:pwd},{pwd:pwd}];
    pouch.readfrompouch(db,this.props.user.name,this.changepasswrordstate,2,data);
  },
  changepasswrordstate:function(res) {
      this.setState({pwtype:"",pwd:res.pwd});
  },
  saveprofile:function(id,admin,pwd,type) {
    var that =this;
    var ip = location.host.split(":")[0];
    var nowloc = document.getElementById(id).rowIndex;
    var db = new PouchDB('http://'+ip+':5984/account');
    if(type == true) {
       that.props.users.splice(parseInt(nowloc)-1,1);
       that.setState({pwtype:""});
       pouch.removetopouch(db,id);
    }
    else {
     for(var i=0;i<this.props.users.length;i++) {
          if(this.props.users[i].id == id) {
            var data = [{name:id,su:this.props.users[i].doc.su,admin:admin,pwd:pwd||this.props.users[i].doc.pwd}];
            break;}
     }
     pouch.readfrompouch(db,id,this.showalert,2,data);
    }
  },
  showalert:function() {
     this.props.action("myalert",0);
  },
  select_chief:function(e){
    this.saveprofile(e.target.id,true);
  },
  select_proof:function(e){
    this.saveprofile(e.target.id,false);
  },
  select_password:function(e){
    var arr = e.target.id.split("+");
    this.saveprofile(arr[0],arr[1],document.getElementById(arr[2]).value);
  },
  delete_user:function(e){
    var arr = e.target.id.split("+");
    this.saveprofile(arr[0],arr[1],document.getElementById(arr[2]).value,true);
  },
  role_list:function(f) {
    if (f.doc.admin == true) {return React.createElement("div", null, 
    React.createElement("div", {className: "btn-group", "data-toggle": "buttons"}, 
      React.createElement("label", {className: "btn active rolebutton_style", onClick: this.select_chief, id: f.id}, React.createElement("input", {type: "radio", name: f.id, value: "Chief Editor"}, "Chief Editor")), 
      React.createElement("label", {className: "btn rolebutton_style", onClick: this.select_proof, id: f.id}, React.createElement("input", {type: "radio", name: f.id, value: "Proof Reader"}, "Proof Reader"))
    ))}
    else {return React.createElement("div", null, 
      React.createElement("div", {className: "btn-group", "data-toggle": "buttons"}, 
      React.createElement("label", {className: "btn rolebutton_style", onClick: this.select_chief, id: f.id}, React.createElement("input", {type: "radio", name: f.id, value: "Chief Editor"}, "Chief Editor")), 
      React.createElement("label", {className: "btn active rolebutton_style", onClick: this.select_proof, id: f.id}, React.createElement("input", {type: "radio", name: f.id, value: "Proof Reader"}, "Proof Reader"))
    ))
    }
  },
  user_list:function() {
    if(this.props.user.su == true){
    var cls="",out=[];
    if(this.props.users) {
       out.push(React.createElement("tr", null, React.createElement("td", null, 
          React.createElement("div", {className: "col-md-1"}), 
          React.createElement("div", {className: "col-md-2"}, React.createElement("h4", null, "Name")), 
          React.createElement("div", {className: "col-md-4"}, React.createElement("h4", null, "Password")), 
          React.createElement("div", {className: "col-md-4 pull-right"}, React.createElement("h4", null, "Role"))
        )));
      for (var i=0;i<this.props.users.length;i++) {
      var f=this.props.users[i];
      if(f.doc.su == true)  out.push(React.createElement("tr", null));
      else {
      out.push(React.createElement("tr", {id: f.id}, React.createElement("td", null, 
          React.createElement("div", {className: "col-md-1"}, React.createElement("img", {src: "photo/"+this.props.users[i].id+".jpg?"+ new Date().getTime(), ref: "user_photo", id: "user"+i, className: "showphoto_style", onError: this.photo_error})), 
          React.createElement("div", {className: "col-md-2"}, React.createElement("h4", null, f.id)), 
          React.createElement("div", {className: "col-md-4"}, React.createElement("input", {type: "text", defaultValue: f.doc.pwd, id: i}), React.createElement("button", {className: "btn btn-success btn-block control_D-halfsize pull-right", id: f.id+"+"+f.doc.admin+"+"+i, onClick: this.select_password}, "Change Password")), 
          React.createElement("div", {className: "col-md-4 pull-right"}, this.role_list(f)), 
          React.createElement("div", {className: "col-md-1"}, React.createElement("button", {className: "btn btn-danger btn-block pull-right", style: {width:"80px"}, id: f.id+"+"+f.doc.admin+"+"+i, onClick: this.delete_user}, "Delete"))
        )));
      }
    };
    return out;
   }
  }
  },
  refresh_photo:function(e) {
    var that = this;
    setTimeout(function(){
      that.getDOMNode().querySelector('#photo_1').src = "photo/"+that.props.user.name+".jpg?"+ new Date().getTime(); 
      that.props.action("change_mainphoto");
    },1000); 
  },
  photo_error:function(e) {
     var img = e.target;
     img.src= 'images/photo.png';
  },
  checkoldpassword:function() {
     if(this.refs.old_password.getDOMNode().value != this.props.user.pwd) this.props.action("myinput",0,"old_password");
     else this.props.action("myinput",1,"old_password");
  },
  confirmnewpwd:function() {
    if(this.refs.new_password.getDOMNode().value != this.refs.confirm_new_signup_pass.getDOMNode().value) {this.props.action("myinput",2,"confirm_new");}
    else {this.props.action("myinput",1,"confirm_new");}
  },
  password:function() {
      if(this.state.pwtype == "change") return React.createElement("div", null, 
        React.createElement("div", {className: "col-md-2 col-md-offset-1"}, React.createElement("br", null), 
        React.createElement("div", {className: "form-group has-feedback", id: "old_password_form"}, 
          React.createElement("input", {ref: "old_password", type: "password", className: "form-control control_D-halfsize", placeholder: "Old Password", onBlur: this.checkoldpassword}), React.createElement("br", null), 
          React.createElement("span", {className: "glyphicon form-control-feedback", id: "old_password_icon", style: {left:"120px"}})), 
         React.createElement("div", {className: "form-group has-feedback", id: "new_password_from"}, 
          React.createElement("input", {ref: "new_password", type: "password", className: "form-control control_D-halfsize", placeholder: "New Password"}), React.createElement("br", null), 
          React.createElement("span", {className: "glyphicon form-control-feedback", id: "new_password_icon", style: {left:"120px"}})), 
         React.createElement("div", {className: "form-group has-feedback", id: "confirm_new_form"}, 
          React.createElement("input", {ref: "confirm_new_signup_pass", type: "password", className: "form-control control_D-halfsize", placeholder: "Confirm Password", onChange: this.confirmnewpwd}), 
          React.createElement("span", {className: "glyphicon form-control-feedback", id: "confirm_new_icon", style: {left:"120px"}}))
        ), React.createElement("div", {className: "col-md-2 col-md-offset-3"}, React.createElement("button", {className: "btn btn-success btn-block changepassword", onClick: this.savepassword}, "Save")), 
        React.createElement("div", {className: "col-md-2 col-md-offset-3"}, React.createElement("button", {className: "btn btn-warning btn-block changepassword", onClick: this.changepassword}, "Cancel")))
      else return React.createElement("div", null, React.createElement("div", {className: "col-md-3 col-md-offset-1"}, React.createElement("button", {className: "btn btn-success btn-block changepassword", onClick: this.changepassword}, "Change Password")))
  },
  render: function() {
     return React.createElement("div", null, 
            React.createElement("div", {className: "alert_ok alert-success", style: {width:window.innerWidth}}, 
              React.createElement("strong", null, "Saved successfully!")
            ), 
           React.createElement("div", {className: "col-md-4 col-md-offset-4"}, 
            React.createElement("div", null, React.createElement("div", {className: "col-md-5"}, React.createElement("img", {src: "photo/"+this.props.user.name+".jpg?"+ new Date().getTime(), id: "photo_1", className: "photostyle", onError: this.photo_error}))), 
            React.createElement("div", {className: "col-md-6"}, React.createElement("form", {action: "upload.php", method: "post", encType: "multipart/form-data"}, React.createElement("h4", null, "Change your photo"), React.createElement("input", {type: "hidden", name: "number", value: this.props.user.name}), React.createElement("input", {type: "hidden", name: "folder", value: "photo"}), React.createElement("input", {type: "file", name: "upload"}), 
            React.createElement("div", null, React.createElement("input", {type: "submit", className: "btn btn-success btn-block pull-left", name: "button", id: "button", value: "Upload", style: {width:"110px",marginBottom:"10px"}, onClick: this.refresh_photo}))
            )), 
            React.createElement("div", {className: "col-md-3 col-md-offset-1"}, React.createElement("h3", null, "Username:")), React.createElement("div", {className: "col-md-7 col-md-offset-1"}, React.createElement("h3", null, this.props.user.name)), 
            React.createElement("div", {className: "col-md-3 col-md-offset-1"}, React.createElement("h3", null, "Password:")), React.createElement("div", null, this.password())
          ), 
          React.createElement("div", {className: "fileList col-md-11 col-md-offset-1", style: {height:window.innerHeight-380}}, 
          React.createElement("table", {className: "table table-hover", id: "user_table"}, 
            React.createElement("tbody", null, this.user_list())))
        );
  }
});
module.exports=userinfo;
},{"./persistentmarkup_pouchdb":"d:\\ksana2015\\ketaka\\src\\persistentmarkup_pouchdb.js","react":"react"}],"d:\\ksana2015\\ketaka\\src\\userlogin.jsx":[function(require,module,exports){
var Signup=require("./usersignup.jsx");
var Info=require("./userinfo.jsx");
var pouch=require("./persistentmarkup_pouchdb");
var React=require("react");
//var crypto=require('./crypto');
var userlogin = React.createClass({displayName: "userlogin",
getInitialState: function() {
    return {bar: "world",type:"",file:"",pwd:""};
  },
  login:function() {
    var ip = location.host.split(":")[0];
    var db = new PouchDB('http://'+ip+':5984/account');
    pouch.readallfrompouch(db,this.login_check,0);
  },
  login_check:function(res) {
    var userinfo = "";
    var loginfo =false;
    var user=this.refs.username.getDOMNode().value;
    var pswd=this.refs.password.getDOMNode().value;
    for(var i=0;i<res.rows.length;i++){       
        if(res.rows[i].doc._id == user && res.rows[i].doc.pwd == pswd)
        {
          userinfo = res.rows[i].doc;
          loginfo = true;
        }
        if(res.rows[i].doc._id == user && res.rows[i].doc.pwd != pswd)
        {
          loginfo = "failed";
          this.props.action("myinput",0,"loginpwd");
          this.props.action("myinput",1,"loginname");
          }
        } 
        if(loginfo == false) {
         this.props.action("myinput",0,"loginname");
        }
        this.props.action("login",userinfo,loginfo,res.rows,pswd);
  },
  /*
  logout:function() {
    this.props.action("logout");
  },
  */
  /*
  startwork:function() {
    this.props.action("start");
  },*/
  /*
  isAdmin:function() {
    if (this.props.user.admin) {
      return  <span className="label label-success">admin</span>
    }   
  },*/
  singup:function() {
    this.refs.password.getDOMNode().value = "";
    this.setState({type:"signup"});
  },
  cancel_signup:function() {
    //this.refs.confirm_signup_pass.getDOMNode().value = "";
    //aaa
    this.setState({type:""});
  },
  passwordchange:function() {
    this.forceUpdate(); 
  },
  enterusername:function(e) {
    if (e.charCode==13) {
      this.refs.password.getDOMNode().focus();
    }
  },
  enterpassword:function(e) {
    if (e.charCode==13) this.login();
  },
  encryptedpassword:function() {
    if (!this.refs.password) return "";
    var password=this.refs.password.getDOMNode().value;
    //return password+"!"
    //return crypto.SHA1(password).toString();
    return password;
  },
  renderLogin:function() {
  return (
   React.createElement("div", null, 
     React.createElement("div", {className: "col-md-12 marginTop"}), 
      React.createElement("div", {className: "col-md-6 col-md-offset-4"}, 
      React.createElement("div", {className: "col-md-offset-1"}, 
        React.createElement("img", {src: "images/logo.jpg", className: "logostyle"}), 
        React.createElement("div", {className: "form-group has-feedback", id: "loginname_form"}, 
          React.createElement("input", {onKeyPress: this.enterusername, id: "loginname", ref: "username", className: "form-control control_size", placeholder: "Username", required: "true", autofocus: "true"}), 
          React.createElement("span", {className: "glyphicon form-control-feedback", style: {left:"220px"}, id: "loginname_icon"})), 
        React.createElement("h2", {className: "label label-danger"}, this.props.getError()), React.createElement("br", null), 
        React.createElement("div", {className: "form-group has-feedback", id: "loginpwd_form"}, 
          React.createElement("input", {onKeyPress: this.enterpassword, ref: "password", type: "password", className: "form-control control_size", placeholder: "Password"}), 
          React.createElement("span", {className: "glyphicon form-control-feedback", style: {left:"220px"}, id: "loginpwd_icon"})), 
        React.createElement("h2", {className: "label label-danger"}, this.props.getpasswordError()), React.createElement("br", null), 
        React.createElement("button", {ref: "encrypted", id: "btnlogin", className: "btn btn-lg btn-success btn-block control_size", onClick: this.login}, "Log in"), 
        React.createElement("div", {className: "create_acc"}, React.createElement("a", {onClick: this.singup}, React.createElement("h4", null, "Create account")))
        ), 
		React.createElement("div", {className: "col-md-5 col-md-offset-3"}, React.createElement("h6", null, "version. 0.0.05"))
       )
       )
    );
  },
  render: function() {
    if (this.props.user.name) {
      return React.createElement(Info, {action: this.props.action, user: this.props.user, users: this.props.users});
    }else if(!this.props.user.name && this.state.type=="signup") {
      return React.createElement(Signup, {action: this.props.action, cancel: this.cancel_signup});
    }else {
      return this.renderLogin();
    }
  }
});
module.exports=userlogin;
},{"./persistentmarkup_pouchdb":"d:\\ksana2015\\ketaka\\src\\persistentmarkup_pouchdb.js","./userinfo.jsx":"d:\\ksana2015\\ketaka\\src\\userinfo.jsx","./usersignup.jsx":"d:\\ksana2015\\ketaka\\src\\usersignup.jsx","react":"react"}],"d:\\ksana2015\\ketaka\\src\\usersignup.jsx":[function(require,module,exports){
var pouch=require("./persistentmarkup_pouchdb");
var React=require("react");
//var crypto=require('./crypto');
var usersignup = React.createClass({displayName: "usersignup",
getInitialState: function() {
    return {unametype:"error"};
  },
  signup:function() {
    var user = [this.refs.signup_username.getDOMNode().value,this.refs.signup_pass.getDOMNode().value,this.refs.confirm_signup_pass.getDOMNode().value];
    var target = ["signupname","signuppwd","signupconfirmpwd"];
    var unametype = this.state.unametype;
    for(var i = 0;i<user.length;i++) {
      if(user[i] == "") {
        this.props.action("myinput",0,target[i]);
        unametype = "error";
        break;
      }
    }
    if(user[1] != user[2] || unametype=="error") return;
    else {
      var ip = location.host.split(":")[0];
      var db = new PouchDB('http://'+ip+':5984/account');
      var todo ={_id:user[0], admin:false, su:false, name:user[0], pwd:user[1]};
      pouch.savetopouch(db,todo,this.signup_success);
    }
  },
  signup_success:function() {
    this.setState({unametype:"error"});
    this.cancelsignup();
  },
  checkuname_response:function(msg) {
    if(msg == null) {this.props.action("myinput",0,"signupname");this.setState({unametype:"error"});
      document.getElementById("name_error").innerHTML = "Username has already been taken";}
      else {this.props.action("myinput",1,"signupname");this.setState({unametype:"ok"});
      document.getElementById("name_error").innerHTML = "";}
  },
  checkname:function() {
    var ip = location.host.split(":")[0];
    if(this.refs.signup_username.getDOMNode().value == "") return;
    var name = this.refs.signup_username.getDOMNode().value;
    var db = new PouchDB('http://'+ip+':5984/account');
    pouch.readfrompouch(db,name,this.checkuname_response,0);
  },
  checkpwd:function() {
    if(this.refs.signup_pass.getDOMNode().value == "") {this.props.action("myinput",0,"signuppwd");}
    else {this.props.action("myinput",1,"signuppwd");}
  },
  Confirmpwd:function() {
    var user = [this.refs.signup_pass.getDOMNode().value,this.refs.confirm_signup_pass.getDOMNode().value];
    if(user[0] != user[1]) {this.props.action("myinput",2,"signupconfirmpwd");}
    else {this.props.action("myinput",1,"signupconfirmpwd");}
  },
  cancelsignup:function() {
    this.refs.confirm_signup_pass.getDOMNode().value = "";
    this.props.cancel();
    //this.setState({type:""});
  },
  render: function() {
    return (  
    React.createElement("div", null, 
      React.createElement("div", {className: "col-md-4 col-md-offset-4"}, 
        React.createElement("div", {className: "col-md-12"}, 
        React.createElement("form", {action: "upload.php", method: "post", encType: "multipart/form-data"}, React.createElement("h3", null, "Select a photo"), React.createElement("input", {type: "hidden", name: "folder", value: "photo"}), React.createElement("input", {type: "file", name: "upload"}), 
        React.createElement("div", {className: "form-group has-feedback", id: "signupname_form"}, 
          React.createElement("label", {className: "control-label", id: "name_error", style: {color:"red"}}, " "), 
          React.createElement("input", {ref: "signup_username", className: "form-control control_size", name: "number", placeholder: "Username", required: "true", autofocus: "true", onBlur: this.checkname}), React.createElement("br", null), 
          React.createElement("span", {className: "glyphicon form-control-feedback", id: "signupname_icon", style: {left:"220px"}})), 
          React.createElement("div", {className: "form-group has-feedback", id: "signuppwd_form"}, 
          React.createElement("label", null), 
          React.createElement("input", {ref: "signup_pass", type: "password", className: "form-control control_size", placeholder: "Password", onBlur: this.checkpwd}), React.createElement("br", null), 
          React.createElement("span", {className: "glyphicon form-control-feedback", id: "signuppwd_icon", style: {left:"220px",top:"20px"}})), 
          React.createElement("div", {className: "form-group has-feedback", id: "signupconfirmpwd_form"}, 
          React.createElement("label", {className: " control-label", id: "confirm_error", style: {color:"red"}}), 
          React.createElement("input", {ref: "confirm_signup_pass", type: "password", className: "form-control control_size", placeholder: "Confirm Password", onChange: this.Confirmpwd}), React.createElement("br", null), React.createElement("div", null, 
          React.createElement("span", {className: "glyphicon form-control-feedback", id: "signupconfirmpwd_icon", style: {left:"220px",top:"20px"}}))
        ), 
        React.createElement("div", {style: {width:"260px"}}, 
        React.createElement("div", null, React.createElement("input", {type: "submit", className: "btn btn-success btn-block pull-left", name: "button", id: "button", value: "Confirm", onClick: this.signup, style: {width:"110px"}})), 
        React.createElement("div", null, React.createElement("button", {className: "btn btn-warning btn-block control_S-halfsize pull-right", onClick: this.cancelsignup}, "Cancel"))
        )
        )
        ))
    )
    );
  }
});
module.exports=usersignup;
},{"./persistentmarkup_pouchdb":"d:\\ksana2015\\ketaka\\src\\persistentmarkup_pouchdb.js","react":"react"}],"d:\\ksana2015\\node_modules\\ksana-analyzer\\configs.js":[function(require,module,exports){
var tokenizers=require('./tokenizers');
var normalizeTbl=null;
var setNormalizeTable=function(tbl,obj) {
	if (!obj) {
		obj={};
		for (var i=0;i<tbl.length;i++) {
			var arr=tbl[i].split("=");
			obj[arr[0]]=arr[1];
		}
	}
	normalizeTbl=obj;
	return obj;
}
var normalize1=function(token) {
	if (!token) return "";
	token=token.replace(/[ \n\.,，。！．「」：；、]/g,'').trim();
	if (!normalizeTbl) return token;
	if (token.length==1) {
		return normalizeTbl[token] || token;
	} else {
		for (var i=0;i<token.length;i++) {
			token[i]=normalizeTbl[token[i]] || token[i];
		}
		return token;
	}
}
var isSkip1=function(token) {
	var t=token.trim();
	return (t=="" || t=="　" || t=="※" || t=="\n");
}
var normalize_tibetan=function(token) {
	return token.replace(/[།་ ]/g,'').trim();
}

var isSkip_tibetan=function(token) {
	var t=token.trim();
	return (t=="" || t=="　" ||  t=="\n");	
}
var simple1={
	func:{
		tokenize:tokenizers.simple
		,setNormalizeTable:setNormalizeTable
		,normalize: normalize1
		,isSkip:	isSkip1
	}
	
}
var tibetan1={
	func:{
		tokenize:tokenizers.tibetan
		,setNormalizeTable:setNormalizeTable
		,normalize:normalize_tibetan
		,isSkip:isSkip_tibetan
	}
}
module.exports={"simple1":simple1,"tibetan1":tibetan1}
},{"./tokenizers":"d:\\ksana2015\\node_modules\\ksana-analyzer\\tokenizers.js"}],"d:\\ksana2015\\node_modules\\ksana-analyzer\\index.js":[function(require,module,exports){
/* 
  custom func for building and searching ydb

  keep all version
  
  getAPI(version); //return hash of functions , if ver is omit , return lastest
	
  postings2Tree      // if version is not supply, get lastest
  tokenize(text,api) // convert a string into tokens(depends on other api)
  normalizeToken     // stemming and etc
  isSpaceChar        // not a searchable token
  isSkipChar         // 0 vpos

  for client and server side
  
*/
var configs=require("./configs");
var config_simple="simple1";
var optimize=function(json,config) {
	config=config||config_simple;
	return json;
}

var getAPI=function(config) {
	config=config||config_simple;
	var func=configs[config].func;
	func.optimize=optimize;
	if (config=="simple1") {
		//add common custom function here
	} else if (config=="tibetan1") {

	} else throw "config "+config +"not supported";

	return func;
}

module.exports={getAPI:getAPI};
},{"./configs":"d:\\ksana2015\\node_modules\\ksana-analyzer\\configs.js"}],"d:\\ksana2015\\node_modules\\ksana-analyzer\\tokenizers.js":[function(require,module,exports){
var tibetan =function(s) {
	//continuous tsheg grouped into same token
	//shad and space grouped into same token
	var offset=0;
	var tokens=[],offsets=[];
	s=s.replace(/\r\n/g,'\n').replace(/\r/g,'\n');
	var arr=s.split('\n');

	for (var i=0;i<arr.length;i++) {
		var last=0;
		var str=arr[i];
		str.replace(/[།་ ]+/g,function(m,m1){
			tokens.push(str.substring(last,m1)+m);
			offsets.push(offset+last);
			last=m1+m.length;
		});
		if (last<str.length) {
			tokens.push(str.substring(last));
			offsets.push(offset+last);
		}
		if (i===arr.length-1) break;
		tokens.push('\n');
		offsets.push(offset+last);
		offset+=str.length+1;
	}

	return {tokens:tokens,offsets:offsets};
};
var isSpace=function(c) {
	return (c==" ") ;//|| (c==",") || (c==".");
}
var isCJK =function(c) {return ((c>=0x3000 && c<=0x9FFF) 
|| (c>=0xD800 && c<0xDC00) || (c>=0xFF00) ) ;}
var simple1=function(s) {
	var offset=0;
	var tokens=[],offsets=[];
	s=s.replace(/\r\n/g,'\n').replace(/\r/g,'\n');
	arr=s.split('\n');

	var pushtoken=function(t,off) {
		var i=0;
		if (t.charCodeAt(0)>255) {
			while (i<t.length) {
				var c=t.charCodeAt(i);
				offsets.push(off+i);
				tokens.push(t[i]);
				if (c>=0xD800 && c<=0xDFFF) {
					tokens[tokens.length-1]+=t[i]; //extension B,C,D
				}
				i++;
			}
		} else {
			tokens.push(t);
			offsets.push(off);	
		}
	}
	for (var i=0;i<arr.length;i++) {
		var last=0,sp="";
		str=arr[i];
		str.replace(/[_0-9A-Za-z]+/g,function(m,m1){
			while (isSpace(sp=str[last]) && last<str.length) {
				tokens[tokens.length-1]+=sp;
				last++;
			}
			pushtoken(str.substring(last,m1)+m , offset+last);
			offsets.push(offset+last);
			last=m1+m.length;
		});

		if (last<str.length) {
			while (isSpace(sp=str[last]) && last<str.length) {
				tokens[tokens.length-1]+=sp;
				last++;
			}
			pushtoken(str.substring(last), offset+last);
			
		}		
		offsets.push(offset+last);
		offset+=str.length+1;
		if (i===arr.length-1) break;
		tokens.push('\n');
	}

	return {tokens:tokens,offsets:offsets};

};

var simple=function(s) {
	var token='';
	var tokens=[], offsets=[] ;
	var i=0; 
	var lastspace=false;
	var addtoken=function() {
		if (!token) return;
		tokens.push(token);
		offsets.push(i);
		token='';
	}
	while (i<s.length) {
		var c=s.charAt(i);
		var code=s.charCodeAt(i);
		if (isCJK(code)) {
			addtoken();
			token=c;
			if (code>=0xD800 && code<0xDC00) { //high sorragate
				token+=s.charAt(i+1);i++;
			}
			addtoken();
		} else {
			if (c=='&' || c=='<' || c=='?' || c=="," || c=="."
			|| c=='|' || c=='~' || c=='`' || c==';' 
			|| c=='>' || c==':' 
			|| c=='=' || c=='@'  || c=="-" 
			|| c==']' || c=='}'  || c==")" 
			//|| c=='{' || c=='}'|| c=='[' || c==']' || c=='(' || c==')'
			|| code==0xf0b || code==0xf0d // tibetan space
			|| (code>=0x2000 && code<=0x206f)) {
				addtoken();
				if (c=='&' || c=='<'){ // || c=='{'|| c=='('|| c=='[') {
					var endchar='>';
					if (c=='&') endchar=';'
					//else if (c=='{') endchar='}';
					//else if (c=='[') endchar=']';
					//else if (c=='(') endchar=')';

					while (i<s.length && s.charAt(i)!=endchar) {
						token+=s.charAt(i);
						i++;
					}
					token+=endchar;
					addtoken();
				} else {
					token=c;
					addtoken();
				}
				token='';
			} else {
				if (c==" ") {
					token+=c;
					lastspace=true;
				} else {
					if (lastspace) addtoken();
					lastspace=false;
					token+=c;
				}
			}
		}
		i++;
	}
	addtoken();
	return {tokens:tokens,offsets:offsets};
}
module.exports={simple:simple,tibetan:tibetan};
},{}],"d:\\ksana2015\\node_modules\\ksana-database\\bsearch.js":[function(require,module,exports){
var indexOfSorted = function (array, obj, near) { 
  var low = 0,
  high = array.length;
  while (low < high) {
    var mid = (low + high) >> 1;
    if (array[mid]==obj) return mid;
    array[mid] < obj ? low = mid + 1 : high = mid;
  }
  if (near) return low;
  else if (array[low]==obj) return low;else return -1;
};
var indexOfSorted_str = function (array, obj, near) { 
  var low = 0,
  high = array.length;
  while (low < high) {
    var mid = (low + high) >> 1;
    if (array[mid]==obj) return mid;
    //(array[mid].localeCompare(obj)<0) ? low = mid + 1 : high = mid;
    array[mid]<obj ? low=mid+1 : high=mid;
  }
  if (near) return low;
  else if (array[low]==obj) return low;else return -1;
};


var bsearch=function(array,value,near) {
	var func=indexOfSorted;
	if (typeof array[0]=="string") func=indexOfSorted_str;
	return func(array,value,near);
}
var bsearchNear=function(array,value) {
	return bsearch(array,value,true);
}

module.exports=bsearch;//{bsearchNear:bsearchNear,bsearch:bsearch};
},{}],"d:\\ksana2015\\node_modules\\ksana-database\\exportas.js":[function(require,module,exports){
/* tag generated by ksana-indexer/rawtags.js */
var injectTag=function(content,tagoffsets,tags,start,end) {
	var n=start;
	var offset=tagoffsets[n];
	var out="";
	for (var i=0;i<content.length;i++) {
		if (offset===i && n<end) {
			out+="<"+tags[n]+">";
			offset=tagoffsets[++n];
			if (n==end) { //no more tag, copy rest text
				out+=content.substr(i);
				break;
			}			
		}
		out+=content[i];
	}

	return out;
}


var dump=function(filecontents,segnames,segoffsets,rawtag) {
	var now=0,n=0;
	var output="";
	for (var i=0;i<filecontents.length;i++) {
		for (var j=0;j<filecontents[i].length;j++) {

			var content=filecontents[i][j];
			if (rawtag.seg[n]==now) {
				var start=rawtag.ends[n-1]||0;
				var end=rawtag.ends[n];
				content=injectTag(content,rawtag.offset,rawtag.tag,start,end);
				n++;
			}
			content=content.replace(/\n/g,"\\n").replace(/\t/g,"\\t");
			output+=segnames[now]+","+content+"\n";
			now++;
		}
	}
	return output;
}

var exportAsCSV=function(cb) {
  this.get([["filecontents"],["segnames"],["segoffsets"],["rawtag"]],{recursive:true},function(data){
  	var buf=dump(data[0],data[1],data[2],data[3]);
  	cb(buf);
  })
}

module.exports={CSV:exportAsCSV};
},{}],"d:\\ksana2015\\node_modules\\ksana-database\\index.js":[function(require,module,exports){
var KDE=require("./kde");
//currently only support node.js fs, ksanagap native fs, html5 file system
//use socket.io to read kdb from remote server in future
module.exports=KDE;
},{"./kde":"d:\\ksana2015\\node_modules\\ksana-database\\kde.js"}],"d:\\ksana2015\\node_modules\\ksana-database\\kde.js":[function(require,module,exports){
/* Ksana Database Engine

   2015/1/2 , 
   move to ksana-database
   simplified by removing document support and socket.io support


*/
var pool={},localPool={};
var apppath="";
var bsearch=require("./bsearch");
var Kdb=require('ksana-jsonrom');
var kdbs=[]; //available kdb , id and absolute path
var strsep="\uffff";
var kdblisted=false;
/*
var _getSync=function(paths,opts) {
	var out=[];
	for (var i in paths) {
		out.push(this.getSync(paths[i],opts));	
	}
	return out;
}
*/
var _gets=function(paths,opts,cb) { //get many data with one call

	if (!paths) return ;
	if (typeof paths=='string') {
		paths=[paths];
	}
	var engine=this, output=[];

	var makecb=function(path){
		return function(data){
				if (!(data && typeof data =='object' && data.__empty)) output.push(data);
				engine.get(path,opts,taskqueue.shift());
		};
	};

	var taskqueue=[];
	for (var i=0;i<paths.length;i++) {
		if (typeof paths[i]=="null") { //this is only a place holder for key data already in client cache
			output.push(null);
		} else {
			taskqueue.push(makecb(paths[i]));
		}
	};

	taskqueue.push(function(data){
		output.push(data);
		cb.apply(engine.context||engine,[output,paths]); //return to caller
	});

	taskqueue.shift()({__empty:true}); //run the task
}

var getFileRange=function(i) {
	var engine=this;

	var filesegcount=engine.get(["filesegcount"]);
	if (filesegcount) {
		if (i==0) {
			return {start:0,end:filesegcount[0]-1};
		} else {
			return {start:filesegcount[i-1],end:filesegcount[i]-1};
		}
	}
	//old buggy code
	var filenames=engine.get(["filenames"]);
	var fileoffsets=engine.get(["fileoffsets"]);
	var segoffsets=engine.get(["segoffsets"]);
	var segnames=engine.get(["segnames"]);
	var filestart=fileoffsets[i], fileend=fileoffsets[i+1]-1;

	var start=bsearch(segoffsets,filestart,true);
	//if (segOffsets[start]==fileStart) start--;
	
	//work around for jiangkangyur
	while (segNames[start+1]=="_") start++;

  //if (i==0) start=0; //work around for first file
	var end=bsearch(segoffsets,fileend,true);
	return {start:start,end:end};
}

var absSegToFileSeg=function(absoluteseg) {
	var filesegcount=this.get("filesegcount");
	var s=absoluteseg;
	var file=0;
	while (s>filesegcount[file]) {
		s-=filesegcount[file];
		file++;
	}
	return {file:file,seg:s};
}

var fileSegToAbsSeg=function(file,seg) {
	if (file==0)return seg;
	return this.get("filesegcount")[file]+(seg);
}
/*
var vposToFileSeg=function(engine,vpos) {
    var segoffsets=engine.get("segoffsets");
    var fileoffsets=engine.get(["fileoffsets"]);
    var segnames=engine.get("segnames");
    var fileid=bsearch(fileoffsets,vpos+1,true);
    fileid--;
    var segid=bsearch(segoffsets,vpos+1,true);
	var range=engine.getFileRange(fileid);
	segid-=range.start;
    return {file:fileid,seg:segid};
}
*/
//return array of object of nfile nseg given segname
var findSeg=function(segname) {
	var segnames=this.get("segnames");
	var out=[];
	for (var i=0;i<segnames.length;i++) {
		if (segnames[i]==segname) {
			var fileseg=absSegToFileSeg.apply(this,[i]);
			out.push({file:fileseg.file,seg:fileseg.seg,absseg:i});
		}
	}
	return out;
}

var findFirstSeg=function(segs) {
	if (typeof segs=="string") {
		segs=[segs];
	}
	var segnames=this.get("segnames");
	var out=[];
	for (var i=0;i<segs.length;i++) {
		idx=segnames.indexOf(segs[i])
		var fileseg=absSegToFileSeg.apply(this,[idx]);
		out.push({file:fileseg.file,seg:fileseg.seg,absseg:idx});
	}
	return out;
}

var findFile=function(filename) {
	var filenames=this.get("filenames");
	for (var i=0;i<filenames.length;i++) {
		if (filenames[i]===filename) return i;
	}
	return -1;
}

var getFileSegOffsets=function(i) {
	var segoffsets=this.get("segoffsets");
	var range=getFileRange.apply(this,[i]);
	if (segoffsets.subarray) {
		return segoffsets.subarray(range.start,range.end+1);
	} else {
		return segoffsets.slice(range.start,range.end+1);	
	}
	

}
var absSegFromVpos=function(vpos) { 
	var segoffsets=this.get(["segoffsets"]);
	var i=bsearch(segoffsets,vpos,true);
	while (segoffsets[i]==vpos) i++;
	return i;
}

var fileSegFromVpos=function(vpos) { 
	var seg=absSegFromVpos.call(this,vpos);
	return absSegToFileSeg.call(this,seg);
}
var fileSegToVpos=function(f,s) {
	var segoffsets=this.get(["segoffsets"]);
	var seg=fileSegToAbsSeg(f,s);
	return segoffsets[seg-1];
}

var getFileSegNames=function(i) {
	var range=getFileRange.apply(this,[i]);
	var segnames=this.get("segnames");
	return segnames.slice(range.start,range.end+1);
}
var localengine_get=function(path,opts,cb,context) {
	var engine=this;
	if (typeof opts=="function") {
		context=cb;
		cb=opts;
		opts={recursive:false};
	}
	if (!path) {
		if (cb) cb.apply(context,[null]);
		return null;
	}

	if (typeof cb!="function") {
		return engine.kdb.get(path,opts);
	}

	if (typeof path=="string") {
		return engine.kdb.get([path],opts,cb,context);
	} else if (typeof path[0] =="string") {
		return engine.kdb.get(path,opts,cb,context);
	} else if (typeof path[0] =="object") {
		return _gets.apply(engine,[path,opts,cb,context]);
	} else {
		engine.kdb.get([],opts,function(data){
			cb.apply(context,[data]);//return top level keys
		},context);
	}
};	

var getPreloadField=function(user) {
	var preload=[["meta"],["filenames"],["fileoffsets"],["segnames"],["segoffsets"],["filesegcount"]];
	//["tokens"],["postingslen"] kse will load it
	if (user && user.length) { //user supply preload
		for (var i=0;i<user.length;i++) {
			if (preload.indexOf(user[i])==-1) {
				preload.push(user[i]);
			}
		}
	}
	return preload;
}
var createLocalEngine=function(kdb,opts,cb,context) {
	var engine={kdb:kdb, queryCache:{}, postingCache:{}, cache:{}};

	if (typeof context=="object") engine.context=context;
	engine.get=localengine_get;

	engine.segOffset=segOffset;
	engine.fileOffset=fileOffset;
	engine.folderOffset=folderOffset;
	engine.getFileSegNames=getFileSegNames;
	engine.getFileSegOffsets=getFileSegOffsets;
	engine.getFileRange=getFileRange;
	engine.findSeg=findSeg;
	engine.findFirstSeg=findFirstSeg;
	engine.findFile=findFile;
	engine.absSegToFileSeg=absSegToFileSeg;
	engine.fileSegToAbsSeg=fileSegToAbsSeg;
	engine.fileSegFromVpos=fileSegFromVpos;
	engine.absSegFromVpos=absSegFromVpos;
	engine.fileSegToVpos=fileSegToVpos;
	engine.exportAs=require('./exportas');
	
	//engine.fileSegToVpos=fileSegToVpos;
	//engine.vposToFileSeg=vposToFileSeg;
	//only local engine allow getSync
	//if (kdb.fs.getSync) engine.getSync=engine.kdb.getSync;
	
	//speedy native functions
	if (kdb.fs.mergePostings) {
		engine.mergePostings=kdb.fs.mergePostings.bind(kdb.fs);
	}
	
	var setPreload=function(res) {
		engine.dbname=res[0].name;
		//engine.customfunc=customfunc.getAPI(res[0].config);
		engine.ready=true;
	}

	var preload=getPreloadField(opts.preload);
	var opts={recursive:true};
	//if (typeof cb=="function") {
		_gets.apply(engine,[ preload, opts,function(res){
			setPreload(res);
			cb.apply(engine.context,[engine]);
		}]);
	//} else {
	//	setPreload(_getSync.apply(engine,[preload,opts]));
	//}
	return engine;
}

var segOffset=function(segname) {
	var engine=this;
	if (arguments.length>1) throw "argument : segname ";

	var segNames=engine.get("segnames");
	var segOffsets=engine.get("segoffsets");

	var i=segNames.indexOf(segname);
	return (i>-1)?segOffsets[i]:0;
}
var fileOffset=function(fn) {
	var engine=this;
	var filenames=engine.get("filenames");
	var offsets=engine.get("fileoffsets");
	var i=filenames.indexOf(fn);
	if (i==-1) return null;
	return {start: offsets[i], end:offsets[i+1]};
}

var folderOffset=function(folder) {
	var engine=this;
	var start=0,end=0;
	var filenames=engine.get("filenames");
	var offsets=engine.get("fileoffsets");
	for (var i=0;i<filenames.length;i++) {
		if (filenames[i].substring(0,folder.length)==folder) {
			if (!start) start=offsets[i];
			end=offsets[i];
		} else if (start) break;
	}
	return {start:start,end:end};
}

 //TODO delete directly from kdb instance
 //kdb.free();
var closeLocal=function(kdbid) {
	var engine=localPool[kdbid];
	if (engine) {
		engine.kdb.free();
		delete localPool[kdbid];
	}
}
var close=function(kdbid) {
	var engine=pool[kdbid];
	if (engine) {
		engine.kdb.free();
		delete pool[kdbid];
	}
}

var getLocalTries=function(kdbfn) {
	if (!kdblisted) {
		kdbs=require("./listkdb")();
		kdblisted=true;
	}

	var kdbid=kdbfn.replace('.kdb','');
	var tries= ["./"+kdbid+".kdb"
	           ,"../"+kdbid+".kdb"
	];

	for (var i=0;i<kdbs.length;i++) {
		if (kdbs[i][0]==kdbid) {
			tries.push(kdbs[i][1]);
		}
	}
	return tries;
}
var openLocalKsanagap=function(kdbid,opts,cb,context) {
	var kdbfn=kdbid;
	var tries=getLocalTries(kdbfn);

	for (var i=0;i<tries.length;i++) {
		if (fs.existsSync(tries[i])) {
			//console.log("kdb path: "+nodeRequire('path').resolve(tries[i]));
			var kdb=new Kdb.open(tries[i],function(err,kdb){
				if (err) {
					cb.apply(context,[err]);
				} else {
					createLocalEngine(kdb,opts,function(engine){
						localPool[kdbid]=engine;
						cb.apply(context||engine.context,[0,engine]);
					},context);
				}
			});
			return null;
		}
	}
	if (cb) cb.apply(context,[kdbid+" not found"]);
	return null;

}
var openLocalNode=function(kdbid,opts,cb,context) {
	var fs=require('fs');
	var tries=getLocalTries(kdbid);

	for (var i=0;i<tries.length;i++) {
		if (fs.existsSync(tries[i])) {

			new Kdb.open(tries[i],function(err,kdb){
				if (err) {
					cb.apply(context||engine.content,[err]);
				} else {
					createLocalEngine(kdb,opts,function(engine){
							localPool[kdbid]=engine;
							cb.apply(context||engine.context,[0,engine]);
					},context);
				}
			});
			return null;
		}
	}
	if (cb) cb.apply(context,[kdbid+" not found"]);
	return null;
}

var openLocalHtml5=function(kdbid,opts,cb,context) {	
	var engine=localPool[kdbid];
	var kdbfn=kdbid;
	if (kdbfn.indexOf(".kdb")==-1) kdbfn+=".kdb";
	new Kdb.open(kdbfn,function(err,handle){
		if (err) {
			cb.apply(context,[err]);
		} else {
			createLocalEngine(handle,opts,function(engine){
				localPool[kdbid]=engine;
				cb.apply(context||engine.context,[0,engine]);
			},context);
		}
	});
}
//omit cb for syncronize open
var openLocal=function(kdbid,opts,cb,context)  {
	if (typeof opts=="function") { //no opts
		if (typeof cb=="object") context=cb;
		cb=opts;
		opts={};
	}

	var engine=localPool[kdbid];
	if (engine) {
		if (cb) cb.apply(context||engine.context,[0,engine]);
		return engine;
	}

	var platform=require("./platform").getPlatform();
	if (platform=="node-webkit" || platform=="node") {
		openLocalNode(kdbid,opts,cb,context);
	} else if (platform=="html5" || platform=="chrome"){
		openLocalHtml5(kdbid,opts,cb,context);		
	} else {
		openLocalKsanagap(kdbid,opts,cb,context);	
	}
}
var setPath=function(path) {
	apppath=path;
	console.log("set path",path)
}

var enumKdb=function(cb,context){
	//if (kdbs.length) return kdbs.map(function(k){return k[0]});

	/*if (!kdblisted) {*/
		require("./listkdb")(function(files){
			kdbs=files;
			cb.call(context, kdbs.map(function(k){return k[0]}) );
		});
		kdblisted=true;
	//}
}

module.exports={open:openLocal,setPath:setPath, close:closeLocal, enumKdb:enumKdb, bsearch:bsearch};
},{"./bsearch":"d:\\ksana2015\\node_modules\\ksana-database\\bsearch.js","./exportas":"d:\\ksana2015\\node_modules\\ksana-database\\exportas.js","./listkdb":"d:\\ksana2015\\node_modules\\ksana-database\\listkdb.js","./platform":"d:\\ksana2015\\node_modules\\ksana-database\\platform.js","fs":false,"ksana-jsonrom":"d:\\ksana2015\\node_modules\\ksana-jsonrom\\index.js"}],"d:\\ksana2015\\node_modules\\ksana-database\\listkdb.js":[function(require,module,exports){
/* return array of dbid and absolute path*/
var listkdb_html5=function(cb,context) {
	ksana.runtime.html5fs.readdir(function(kdbs){
		cb.call(this,kdbs);
	},context||this);		
}

var listkdb_node=function(){
	var fs=require("fs");
	var path=require("path")
	var parent=path.resolve(process.cwd(),"..");
	var files=fs.readdirSync(parent);
	var output=[];
	files.map(function(f){
		var subdir=parent+path.sep+f;
		var stat=fs.statSync(subdir );
		if (stat.isDirectory()) {
			var subfiles=fs.readdirSync(subdir);
			for (var i=0;i<subfiles.length;i++) {
				var file=subfiles[i];
				var idx=file.indexOf(".kdb");
				if (idx>-1&&idx==file.length-4) {
					output.push([ file.substr(0,file.length-4), subdir+path.sep+file]);
				}
			}
		}
	})
	return output;
}
var fileNameOnly=function(fn) {
	var at=fn.lastIndexOf("/");
	if (at>-1) return fn.substr(at+1);
	return fn;
}
var listkdb_ksanagap=function() {
	var output=[];
	var apps=JSON.parse(kfs.listApps());
	for (var i=0;i<apps.length;i++) {
		var app=apps[i];
		if (app.files) for (var j=0;j<app.files.length;j++) {
			var file=app.files[j];
			if (file.substr(file.length-4)==".kdb") {
				output.push([app.dbid,fileNameOnly(file)]);
			}
		}
	};
	return output;
}
var listkdb=function(cb,context) {
	var platform=require("./platform").getPlatform();
	var files=[];
	if (platform=="node" || platform=="node-webkit") {
		files=listkdb_node();
	} else if (platform=="chrome") {
		files=listkdb_html5(cb,context);
	} else {
		files=listkdb_ksanagap();
	}
	return files;
}
module.exports=listkdb;
},{"./platform":"d:\\ksana2015\\node_modules\\ksana-database\\platform.js","fs":false,"path":false}],"d:\\ksana2015\\node_modules\\ksana-database\\platform.js":[function(require,module,exports){
var getPlatform=function() {
	if (typeof ksanagap=="undefined") {
		platform="node";
	} else {
		platform=ksanagap.platform;
	}
	return platform;
}
module.exports={getPlatform:getPlatform};
},{}],"d:\\ksana2015\\node_modules\\ksana-jsonrom\\html5read.js":[function(require,module,exports){

/* emulate filesystem on html5 browser */
/* emulate filesystem on html5 browser */
var read=function(handle,buffer,offset,length,position,cb) {//buffer and offset is not used
	var xhr = new XMLHttpRequest();
	xhr.open('GET', handle.url , true);
	var range=[position,length+position-1];
	xhr.setRequestHeader('Range', 'bytes='+range[0]+'-'+range[1]);
	xhr.responseType = 'arraybuffer';
	xhr.send();
	xhr.onload = function(e) {
		var that=this;
		setTimeout(function(){
			cb(0,that.response.byteLength,that.response);
		},0);
	}; 
}
var close=function(handle) {}
var fstatSync=function(handle) {
	throw "not implement yet";
}
var fstat=function(handle,cb) {
	throw "not implement yet";
}
var _open=function(fn_url,cb) {
		var handle={};
		if (fn_url.indexOf("filesystem:")==0){
			handle.url=fn_url;
			handle.fn=fn_url.substr( fn_url.lastIndexOf("/")+1);
		} else {
			handle.fn=fn_url;
			var url=API.files.filter(function(f){ return (f[0]==fn_url)});
			if (url.length) handle.url=url[0][1];
			else cb(null);
		}
		cb(handle);
}
var open=function(fn_url,cb) {
		if (!API.initialized) {init(1024*1024,function(){
			_open.apply(this,[fn_url,cb]);
		},this)} else _open.apply(this,[fn_url,cb]);
}
var load=function(filename,mode,cb) {
	open(filename,mode,cb,true);
}
function errorHandler(e) {
	console.error('Error: ' +e.name+ " "+e.message);
}
var readdir=function(cb,context) {
	 var dirReader = API.fs.root.createReader();
	 var out=[],that=this;
		dirReader.readEntries(function(entries) {
			if (entries.length) {
				for (var i = 0, entry; entry = entries[i]; ++i) {
					if (entry.isFile) {
						out.push([entry.name,entry.toURL ? entry.toURL() : entry.toURI()]);
					}
				}
			}
			API.files=out;
			if (cb) cb.apply(context,[out]);
		}, function(){
			if (cb) cb.apply(context,[null]);
		});
}
var initfs=function(grantedBytes,cb,context) {
	webkitRequestFileSystem(PERSISTENT, grantedBytes,  function(fs) {
		API.fs=fs;
		API.quota=grantedBytes;
		readdir(function(){
			API.initialized=true;
			cb.apply(context,[grantedBytes,fs]);
		},context);
	}, errorHandler);
}
var init=function(quota,cb,context) {
	navigator.webkitPersistentStorage.requestQuota(quota, 
			function(grantedBytes) {
				initfs(grantedBytes,cb,context);
		}, errorHandler 
	);
}
var API={
	read:read
	,readdir:readdir
	,open:open
	,close:close
	,fstatSync:fstatSync
	,fstat:fstat
}
module.exports=API;
},{}],"d:\\ksana2015\\node_modules\\ksana-jsonrom\\index.js":[function(require,module,exports){
module.exports={
	open:require("./kdb")
}

},{"./kdb":"d:\\ksana2015\\node_modules\\ksana-jsonrom\\kdb.js"}],"d:\\ksana2015\\node_modules\\ksana-jsonrom\\kdb.js":[function(require,module,exports){
/*
	KDB version 3.0 GPL
	yapcheahshen@gmail.com
	2013/12/28
	asyncronize version of yadb

  remove dependency of Q, thanks to
  http://stackoverflow.com/questions/4234619/how-to-avoid-long-nesting-of-asynchronous-functions-in-node-js

  2015/1/2
  moved to ksanaforge/ksana-jsonrom
  add err in callback for node.js compliant
*/
var Kfs=null;

if (typeof ksanagap=="undefined") {
	Kfs=require('./kdbfs');			
} else {
	if (ksanagap.platform=="ios") {
		Kfs=require("./kdbfs_ios");
	} else if (ksanagap.platform=="node-webkit") {
		Kfs=require("./kdbfs");
	} else if (ksanagap.platform=="chrome") {
		Kfs=require("./kdbfs");
	} else {
		Kfs=require("./kdbfs_android");
	}
		
}


var DT={
	uint8:'1', //unsigned 1 byte integer
	int32:'4', // signed 4 bytes integer
	utf8:'8',  
	ucs2:'2',
	bool:'^', 
	blob:'&',
	utf8arr:'*', //shift of 8
	ucs2arr:'@', //shift of 2
	uint8arr:'!', //shift of 1
	int32arr:'$', //shift of 4
	vint:'`',
	pint:'~',	

	array:'\u001b',
	object:'\u001a' 
	//ydb start with object signature,
	//type a ydb in command prompt shows nothing
}
var verbose=0, readLog=function(){};
var _readLog=function(readtype,bytes) {
	console.log(readtype,bytes,"bytes");
}
if (verbose) readLog=_readLog;
var strsep="\uffff";
var Create=function(path,opts,cb) {
	/* loadxxx functions move file pointer */
	// load variable length int
	if (typeof opts=="function") {
		cb=opts;
		opts={};
	}

	
	var loadVInt =function(opts,blocksize,count,cb) {
		//if (count==0) return [];
		var that=this;

		this.fs.readBuf_packedint(opts.cur,blocksize,count,true,function(o){
			//console.log("vint");
			opts.cur+=o.adv;
			cb.apply(that,[o.data]);
		});
	}
	var loadVInt1=function(opts,cb) {
		var that=this;
		loadVInt.apply(this,[opts,6,1,function(data){
			//console.log("vint1");
			cb.apply(that,[data[0]]);
		}])
	}
	//for postings
	var loadPInt =function(opts,blocksize,count,cb) {
		var that=this;
		this.fs.readBuf_packedint(opts.cur,blocksize,count,false,function(o){
			//console.log("pint");
			opts.cur+=o.adv;
			cb.apply(that,[o.data]);
		});
	}
	// item can be any type (variable length)
	// maximum size of array is 1TB 2^40
	// structure:
	// signature,5 bytes offset, payload, itemlengths
	var getArrayLength=function(opts,cb) {
		var that=this;
		var dataoffset=0;

		this.fs.readUI8(opts.cur,function(len){
			var lengthoffset=len*4294967296;
			opts.cur++;
			that.fs.readUI32(opts.cur,function(len){
				opts.cur+=4;
				dataoffset=opts.cur; //keep this
				lengthoffset+=len;
				opts.cur+=lengthoffset;

				loadVInt1.apply(that,[opts,function(count){
					loadVInt.apply(that,[opts,count*6,count,function(sz){						
						cb({count:count,sz:sz,offset:dataoffset});
					}]);
				}]);
				
			});
		});
	}

	var loadArray = function(opts,blocksize,cb) {
		var that=this;
		getArrayLength.apply(this,[opts,function(L){
				var o=[];
				var endcur=opts.cur;
				opts.cur=L.offset;

				if (opts.lazy) { 
						var offset=L.offset;
						for (var i=0;i<L.sz.length;i++) {
							var sz=L.sz[i];
							o[o.length]=strsep+offset.toString(16)
								   +strsep+sz.toString(16);
							offset+=sz;
						};
				} else {
					var taskqueue=[];
					for (var i=0;i<L.count;i++) {
						taskqueue.push(
							(function(sz){
								return (
									function(data){
										if (typeof data=='object' && data.__empty) {
											 //not pushing the first call
										}	else o.push(data);
										opts.blocksize=sz;
										load.apply(that,[opts, taskqueue.shift()]);
									}
								);
							})(L.sz[i])
						);
					}
					//last call to child load
					taskqueue.push(function(data){
						o.push(data);
						opts.cur=endcur;
						cb.apply(that,[o]);
					});
				}

				if (opts.lazy) cb.apply(that,[o]);
				else {
					taskqueue.shift()({__empty:true});
				}
			}
		])
	}		
	// item can be any type (variable length)
	// support lazy load
	// structure:
	// signature,5 bytes offset, payload, itemlengths, 
	//                    stringarray_signature, keys
	var loadObject = function(opts,blocksize,cb) {
		var that=this;
		var start=opts.cur;
		getArrayLength.apply(this,[opts,function(L) {
			opts.blocksize=blocksize-opts.cur+start;
			load.apply(that,[opts,function(keys){ //load the keys
				if (opts.keys) { //caller ask for keys
					keys.map(function(k) { opts.keys.push(k)});
				}

				var o={};
				var endcur=opts.cur;
				opts.cur=L.offset;
				if (opts.lazy) { 
					var offset=L.offset;
					for (var i=0;i<L.sz.length;i++) {
						//prefix with a \0, impossible for normal string
						o[keys[i]]=strsep+offset.toString(16)
							   +strsep+L.sz[i].toString(16);
						offset+=L.sz[i];
					}
				} else {
					var taskqueue=[];
					for (var i=0;i<L.count;i++) {
						taskqueue.push(
							(function(sz,key){
								return (
									function(data){
										if (typeof data=='object' && data.__empty) {
											//not saving the first call;
										} else {
											o[key]=data; 
										}
										opts.blocksize=sz;
										if (verbose) readLog("key",key);
										load.apply(that,[opts, taskqueue.shift()]);
									}
								);
							})(L.sz[i],keys[i-1])

						);
					}
					//last call to child load
					taskqueue.push(function(data){
						o[keys[keys.length-1]]=data;
						opts.cur=endcur;
						cb.apply(that,[o]);
					});
				}
				if (opts.lazy) cb.apply(that,[o]);
				else {
					taskqueue.shift()({__empty:true});
				}
			}]);
		}]);
	}

	//item is same known type
	var loadStringArray=function(opts,blocksize,encoding,cb) {
		var that=this;
		this.fs.readStringArray(opts.cur,blocksize,encoding,function(o){
			opts.cur+=blocksize;
			cb.apply(that,[o]);
		});
	}
	var loadIntegerArray=function(opts,blocksize,unitsize,cb) {
		var that=this;
		loadVInt1.apply(this,[opts,function(count){
			var o=that.fs.readFixedArray(opts.cur,count,unitsize,function(o){
				opts.cur+=count*unitsize;
				cb.apply(that,[o]);
			});
		}]);
	}
	var loadBlob=function(blocksize,cb) {
		var o=this.fs.readBuf(this.cur,blocksize);
		this.cur+=blocksize;
		return o;
	}	
	var loadbysignature=function(opts,signature,cb) {
		  var blocksize=opts.blocksize||this.fs.size; 
			opts.cur+=this.fs.signature_size;
			var datasize=blocksize-this.fs.signature_size;
			//basic types
			if (signature===DT.int32) {
				opts.cur+=4;
				this.fs.readI32(opts.cur-4,cb);
			} else if (signature===DT.uint8) {
				opts.cur++;
				this.fs.readUI8(opts.cur-1,cb);
			} else if (signature===DT.utf8) {
				var c=opts.cur;opts.cur+=datasize;
				this.fs.readString(c,datasize,'utf8',cb);
			} else if (signature===DT.ucs2) {
				var c=opts.cur;opts.cur+=datasize;
				this.fs.readString(c,datasize,'ucs2',cb);	
			} else if (signature===DT.bool) {
				opts.cur++;
				this.fs.readUI8(opts.cur-1,function(data){cb(!!data)});
			} else if (signature===DT.blob) {
				loadBlob(datasize,cb);
			}
			//variable length integers
			else if (signature===DT.vint) {
				loadVInt.apply(this,[opts,datasize,datasize,cb]);
			}
			else if (signature===DT.pint) {
				loadPInt.apply(this,[opts,datasize,datasize,cb]);
			}
			//simple array
			else if (signature===DT.utf8arr) {
				loadStringArray.apply(this,[opts,datasize,'utf8',cb]);
			}
			else if (signature===DT.ucs2arr) {
				loadStringArray.apply(this,[opts,datasize,'ucs2',cb]);
			}
			else if (signature===DT.uint8arr) {
				loadIntegerArray.apply(this,[opts,datasize,1,cb]);
			}
			else if (signature===DT.int32arr) {
				loadIntegerArray.apply(this,[opts,datasize,4,cb]);
			}
			//nested structure
			else if (signature===DT.array) {
				loadArray.apply(this,[opts,datasize,cb]);
			}
			else if (signature===DT.object) {
				loadObject.apply(this,[opts,datasize,cb]);
			}
			else {
				console.error('unsupported type',signature,opts)
				cb.apply(this,[null]);//make sure it return
				//throw 'unsupported type '+signature;
			}
	}

	var load=function(opts,cb) {
		opts=opts||{}; // this will served as context for entire load procedure
		opts.cur=opts.cur||0;
		var that=this;
		this.fs.readSignature(opts.cur, function(signature){
			loadbysignature.apply(that,[opts,signature,cb])
		});
		return this;
	}
	var CACHE=null;
	var KEY={};
	var ADDRESS={};
	var reset=function(cb) {
		if (!CACHE) {
			load.apply(this,[{cur:0,lazy:true},function(data){
				CACHE=data;
				cb.call(this);
			}]);	
		} else {
			cb.call(this);
		}
	}

	var exists=function(path,cb) {
		if (path.length==0) return true;
		var key=path.pop();
		var that=this;
		get.apply(this,[path,false,function(data){
			if (!path.join(strsep)) return (!!KEY[key]);
			var keys=KEY[path.join(strsep)];
			path.push(key);//put it back
			if (keys) cb.apply(that,[keys.indexOf(key)>-1]);
			else cb.apply(that,[false]);
		}]);
	}

	var getSync=function(path) {
		if (!CACHE) return undefined;	
		var o=CACHE;
		for (var i=0;i<path.length;i++) {
			var r=o[path[i]];
			if (typeof r=="undefined") return null;
			o=r;
		}
		return o;
	}
	var get=function(path,opts,cb,context) {
		if (typeof path=='undefined') path=[];
		if (typeof path=="string") path=[path];
		//opts.recursive=!!opts.recursive;
		if (typeof opts=="function") {
			context=cb;
			cb=opts;
			opts={};
		}
		var context=context||this;
		var that=this;
		if (typeof cb!='function') return getSync(path);

		reset.apply(this,[function(){
			var o=CACHE;
			if (path.length==0) {
				if (opts.address) {
					cb.apply(context,[[0,that.fs.size]]);
				} else {
					cb.apply(context,[Object.keys(CACHE)]);
				}
				return;
			} 
			
			var pathnow="",taskqueue=[],newopts={},r=null;
			var lastkey="";

			for (var i=0;i<path.length;i++) {
				var task=(function(key,k){

					return (function(data){
						if (!(typeof data=='object' && data.__empty)) {
							if (typeof o[lastkey]=='string' && o[lastkey][0]==strsep) o[lastkey]={};
							o[lastkey]=data; 
							o=o[lastkey];
							r=data[key];
							KEY[pathnow]=opts.keys;								
						} else {
							data=o[key];
							r=data;
						}

						if (typeof r==="undefined") {
							taskqueue=null;
							cb.apply(context,[r]); //return empty value
						} else {							
							if (parseInt(k)) pathnow+=strsep;
							pathnow+=key;
							if (typeof r=='string' && r[0]==strsep) { //offset of data to be loaded
								var p=r.substring(1).split(strsep).map(function(item){return parseInt(item,16)});
								var cur=p[0],sz=p[1];
								newopts.lazy=!opts.recursive || (k<path.length-1) ;
								newopts.blocksize=sz;newopts.cur=cur,newopts.keys=[];
								lastkey=key; //load is sync in android
								if (opts.address && taskqueue.length==1) {
									ADDRESS[pathnow]=[cur,sz];
									taskqueue.shift()(null,ADDRESS[pathnow]);
								} else {
									load.apply(that,[newopts, taskqueue.shift()]);
								}
							} else {
								if (opts.address && taskqueue.length==1) {
									taskqueue.shift()(null,ADDRESS[pathnow]);
								} else {
									taskqueue.shift().apply(that,[r]);
								}
							}
						}
					})
				})
				(path[i],i);
				
				taskqueue.push(task);
			}

			if (taskqueue.length==0) {
				cb.apply(context,[o]);
			} else {
				//last call to child load
				taskqueue.push(function(data,cursz){
					if (opts.address) {
						cb.apply(context,[cursz]);
					} else{
						var key=path[path.length-1];
						o[key]=data; KEY[pathnow]=opts.keys;
						cb.apply(context,[data]);
					}
				});
				taskqueue.shift()({__empty:true});			
			}

		}]); //reset
	}
	// get all keys in given path
	var getkeys=function(path,cb) {
		if (!path) path=[]
		var that=this;

		get.apply(this,[path,false,function(){
			if (path && path.length) {
				cb.apply(that,[KEY[path.join(strsep)]]);
			} else {
				cb.apply(that,[Object.keys(CACHE)]); 
				//top level, normally it is very small
			}
		}]);
	}

	var setupapi=function() {
		this.load=load;
//		this.cur=0;
		this.cache=function() {return CACHE};
		this.key=function() {return KEY};
		this.free=function() {
			CACHE=null;
			KEY=null;
			this.fs.free();
		}
		this.setCache=function(c) {CACHE=c};
		this.keys=getkeys;
		this.get=get;   // get a field, load if needed
		this.exists=exists;
		this.DT=DT;
		
		//install the sync version for node
		//if (typeof process!="undefined") require("./kdb_sync")(this);
		//if (cb) setTimeout(cb.bind(this),0);
		var that=this;
		var err=0;
		if (cb) {
			setTimeout(function(){
				cb(err,that);	
			},0);
		}
	}
	var that=this;
	var kfs=new Kfs(path,opts,function(err){
		if (err) {
			setTimeout(function(){
				cb(err,0);
			},0);
			return null;
		} else {
			that.size=this.size;
			setupapi.call(that);			
		}
	});
	this.fs=kfs;
	return this;
}

Create.datatypes=DT;

if (module) module.exports=Create;
//return Create;

},{"./kdbfs":"d:\\ksana2015\\node_modules\\ksana-jsonrom\\kdbfs.js","./kdbfs_android":"d:\\ksana2015\\node_modules\\ksana-jsonrom\\kdbfs_android.js","./kdbfs_ios":"d:\\ksana2015\\node_modules\\ksana-jsonrom\\kdbfs_ios.js"}],"d:\\ksana2015\\node_modules\\ksana-jsonrom\\kdbfs.js":[function(require,module,exports){
/* node.js and html5 file system abstraction layer*/
try {
	var fs=require("fs");
	var Buffer=require("buffer").Buffer;
} catch (e) {
	var fs=require('./html5read');
	var Buffer=function(){ return ""};
	var html5fs=true; 	
}
var signature_size=1;
var verbose=0, readLog=function(){};
var _readLog=function(readtype,bytes) {
	console.log(readtype,bytes,"bytes");
}
if (verbose) readLog=_readLog;

var unpack_int = function (ar, count , reset) {
   count=count||ar.length;
  var r = []
  //var r=new Uint32Array(count);
  var i = 0, v = 0,n=0;
  do {
	var shift = 0;
	do {
	  v += ((ar[i] & 0x7F) << shift);
	  shift += 7;	  
	} while (ar[++i] & 0x80);
	r.push(v);
	//r[n++]=v;
	if (reset) v=0;
	count--;
  } while (i<ar.length && count);

  //var rr=r.subarray(0,n);
  return {data:r, adv:i };
}
var Open=function(path,opts,cb) {
	opts=opts||{};

	var readSignature=function(pos,cb) {
		var buf=new Buffer(signature_size);
		var that=this;
		fs.read(this.handle,buf,0,signature_size,pos,function(err,len,buffer){
			if (html5fs) var signature=String.fromCharCode((new Uint8Array(buffer))[0])
			else var signature=buffer.toString('utf8',0,signature_size);
			cb.apply(that,[signature]);
		});
	}

	//this is quite slow
	//wait for StringView +ArrayBuffer to solve the problem
	//https://groups.google.com/a/chromium.org/forum/#!topic/blink-dev/ylgiNY_ZSV0
	//if the string is always ucs2
	//can use Uint16 to read it.
	//http://updates.html5rocks.com/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
	var decodeutf8 = function (utftext) {
		var string = "";
		var i = 0;
		var c=0,c1 = 0, c2 = 0 , c3=0;
		for (var i=0;i<utftext.length;i++) {
			if (utftext.charCodeAt(i)>127) break;
		}
		if (i>=utftext.length) return utftext;

		while ( i < utftext.length ) {
			c = utftext.charCodeAt(i);
			if (c < 128) {
				string += utftext[i];
				i++;
			} else if((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i+1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			} else {
				c2 = utftext.charCodeAt(i+1);
				c3 = utftext.charCodeAt(i+2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}
		}
		return string;
	}

	var readString= function(pos,blocksize,encoding,cb) {
		encoding=encoding||'utf8';
		var buffer=new Buffer(blocksize);
		var that=this;
		fs.read(this.handle,buffer,0,blocksize,pos,function(err,len,buffer){
			readLog("string",len);
			if (html5fs) {
				if (encoding=='utf8') {
					var str=decodeutf8(String.fromCharCode.apply(null, new Uint8Array(buffer)))
				} else { //ucs2 is 3 times faster
					var str=String.fromCharCode.apply(null, new Uint16Array(buffer))	
				}
				
				cb.apply(that,[str]);
			} 
			else cb.apply(that,[buffer.toString(encoding)]);	
		});
	}

	//work around for chrome fromCharCode cannot accept huge array
	//https://code.google.com/p/chromium/issues/detail?id=56588
	var buf2stringarr=function(buf,enc) {
		if (enc=="utf8") 	var arr=new Uint8Array(buf);
		else var arr=new Uint16Array(buf);
		var i=0,codes=[],out=[],s="";
		while (i<arr.length) {
			if (arr[i]) {
				codes[codes.length]=arr[i];
			} else {
				s=String.fromCharCode.apply(null,codes);
				if (enc=="utf8") out[out.length]=decodeutf8(s);
				else out[out.length]=s;
				codes=[];				
			}
			i++;
		}
		
		s=String.fromCharCode.apply(null,codes);
		if (enc=="utf8") out[out.length]=decodeutf8(s);
		else out[out.length]=s;

		return out;
	}
	var readStringArray = function(pos,blocksize,encoding,cb) {
		var that=this,out=null;
		if (blocksize==0) return [];
		encoding=encoding||'utf8';
		var buffer=new Buffer(blocksize);
		fs.read(this.handle,buffer,0,blocksize,pos,function(err,len,buffer){
			if (html5fs) {
				readLog("stringArray",buffer.byteLength);

				if (encoding=='utf8') {
					out=buf2stringarr(buffer,"utf8");
				} else { //ucs2 is 3 times faster
					out=buf2stringarr(buffer,"ucs2");
				}
			} else {
				readLog("stringArray",buffer.length);
				out=buffer.toString(encoding).split('\0');
			} 	
			cb.apply(that,[out]);
		});
	}
	var readUI32=function(pos,cb) {
		var buffer=new Buffer(4);
		var that=this;
		fs.read(this.handle,buffer,0,4,pos,function(err,len,buffer){
			readLog("ui32",len);
			if (html5fs){
				//v=(new Uint32Array(buffer))[0];
				var v=new DataView(buffer).getUint32(0, false)
				cb(v);
			}
			else cb.apply(that,[buffer.readInt32BE(0)]);	
		});		
	}

	var readI32=function(pos,cb) {
		var buffer=new Buffer(4);
		var that=this;
		fs.read(this.handle,buffer,0,4,pos,function(err,len,buffer){
			readLog("i32",len);
			if (html5fs){
				var v=new DataView(buffer).getInt32(0, false)
				cb(v);
			}
			else  	cb.apply(that,[buffer.readInt32BE(0)]);	
		});
	}
	var readUI8=function(pos,cb) {
		var buffer=new Buffer(1);
		var that=this;

		fs.read(this.handle,buffer,0,1,pos,function(err,len,buffer){
			readLog("ui8",len);
			if (html5fs)cb( (new Uint8Array(buffer))[0]) ;
			else  			cb.apply(that,[buffer.readUInt8(0)]);	
			
		});
	}
	var readBuf=function(pos,blocksize,cb) {
		var that=this;
		var buf=new Buffer(blocksize);
		fs.read(this.handle,buf,0,blocksize,pos,function(err,len,buffer){
			readLog("buf",len);
			var buff=new Uint8Array(buffer)
			cb.apply(that,[buff]);
		});
	}
	var readBuf_packedint=function(pos,blocksize,count,reset,cb) {
		var that=this;
		readBuf.apply(this,[pos,blocksize,function(buffer){
			cb.apply(that,[unpack_int(buffer,count,reset)]);	
		}]);
		
	}
	var readFixedArray_html5fs=function(pos,count,unitsize,cb) {
		var func=null;
		if (unitsize===1) {
			func='getUint8';//Uint8Array;
		} else if (unitsize===2) {
			func='getUint16';//Uint16Array;
		} else if (unitsize===4) {
			func='getUint32';//Uint32Array;
		} else throw 'unsupported integer size';

		fs.read(this.handle,null,0,unitsize*count,pos,function(err,len,buffer){
			readLog("fix array",len);
			var out=[];
			if (unitsize==1) {
				out=new Uint8Array(buffer);
			} else {
				for (var i = 0; i < len / unitsize; i++) { //endian problem
				//	out.push( func(buffer,i*unitsize));
					out.push( v=new DataView(buffer)[func](i,false) );
				}
			}

			cb.apply(that,[out]);
		});
	}
	// signature, itemcount, payload
	var readFixedArray = function(pos ,count, unitsize,cb) {
		var func=null;
		var that=this;
		
		if (unitsize* count>this.size && this.size)  {
			console.log("array size exceed file size",this.size)
			return;
		}
		
		if (html5fs) return readFixedArray_html5fs.apply(this,[pos,count,unitsize,cb]);

		var items=new Buffer( unitsize* count);
		if (unitsize===1) {
			func=items.readUInt8;
		} else if (unitsize===2) {
			func=items.readUInt16BE;
		} else if (unitsize===4) {
			func=items.readUInt32BE;
		} else throw 'unsupported integer size';
		//console.log('itemcount',itemcount,'buffer',buffer);

		fs.read(this.handle,items,0,unitsize*count,pos,function(err,len,buffer){
			readLog("fix array",len);
			var out=[];
			for (var i = 0; i < items.length / unitsize; i++) {
				out.push( func.apply(items,[i*unitsize]));
			}
			cb.apply(that,[out]);
		});
	}

	var free=function() {
		//console.log('closing ',handle);
		fs.closeSync(this.handle);
	}
	var setupapi=function() {
		var that=this;
		this.readSignature=readSignature;
		this.readI32=readI32;
		this.readUI32=readUI32;
		this.readUI8=readUI8;
		this.readBuf=readBuf;
		this.readBuf_packedint=readBuf_packedint;
		this.readFixedArray=readFixedArray;
		this.readString=readString;
		this.readStringArray=readStringArray;
		this.signature_size=signature_size;
		this.free=free;
		if (html5fs) {
			var fn=path;
			if (path.indexOf("filesystem:")==0) fn=path.substr(path.lastIndexOf("/"));
			fs.fs.root.getFile(fn,{},function(entry){
			  entry.getMetadata(function(metadata) { 
				that.size=metadata.size;
				if (cb) setTimeout(cb.bind(that),0);
				});
			});
		} else {
			var stat=fs.fstatSync(this.handle);
			this.stat=stat;
			this.size=stat.size;		
			if (cb)	setTimeout(cb.bind(this,0),0);	
		}
	}

	var that=this;
	if (html5fs) {
		fs.open(path,function(h){
			if (!h) {
				if (cb)	setTimeout(cb.bind(null,"file not found:"+path),0);	
			} else {
				that.handle=h;
				that.html5fs=true;
				setupapi.call(that);
				that.opened=true;				
			}
		})
	} else {
		if (fs.existsSync(path)){
			this.handle=fs.openSync(path,'r');//,function(err,handle){
			this.opened=true;
			setupapi.call(this);
		} else {
			if (cb)	setTimeout(cb.bind(null,"file not found:"+path),0);	
			return null;
		}
	}
	return this;
}
module.exports=Open;
},{"./html5read":"d:\\ksana2015\\node_modules\\ksana-jsonrom\\html5read.js","buffer":false,"fs":false}],"d:\\ksana2015\\node_modules\\ksana-jsonrom\\kdbfs_android.js":[function(require,module,exports){
/*
  JAVA can only return Number and String
	array and buffer return in string format
	need JSON.parse
*/
var verbose=0;

var readSignature=function(pos,cb) {
	if (verbose) console.debug("read signature");
	var signature=kfs.readUTF8String(this.handle,pos,1);
	if (verbose) console.debug(signature,signature.charCodeAt(0));
	cb.apply(this,[signature]);
}
var readI32=function(pos,cb) {
	if (verbose) console.debug("read i32 at "+pos);
	var i32=kfs.readInt32(this.handle,pos);
	if (verbose) console.debug(i32);
	cb.apply(this,[i32]);	
}
var readUI32=function(pos,cb) {
	if (verbose) console.debug("read ui32 at "+pos);
	var ui32=kfs.readUInt32(this.handle,pos);
	if (verbose) console.debug(ui32);
	cb.apply(this,[ui32]);
}
var readUI8=function(pos,cb) {
	if (verbose) console.debug("read ui8 at "+pos); 
	var ui8=kfs.readUInt8(this.handle,pos);
	if (verbose) console.debug(ui8);
	cb.apply(this,[ui8]);
}
var readBuf=function(pos,blocksize,cb) {
	if (verbose) console.debug("read buffer at "+pos+ " blocksize "+blocksize);
	var buf=kfs.readBuf(this.handle,pos,blocksize);
	var buff=JSON.parse(buf);
	if (verbose) console.debug("buffer length"+buff.length);
	cb.apply(this,[buff]);	
}
var readBuf_packedint=function(pos,blocksize,count,reset,cb) {
	if (verbose) console.debug("read packed int at "+pos+" blocksize "+blocksize+" count "+count);
	var buf=kfs.readBuf_packedint(this.handle,pos,blocksize,count,reset);
	var adv=parseInt(buf);
	var buff=JSON.parse(buf.substr(buf.indexOf("[")));
	if (verbose) console.debug("packedInt length "+buff.length+" first item="+buff[0]);
	cb.apply(this,[{data:buff,adv:adv}]);	
}


var readString= function(pos,blocksize,encoding,cb) {
	if (verbose) console.debug("readstring at "+pos+" blocksize " +blocksize+" enc:"+encoding);
	if (encoding=="ucs2") {
		var str=kfs.readULE16String(this.handle,pos,blocksize);
	} else {
		var str=kfs.readUTF8String(this.handle,pos,blocksize);	
	}	 
	if (verbose) console.debug(str);
	cb.apply(this,[str]);	
}

var readFixedArray = function(pos ,count, unitsize,cb) {
	if (verbose) console.debug("read fixed array at "+pos+" count "+count+" unitsize "+unitsize); 
	var buf=kfs.readFixedArray(this.handle,pos,count,unitsize);
	var buff=JSON.parse(buf);
	if (verbose) console.debug("array length"+buff.length);
	cb.apply(this,[buff]);	
}
var readStringArray = function(pos,blocksize,encoding,cb) {
	if (verbose) console.log("read String array at "+pos+" blocksize "+blocksize +" enc "+encoding); 
	encoding = encoding||"utf8";
	var buf=kfs.readStringArray(this.handle,pos,blocksize,encoding);
	//var buff=JSON.parse(buf);
	if (verbose) console.debug("read string array");
	var buff=buf.split("\uffff"); //cannot return string with 0
	if (verbose) console.debug("array length"+buff.length);
	cb.apply(this,[buff]);	
}
var mergePostings=function(positions,cb) {
	var buf=kfs.mergePostings(this.handle,JSON.stringify(positions));
	if (!buf || buf.length==0) return [];
	else return JSON.parse(buf);
}

var free=function() {
	//console.log('closing ',handle);
	kfs.close(this.handle);
}
var Open=function(path,opts,cb) {
	opts=opts||{};
	var signature_size=1;
	var setupapi=function() { 
		this.readSignature=readSignature;
		this.readI32=readI32;
		this.readUI32=readUI32;
		this.readUI8=readUI8;
		this.readBuf=readBuf;
		this.readBuf_packedint=readBuf_packedint;
		this.readFixedArray=readFixedArray;
		this.readString=readString;
		this.readStringArray=readStringArray;
		this.signature_size=signature_size;
		this.mergePostings=mergePostings;
		this.free=free;
		this.size=kfs.getFileSize(this.handle);
		if (verbose) console.log("filesize  "+this.size);
		if (cb)	cb.call(this);
	}

	this.handle=kfs.open(path);
	this.opened=true;
	setupapi.call(this);
	return this;
}

module.exports=Open;
},{}],"d:\\ksana2015\\node_modules\\ksana-jsonrom\\kdbfs_ios.js":[function(require,module,exports){
/*
  JSContext can return all Javascript types.
*/
var verbose=1;

var readSignature=function(pos,cb) {
	if (verbose)  ksanagap.log("read signature at "+pos);
	var signature=kfs.readUTF8String(this.handle,pos,1);
	if (verbose)  ksanagap.log(signature+" "+signature.charCodeAt(0));
	cb.apply(this,[signature]);
}
var readI32=function(pos,cb) {
	if (verbose)  ksanagap.log("read i32 at "+pos);
	var i32=kfs.readInt32(this.handle,pos);
	if (verbose)  ksanagap.log(i32);
	cb.apply(this,[i32]);	
}
var readUI32=function(pos,cb) {
	if (verbose)  ksanagap.log("read ui32 at "+pos);
	var ui32=kfs.readUInt32(this.handle,pos);
	if (verbose)  ksanagap.log(ui32);
	cb.apply(this,[ui32]);
}
var readUI8=function(pos,cb) {
	if (verbose)  ksanagap.log("read ui8 at "+pos); 
	var ui8=kfs.readUInt8(this.handle,pos);
	if (verbose)  ksanagap.log(ui8);
	cb.apply(this,[ui8]);
}
var readBuf=function(pos,blocksize,cb) {
	if (verbose)  ksanagap.log("read buffer at "+pos);
	var buf=kfs.readBuf(this.handle,pos,blocksize);
	if (verbose)  ksanagap.log("buffer length"+buf.length);
	cb.apply(this,[buf]);	
}
var readBuf_packedint=function(pos,blocksize,count,reset,cb) {
	if (verbose)  ksanagap.log("read packed int fast, blocksize "+blocksize+" at "+pos);var t=new Date();
	var buf=kfs.readBuf_packedint(this.handle,pos,blocksize,count,reset);
	if (verbose)  ksanagap.log("return from packedint, time" + (new Date()-t));
	if (typeof buf.data=="string") {
		buf.data=eval("["+buf.data.substr(0,buf.data.length-1)+"]");
	}
	if (verbose)  ksanagap.log("unpacked length"+buf.data.length+" time" + (new Date()-t) );
	cb.apply(this,[buf]);
}


var readString= function(pos,blocksize,encoding,cb) {

	if (verbose)  ksanagap.log("readstring at "+pos+" blocksize "+blocksize+" "+encoding);var t=new Date();
	if (encoding=="ucs2") {
		var str=kfs.readULE16String(this.handle,pos,blocksize);
	} else {
		var str=kfs.readUTF8String(this.handle,pos,blocksize);	
	}
	if (verbose)  ksanagap.log(str+" time"+(new Date()-t));
	cb.apply(this,[str]);	
}

var readFixedArray = function(pos ,count, unitsize,cb) {
	if (verbose)  ksanagap.log("read fixed array at "+pos); var t=new Date();
	var buf=kfs.readFixedArray(this.handle,pos,count,unitsize);
	if (verbose)  ksanagap.log("array length "+buf.length+" time"+(new Date()-t));
	cb.apply(this,[buf]);	
}
var readStringArray = function(pos,blocksize,encoding,cb) {
	//if (verbose)  ksanagap.log("read String array "+blocksize +" "+encoding); 
	encoding = encoding||"utf8";
	if (verbose)  ksanagap.log("read string array at "+pos);var t=new Date();
	var buf=kfs.readStringArray(this.handle,pos,blocksize,encoding);
	if (typeof buf=="string") buf=buf.split("\0");
	//var buff=JSON.parse(buf);
	//var buff=buf.split("\uffff"); //cannot return string with 0
	if (verbose)  ksanagap.log("string array length"+buf.length+" time"+(new Date()-t));
	cb.apply(this,[buf]);
}

var mergePostings=function(positions) {
	var buf=kfs.mergePostings(this.handle,positions);
	if (typeof buf=="string") {
		buf=eval("["+buf.substr(0,buf.length-1)+"]");
	}
	return buf;
}
var free=function() {
	////if (verbose)  ksanagap.log('closing ',handle);
	kfs.close(this.handle);
}
var Open=function(path,opts,cb) {
	opts=opts||{};
	var signature_size=1;
	var setupapi=function() { 
		this.readSignature=readSignature;
		this.readI32=readI32;
		this.readUI32=readUI32;
		this.readUI8=readUI8;
		this.readBuf=readBuf;
		this.readBuf_packedint=readBuf_packedint;
		this.readFixedArray=readFixedArray;
		this.readString=readString;
		this.readStringArray=readStringArray;
		this.signature_size=signature_size;
		this.mergePostings=mergePostings;
		this.free=free;
		this.size=kfs.getFileSize(this.handle);
		if (verbose)  ksanagap.log("filesize  "+this.size);
		if (cb)	cb.call(this);
	}

	this.handle=kfs.open(path);
	this.opened=true;
	setupapi.call(this);
	return this;
}

module.exports=Open;
},{}],"d:\\ksana2015\\node_modules\\ksana-search\\boolsearch.js":[function(require,module,exports){
/*
  TODO
  and not

*/

// http://jsfiddle.net/neoswf/aXzWw/
var plist=require('./plist');
function intersect(I, J) {
  var i = j = 0;
  var result = [];

  while( i < I.length && j < J.length ){
     if      (I[i] < J[j]) i++; 
     else if (I[i] > J[j]) j++; 
     else {
       result[result.length]=l[i];
       i++;j++;
     }
  }
  return result;
}

/* return all items in I but not in J */
function subtract(I, J) {
  var i = j = 0;
  var result = [];

  while( i < I.length && j < J.length ){
    if (I[i]==J[j]) {
      i++;j++;
    } else if (I[i]<J[j]) {
      while (I[i]<J[j]) result[result.length]= I[i++];
    } else {
      while(J[j]<I[i]) j++;
    }
  }

  if (j==J.length) {
    while (i<I.length) result[result.length]=I[i++];
  }

  return result;
}

var union=function(a,b) {
	if (!a || !a.length) return b;
	if (!b || !b.length) return a;
    var result = [];
    var ai = 0;
    var bi = 0;
    while (true) {
        if ( ai < a.length && bi < b.length) {
            if (a[ai] < b[bi]) {
                result[result.length]=a[ai];
                ai++;
            } else if (a[ai] > b[bi]) {
                result[result.length]=b[bi];
                bi++;
            } else {
                result[result.length]=a[ai];
                result[result.length]=b[bi];
                ai++;
                bi++;
            }
        } else if (ai < a.length) {
            result.push.apply(result, a.slice(ai, a.length));
            break;
        } else if (bi < b.length) {
            result.push.apply(result, b.slice(bi, b.length));
            break;
        } else {
            break;
        }
    }
    return result;
}
var OPERATION={'include':intersect, 'union':union, 'exclude':subtract};

var boolSearch=function(opts) {
  opts=opts||{};
  ops=opts.op||this.opts.op;
  this.docs=[];
	if (!this.phrases.length) return;
	var r=this.phrases[0].docs;
  /* ignore operator of first phrase */
	for (var i=1;i<this.phrases.length;i++) {
		var op= ops[i] || 'union';
		r=OPERATION[op](r,this.phrases[i].docs);
	}
	this.docs=plist.unique(r);
	return this;
}
module.exports={search:boolSearch}
},{"./plist":"d:\\ksana2015\\node_modules\\ksana-search\\plist.js"}],"d:\\ksana2015\\node_modules\\ksana-search\\bsearch.js":[function(require,module,exports){
var indexOfSorted = function (array, obj, near) { 
  var low = 0,
  high = array.length;
  while (low < high) {
    var mid = (low + high) >> 1;
    if (array[mid]==obj) return mid;
    array[mid] < obj ? low = mid + 1 : high = mid;
  }
  if (near) return low;
  else if (array[low]==obj) return low;else return -1;
};
var indexOfSorted_str = function (array, obj, near) { 
  var low = 0,
  high = array.length;
  while (low < high) {
    var mid = (low + high) >> 1;
    if (array[mid]==obj) return mid;
    (array[mid].localeCompare(obj)<0) ? low = mid + 1 : high = mid;
  }
  if (near) return low;
  else if (array[low]==obj) return low;else return -1;
};


var bsearch=function(array,value,near) {
	var func=indexOfSorted;
	if (typeof array[0]=="string") func=indexOfSorted_str;
	return func(array,value,near);
}
var bsearchNear=function(array,value) {
	return bsearch(array,value,true);
}

module.exports=bsearch;//{bsearchNear:bsearchNear,bsearch:bsearch};
},{}],"d:\\ksana2015\\node_modules\\ksana-search\\excerpt.js":[function(require,module,exports){
var plist=require("./plist");

var getPhraseWidths=function (Q,phraseid,vposs) {
	var res=[];
	for (var i in vposs) {
		res.push(getPhraseWidth(Q,phraseid,vposs[i]));
	}
	return res;
}
var getPhraseWidth=function (Q,phraseid,vpos) {
	var P=Q.phrases[phraseid];
	var width=0,varwidth=false;
	if (P.width) return P.width; // no wildcard
	if (P.termid.length<2) return P.termlength[0];
	var lasttermposting=Q.terms[P.termid[P.termid.length-1]].posting;

	for (var i in P.termid) {
		var T=Q.terms[P.termid[i]];
		if (T.op=='wildcard') {
			width+=T.width;
			if (T.wildcard=='*') varwidth=true;
		} else {
			width+=P.termlength[i];
		}
	}
	if (varwidth) { //width might be smaller due to * wildcard
		var at=plist.indexOfSorted(lasttermposting,vpos);
		var endpos=lasttermposting[at];
		if (endpos-vpos<width) width=endpos-vpos+1;
	}

	return width;
}
/* return [vpos, phraseid, phrasewidth, optional_tagname] by slot range*/
var hitInRange=function(Q,startvpos,endvpos) {
	var res=[];
	if (!Q || !Q.rawresult || !Q.rawresult.length) return res;
	for (var i=0;i<Q.phrases.length;i++) {
		var P=Q.phrases[i];
		if (!P.posting) continue;
		var s=plist.indexOfSorted(P.posting,startvpos);
		var e=plist.indexOfSorted(P.posting,endvpos);
		var r=P.posting.slice(s,e+1);
		var width=getPhraseWidths(Q,i,r);

		res=res.concat(r.map(function(vpos,idx){ return [vpos,width[idx],i] }));
	}
	// order by vpos, if vpos is the same, larger width come first.
	// so the output will be
	// <tag1><tag2>one</tag2>two</tag1>
	//TODO, might cause overlap if same vpos and same width
	//need to check tag name
	res.sort(function(a,b){return a[0]==b[0]? b[1]-a[1] :a[0]-b[0]});

	return res;
}

var tagsInRange=function(Q,renderTags,startvpos,endvpos) {
	var res=[];
	if (typeof renderTags=="string") renderTags=[renderTags];

	renderTags.map(function(tag){
		var starts=Q.engine.get(["fields",tag+"_start"]);
		var ends=Q.engine.get(["fields",tag+"_end"]);
		if (!starts) return;

		var s=plist.indexOfSorted(starts,startvpos);
		var e=s;
		while (e<starts.length && starts[e]<endvpos) e++;
		var opentags=starts.slice(s,e);

		s=plist.indexOfSorted(ends,startvpos);
		e=s;
		while (e<ends.length && ends[e]<endvpos) e++;
		var closetags=ends.slice(s,e);

		opentags.map(function(start,idx) {
			res.push([start,closetags[idx]-start,tag]);
		})
	});
	// order by vpos, if vpos is the same, larger width come first.
	res.sort(function(a,b){return a[0]==b[0]? b[1]-a[1] :a[0]-b[0]});

	return res;
}

/*
given a vpos range start, file, convert to filestart, fileend
   filestart : starting file
   start   : vpos start
   showfile: how many files to display
   showpage: how many pages to display

output:
   array of fileid with hits
*/
var getFileWithHits=function(engine,Q,range) {
	var fileOffsets=engine.get("fileoffsets");
	var out=[],filecount=100;
	var start=0 , end=Q.byFile.length;
	Q.excerptOverflow=false;
	if (range.start) {
		var first=range.start ;
		var last=range.end;
		if (!last) last=Number.MAX_SAFE_INTEGER;
		for (var i=0;i<fileOffsets.length;i++) {
			//if (fileOffsets[i]>first) break;
			if (fileOffsets[i]>last) {
				end=i;
				break;
			}
			if (fileOffsets[i]<first) start=i;
		}		
	} else {
		start=range.filestart || 0;
		if (range.maxfile) {
			filecount=range.maxfile;
		} else if (range.showseg) {
			throw "not implement yet"
		}
	}

	var fileWithHits=[],totalhit=0;
	range.maxhit=range.maxhit||1000;

	for (var i=start;i<end;i++) {
		if(Q.byFile[i].length>0) {
			totalhit+=Q.byFile[i].length;
			fileWithHits.push(i);
			range.nextFileStart=i;
			if (fileWithHits.length>=filecount) {
				Q.excerptOverflow=true;
				break;
			}
			if (totalhit>range.maxhit) {
				Q.excerptOverflow=true;
				break;
			}
		}
	}
	if (i>=end) { //no more file
		Q.excerptStop=true;
	}
	return fileWithHits;
}
var resultlist=function(engine,Q,opts,cb) {
	var output=[];
	if (!Q.rawresult || !Q.rawresult.length) {
		cb(output);
		return;
	}

	if (opts.range) {
		if (opts.range.maxhit && !opts.range.maxfile) {
			opts.range.maxfile=opts.range.maxhit;
			opts.range.maxseg=opts.range.maxhit;
		}
		if (!opts.range.maxseg) opts.range.maxseg=100;
		if (!opts.range.end) {
			opts.range.end=Number.MAX_SAFE_INTEGER;
		}
	}
	var fileWithHits=getFileWithHits(engine,Q,opts.range);
	if (!fileWithHits.length) {
		cb(output);
		return;
	}

	var output=[],files=[];//temporary holder for segnames
	for (var i=0;i<fileWithHits.length;i++) {
		var nfile=fileWithHits[i];
		var segoffsets=engine.getFileSegOffsets(nfile);
		var segnames=engine.getFileSegNames(nfile);
		files[nfile]={segoffsets:segoffsets};
		var segwithhit=plist.groupbyposting2(Q.byFile[ nfile ],  segoffsets);
		//if (segoffsets[0]==1)
		//segwithhit.shift(); //the first item is not used (0~Q.byFile[0] )

		for (var j=0; j<segwithhit.length;j++) {
			if (!segwithhit[j].length) continue;
			//var offsets=segwithhit[j].map(function(p){return p- fileOffsets[i]});
			if (segoffsets[j]>opts.range.end) break;
			output.push(  {file: nfile, seg:j,  segname:segnames[j]});
			if (output.length>opts.range.maxseg) break;
		}
	}

	var segpaths=output.map(function(p){
		return ["filecontents",p.file,p.seg];
	});
	//prepare the text
	engine.get(segpaths,function(segs){
		var seq=0;
		if (segs) for (var i=0;i<segs.length;i++) {
			var startvpos=files[output[i].file].segoffsets[output[i].seg-1] ||0;
			var endvpos=files[output[i].file].segoffsets[output[i].seg];
			var hl={};

			if (opts.range && opts.range.start  ) {
				if ( startvpos<opts.range.start) startvpos=opts.range.start;
			//	if (endvpos>opts.range.end) endvpos=opts.range.end;
			}
			
			if (opts.nohighlight) {
				hl.text=segs[i];
				hl.hits=hitInRange(Q,startvpos,endvpos);
			} else {
				var o={nocrlf:true,nospan:true,
					text:segs[i],startvpos:startvpos, endvpos: endvpos, 
					Q:Q,fulltext:opts.fulltext};
				hl=highlight(Q,o);
			}
			if (hl.text) {
				output[i].text=hl.text;
				output[i].hits=hl.hits;
				output[i].seq=seq;
				seq+=hl.hits.length;

				output[i].start=startvpos;				
			} else {
				output[i]=null; //remove item vpos less than opts.range.start
			}
		} 
		output=output.filter(function(o){return o!=null});
		cb(output);
	});
}
var injectTag=function(Q,opts){
	var hits=opts.hits;
	var tags=opts.tags;
	if (!tags) tags=[];
	var hitclass=opts.hitclass||'hl';
	var output='',O=[],j=0,k=0;
	var surround=opts.surround||5;

	var tokens=Q.tokenize(opts.text).tokens;
	var vpos=opts.vpos;
	var i=0,previnrange=!!opts.fulltext ,inrange=!!opts.fulltext;
	var hitstart=0,hitend=0,tagstart=0,tagend=0,tagclass="";
	while (i<tokens.length) {
		var skip=Q.isSkip(tokens[i]);
		var hashit=false;
		inrange=opts.fulltext || (j<hits.length && vpos+surround>=hits[j][0] ||
				(j>0 && j<=hits.length &&  hits[j-1][0]+surround*2>=vpos));	

		if (previnrange!=inrange) {
			output+=opts.abridge||"...";
		}
		previnrange=inrange;
		var token=tokens[i];
		if (opts.nocrlf && token=="\n") token="";

		if (inrange && i<tokens.length) {
			if (skip) {
				output+=token;
			} else {
				var classes="";	

				//check hit
				if (j<hits.length && vpos==hits[j][0]) {
					var nphrase=hits[j][2] % 10, width=hits[j][1];
					hitstart=hits[j][0];
					hitend=hitstart+width;
					j++;
				}

				//check tag
				if (k<tags.length && vpos==tags[k][0]) {
					var width=tags[k][1];
					tagstart=tags[k][0];
					tagend=tagstart+width;
					tagclass=tags[k][2];
					k++;
				}

				if (vpos>=hitstart && vpos<hitend) classes=hitclass+" "+hitclass+nphrase;
				if (vpos>=tagstart && vpos<tagend) classes+=" "+tagclass;

				if (classes || !opts.nospan) {
					output+='<span vpos="'+vpos+'"';
					if (classes) classes=' class="'+classes+'"';
					output+=classes+'>';
					output+=token+'</span>';
				} else {
					output+=token;
				}
			}
		}
		if (!skip) vpos++;
		i++; 
	}

	O.push(output);
	output="";

	return O.join("");
}
var highlight=function(Q,opts) {
	if (!opts.text) return {text:"",hits:[]};
	var opt={text:opts.text,
		hits:null,abridge:opts.abridge,vpos:opts.startvpos,
		fulltext:opts.fulltext,renderTags:opts.renderTags,nospan:opts.nospan,nocrlf:opts.nocrlf,
	};

	opt.hits=hitInRange(opts.Q,opts.startvpos,opts.endvpos);
	return {text:injectTag(Q,opt),hits:opt.hits};
}

var addspan=function(text,startvpos){
	engine=this;
	var output="";
	var tokens=engine.analyzer.tokenize(text).tokens;
	var isSkip=engine.analyzer.isSkip;
	var vpos=startvpos;
	for (var i=0;i<tokens.length;i++) {
		output+='<span vpos="'+(vpos)+'">'+tokens[i]+"</span>";
		if (!isSkip(tokens[i])) vpos++;
	}		
	return output;
}
var addtoken=function(text,startvpos) {
	engine=this;
	var output=[];
	var tokens=engine.analyzer.tokenize(text).tokens;
	var isSkip=engine.analyzer.isSkip;
	var vpos=startvpos;
	for (var i=0;i<tokens.length;i++) {
		output.push([tokens[i],vpos]);
		if (!isSkip(tokens[i])) vpos++;
	}		
	return output;
}
var getSeg=function(engine,fileid,segid,opts,cb,context) {
	if (typeof opts=="function") {
		context=cb;
		cb=opts;
		opts={};
	}

	var fileOffsets=engine.get("fileoffsets");
	var segpaths=["filecontents",fileid,segid];
	var segnames=engine.getFileSegNames(fileid);
	var vpos=engine.fileSegToVpos(fileid,segid);

	engine.get(segpaths,function(text){
		var out=text;
		if (opts.span) out=addspan.apply(engine,[text,vpos]);
		else if(opts.token) out=addtoken.apply(engine,[text,vpos]);
		cb.apply(context||engine.context,[{text:out,file:fileid,seg:segid,segname:segnames[segid]}]);
	});
}

var getSegSync=function(engine,fileid,segid) {
	var fileOffsets=engine.get("fileoffsets");
	var segpaths=["filecontents",fileid,segid];
	var segnames=engine.getFileSegNames(fileid);

	var text=engine.get(segpaths);
	return {text:text,file:fileid,seg:segid,segname:segnames[segid]};
}

var getRange=function(engine,start,end,cb) {
	var fileoffsets=engine.get("fileoffsets");
	//var pagepaths=["fileContents",];
	//find first page and last page
	//create get paths

}

var getFile=function(engine,fileid,cb) {
	var filename=engine.get("filenames")[fileid];
	var segnames=engine.getFileSegNames(fileid);
	var filestart=engine.get("fileoffsets")[fileid];
	var offsets=engine.getFileSegOffsets(fileid);
	var pc=0;
	engine.get(["fileContents",fileid],true,function(data){
		var text=data.map(function(t,idx) {
			if (idx==0) return ""; 
			var pb='<pb n="'+segnames[idx]+'"></pb>';
			return pb+t;
		});
		cb({texts:data,text:text.join(""),segnames:segnames,filestart:filestart,offsets:offsets,file:fileid,filename:filename}); //force different token
	});
}

var highlightRange=function(Q,startvpos,endvpos,opts,cb){
	//not implement yet
}

var highlightFile=function(Q,fileid,opts,cb) {
	if (typeof opts=="function") {
		cb=opts;
	}

	if (!Q || !Q.engine) return cb(null);

	var segoffsets=Q.engine.getFileSegOffsets(fileid);
	var output=[];	
	//console.log(startvpos,endvpos)
	Q.engine.get(["filecontents",fileid],true,function(data){
		if (!data) {
			console.error("wrong file id",fileid);
		} else {
			for (var i=0;i<data.length-1;i++ ){
				var startvpos=segoffsets[i];
				var endvpos=segoffsets[i+1];
				var segnames=Q.engine.getFileSegNames(fileid);
				var seg=getSegSync(Q.engine, fileid,i+1);
				var opt={text:seg.text,hits:null,tag:'hl',vpos:startvpos,
					fulltext:true,nospan:opts.nospan,nocrlf:opts.nocrlf};
				var segname=segnames[i+1];
				opt.hits=hitInRange(Q,startvpos,endvpos);
				var pb='<pb n="'+segname+'"></pb>';
				var withtag=injectTag(Q,opt);
				output.push(pb+withtag);
			}			
		}

		cb.apply(Q.engine.context,[{text:output.join(""),file:fileid}]);
	})
}
var highlightSeg=function(Q,fileid,segid,opts,cb,context) {
	if (typeof opts=="function") {
		cb=opts;
	}

	if (!Q || !Q.engine) return cb.apply(context,[null]);
	var segoffsets=Q.engine.getFileSegOffsets(fileid);
	var startvpos=segoffsets[segid-1];
	var endvpos=segoffsets[segid];
	var segnames=Q.engine.getFileSegNames(fileid);

	this.getSeg(Q.engine,fileid,segid,function(res){
		var opt={text:res.text,hits:null,vpos:startvpos,fulltext:true,
			nospan:opts.nospan,nocrlf:opts.nocrlf};
			opt.hits=hitInRange(Q,startvpos,endvpos);
			if (opts.renderTags) {
				opt.tags=tagsInRange(Q,opts.renderTags,startvpos,endvpos);
			}

		var segname=segnames[segid];
		cb.apply(context||Q.engine.context,[{text:injectTag(Q,opt),seg:segid,file:fileid,hits:opt.hits,segname:segname}]);
	});
}
module.exports={resultlist:resultlist, 
	hitInRange:hitInRange, 
	highlightSeg:highlightSeg,
	getSeg:getSeg,
	highlightFile:highlightFile,
	getFile:getFile
	//highlightRange:highlightRange,
  //getRange:getRange,
};
},{"./plist":"d:\\ksana2015\\node_modules\\ksana-search\\plist.js"}],"d:\\ksana2015\\node_modules\\ksana-search\\index.js":[function(require,module,exports){
/*
  Ksana Search Engine.

  need a KDE instance to be functional
  
*/
var bsearch=require("./bsearch");
var dosearch=require("./search");

var prepareEngineForSearch=function(engine,cb){
	if (engine.get("tokens") && engine.tokenizer) {
		cb();
		return;
	}

	engine.get([["tokens"],["postingslength"]],function(){
		if (!engine.analyzer) {
			var analyzer=require("ksana-analyzer");
			var config=engine.get("meta").config;
			engine.analyzer=analyzer.getAPI(config);			
		}
		cb();
	});
}

var _search=function(engine,q,opts,cb,context) {
	if (typeof engine=="string") {//browser only
		var kde=require("ksana-database");
		if (typeof opts=="function") { //user didn't supply options
			if (typeof cb=="object")context=cb;
			cb=opts;
			opts={};
		}
		opts.q=q;
		opts.dbid=engine;
		kde.open(opts.dbid,function(err,db){
			if (err) {
				cb(err);
				return;
			}
			prepareEngineForSearch(db,function(){
				return dosearch(db,q,opts,cb);	
			});
		},context);
	} else {
		prepareEngineForSearch(engine,function(){
			return dosearch(engine,q,opts,cb);	
		});
	}
}

var _highlightSeg=function(engine,fileid,segid,opts,cb,context){
	if (!opts.q) {
		if (!engine.analyzer) {
			var analyzer=require("ksana-analyzer");
			var config=engine.get("meta").config;
			engine.analyzer=analyzer.getAPI(config);			
		}
		api.excerpt.getSeg(engine,fileid,segid,opts,cb,context);
	} else {
		_search(engine,opts.q,opts,function(err,Q){
			api.excerpt.highlightSeg(Q,fileid,segid,opts,cb,context);
		});			
	}
}
var _highlightRange=function(engine,start,end,opts,cb,context){

	if (opts.q) {
		_search(engine,opts.q,opts,function(err,Q){
			api.excerpt.highlightRange(Q,start,end,opts,cb,context);
		});
	} else {
		prepareEngineForSearch(engine,function(){
			api.excerpt.getRange(engine,start,end,cb,context);
		});
	}
}
var _highlightFile=function(engine,fileid,opts,cb){
	if (!opts.q) opts.q=""; 
	_search(engine,opts.q,opts,function(err,Q){
		api.excerpt.highlightFile(Q,fileid,opts,cb);
	});
	/*
	} else {
		api.excerpt.getFile(engine,fileid,function(data) {
			cb.apply(engine.context,[data]);
		});
	}
	*/
}

var api={
	search:_search
//	,concordance:require("./concordance")
//	,regex:require("./regex")
	,highlightSeg:_highlightSeg
	,highlightFile:_highlightFile
//	,highlightRange:_highlightRange
	,excerpt:require("./excerpt")
	//,vpos2fileseg:vpos2fileseg
}
module.exports=api;
},{"./bsearch":"d:\\ksana2015\\node_modules\\ksana-search\\bsearch.js","./excerpt":"d:\\ksana2015\\node_modules\\ksana-search\\excerpt.js","./search":"d:\\ksana2015\\node_modules\\ksana-search\\search.js","ksana-analyzer":"d:\\ksana2015\\node_modules\\ksana-analyzer\\index.js","ksana-database":"d:\\ksana2015\\node_modules\\ksana-database\\index.js"}],"d:\\ksana2015\\node_modules\\ksana-search\\plist.js":[function(require,module,exports){

var unpack = function (ar) { // unpack variable length integer list
  var r = [],
  i = 0,
  v = 0;
  do {
	var shift = 0;
	do {
	  v += ((ar[i] & 0x7F) << shift);
	  shift += 7;
	} while (ar[++i] & 0x80);
	r[r.length]=v;
  } while (i < ar.length);
  return r;
}

/*
   arr:  [1,1,1,1,1,1,1,1,1]
   levels: [0,1,1,2,2,0,1,2]
   output: [5,1,3,1,1,3,1,1]
*/

var groupsum=function(arr,levels) {
  if (arr.length!=levels.length+1) return null;
  var stack=[];
  var output=new Array(levels.length);
  for (var i=0;i<levels.length;i++) output[i]=0;
  for (var i=1;i<arr.length;i++) { //first one out of toc scope, ignored
    if (stack.length>levels[i-1]) {
      while (stack.length>levels[i-1]) stack.pop();
    }
    stack.push(i-1);
    for (var j=0;j<stack.length;j++) {
      output[stack[j]]+=arr[i];
    }
  }
  return output;
}
/* arr= 1 , 2 , 3 ,4 ,5,6,7 //token posting
  posting= 3 , 5  //tag posting
  out = 3 , 2, 2
*/
var countbyposting = function (arr, posting) {
  if (!posting.length) return [arr.length];
  var out=[];
  for (var i=0;i<posting.length;i++) out[i]=0;
  out[posting.length]=0;
  var p=0,i=0,lasti=0;
  while (i<arr.length && p<posting.length) {
    if (arr[i]<=posting[p]) {
      while (p<posting.length && i<arr.length && arr[i]<=posting[p]) {
        out[p]++;
        i++;
      }      
    } 
    p++;
  }
  out[posting.length] = arr.length-i; //remaining
  return out;
}

var groupbyposting=function(arr,gposting) { //relative vpos
  if (!gposting.length) return [arr.length];
  var out=[];
  for (var i=0;i<=gposting.length;i++) out[i]=[];
  
  var p=0,i=0,lasti=0;
  while (i<arr.length && p<gposting.length) {
    if (arr[i]<gposting[p]) {
      while (p<gposting.length && i<arr.length && arr[i]<gposting[p]) {
        var start=0;
        if (p>0) start=gposting[p-1];
        out[p].push(arr[i++]-start);  // relative
      }      
    } 
    p++;
  }
  //remaining
  while(i<arr.length) out[out.length-1].push(arr[i++]-gposting[gposting.length-1]);
  return out;
}
var groupbyposting2=function(arr,gposting) { //absolute vpos
  if (!arr || !arr.length) return [];
  if (!gposting.length) return [arr.length];
  var out=[];
  for (var i=0;i<=gposting.length;i++) out[i]=[];
  
  var p=0,i=0,lasti=0;
  while (i<arr.length && p<gposting.length) {
    if (arr[i]<gposting[p]) {
      while (p<gposting.length && i<arr.length && arr[i]<gposting[p]) {
        var start=0;
        if (p>0) start=gposting[p-1]; //absolute
        out[p].push(arr[i++]);
      }      
    } 
    p++;
  }
  //remaining
  while(i<arr.length) out[out.length-1].push(arr[i++]-gposting[gposting.length-1]);
  return out;
}
var groupbyblock2 = function(ar, ntoken,slotshift,opts) {
  if (!ar.length) return [{},{}];
  
  slotshift = slotshift || 16;
  var g = Math.pow(2,slotshift);
  var i = 0;
  var r = {}, ntokens={};
  var groupcount=0;
  do {
    var group = Math.floor(ar[i] / g) ;
    if (!r[group]) {
      r[group] = [];
      ntokens[group]=[];
      groupcount++;
    }
    r[group].push(ar[i] % g);
    ntokens[group].push(ntoken[i]);
    i++;
  } while (i < ar.length);
  if (opts) opts.groupcount=groupcount;
  return [r,ntokens];
}
var groupbyslot = function (ar, slotshift, opts) {
  if (!ar.length)
	return {};
  
  slotshift = slotshift || 16;
  var g = Math.pow(2,slotshift);
  var i = 0;
  var r = {};
  var groupcount=0;
  do {
	var group = Math.floor(ar[i] / g) ;
	if (!r[group]) {
	  r[group] = [];
	  groupcount++;
	}
	r[group].push(ar[i] % g);
	i++;
  } while (i < ar.length);
  if (opts) opts.groupcount=groupcount;
  return r;
}
/*
var identity = function (value) {
  return value;
};
var sortedIndex = function (array, obj, iterator) { //taken from underscore
  iterator || (iterator = identity);
  var low = 0,
  high = array.length;
  while (low < high) {
	var mid = (low + high) >> 1;
	iterator(array[mid]) < iterator(obj) ? low = mid + 1 : high = mid;
  }
  return low;
};*/

var indexOfSorted = function (array, obj) { 
  var low = 0,
  high = array.length-1;
  while (low < high) {
    var mid = (low + high) >> 1;
    array[mid] < obj ? low = mid + 1 : high = mid;
  }
  return low;
};
var plhead=function(pl, pltag, opts) {
  opts=opts||{};
  opts.max=opts.max||1;
  var out=[];
  if (pltag.length<pl.length) {
    for (var i=0;i<pltag.length;i++) {
       k = indexOfSorted(pl, pltag[i]);
       if (k>-1 && k<pl.length) {
        if (pl[k]==pltag[i]) {
          out[out.length]=pltag[i];
          if (out.length>=opts.max) break;
        }
      }
    }
  } else {
    for (var i=0;i<pl.length;i++) {
       k = indexOfSorted(pltag, pl[i]);
       if (k>-1 && k<pltag.length) {
        if (pltag[k]==pl[i]) {
          out[out.length]=pltag[k];
          if (out.length>=opts.max) break;
        }
      }
    }
  }
  return out;
}
/*
 pl2 occur after pl1, 
 pl2>=pl1+mindis
 pl2<=pl1+maxdis
*/
var plfollow2 = function (pl1, pl2, mindis, maxdis) {
  var r = [],i=0;
  var swap = 0;
  
  while (i<pl1.length){
    var k = indexOfSorted(pl2, pl1[i] + mindis);
    var t = (pl2[k] >= (pl1[i] +mindis) && pl2[k]<=(pl1[i]+maxdis)) ? k : -1;
    if (t > -1) {
      r[r.length]=pl1[i];
      i++;
    } else {
      if (k>=pl2.length) break;
      var k2=indexOfSorted (pl1,pl2[k]-maxdis);
      if (k2>i) {
        var t = (pl2[k] >= (pl1[i] +mindis) && pl2[k]<=(pl1[i]+maxdis)) ? k : -1;
        if (t>-1) r[r.length]=pl1[k2];
        i=k2;
      } else break;
    }
  }
  return r;
}

var plnotfollow2 = function (pl1, pl2, mindis, maxdis) {
  var r = [],i=0;
  
  while (i<pl1.length){
    var k = indexOfSorted(pl2, pl1[i] + mindis);
    var t = (pl2[k] >= (pl1[i] +mindis) && pl2[k]<=(pl1[i]+maxdis)) ? k : -1;
    if (t > -1) {
      i++;
    } else {
      if (k>=pl2.length) {
        r=r.concat(pl1.slice(i));
        break;
      } else {
        var k2=indexOfSorted (pl1,pl2[k]-maxdis);
        if (k2>i) {
          r=r.concat(pl1.slice(i,k2));
          i=k2;
        } else break;
      }
    }
  }
  return r;
}
/* this is incorrect */
var plfollow = function (pl1, pl2, distance) {
  var r = [],i=0;

  while (i<pl1.length){
    var k = indexOfSorted(pl2, pl1[i] + distance);
    var t = (pl2[k] === (pl1[i] + distance)) ? k : -1;
    if (t > -1) {
      r.push(pl1[i]);
      i++;
    } else {
      if (k>=pl2.length) break;
      var k2=indexOfSorted (pl1,pl2[k]-distance);
      if (k2>i) {
        t = (pl2[k] === (pl1[k2] + distance)) ? k : -1;
        if (t>-1) {
           r.push(pl1[k2]);
           k2++;
        }
        i=k2;
      } else break;
    }
  }
  return r;
}
var plnotfollow = function (pl1, pl2, distance) {
  var r = [];
  var r = [],i=0;
  var swap = 0;
  
  while (i<pl1.length){
    var k = indexOfSorted(pl2, pl1[i] + distance);
    var t = (pl2[k] === (pl1[i] + distance)) ? k : -1;
    if (t > -1) { 
      i++;
    } else {
      if (k>=pl2.length) {
        r=r.concat(pl1.slice(i));
        break;
      } else {
        var k2=indexOfSorted (pl1,pl2[k]-distance);
        if (k2>i) {
          r=r.concat(pl1.slice(i,k2));
          i=k2;
        } else break;
      }
    }
  }
  return r;
}
var pland = function (pl1, pl2, distance) {
  var r = [];
  var swap = 0;
  
  if (pl1.length > pl2.length) { //swap for faster compare
    var t = pl2;
    pl2 = pl1;
    pl1 = t;
    swap = distance;
    distance = -distance;
  }
  for (var i = 0; i < pl1.length; i++) {
    var k = indexOfSorted(pl2, pl1[i] + distance);
    var t = (pl2[k] === (pl1[i] + distance)) ? k : -1;
    if (t > -1) {
      r.push(pl1[i] - swap);
    }
  }
  return r;
}
var combine=function (postings) {
  var out=[];
  for (var i in postings) {
    out=out.concat(postings[i]);
  }
  out.sort(function(a,b){return a-b});
  return out;
}

var unique = function(ar){
   if (!ar || !ar.length) return [];
   var u = {}, a = [];
   for(var i = 0, l = ar.length; i < l; ++i){
    if(u.hasOwnProperty(ar[i])) continue;
    a.push(ar[i]);
    u[ar[i]] = 1;
   }
   return a;
}



var plphrase = function (postings,ops) {
  var r = [];
  for (var i=0;i<postings.length;i++) {
  	if (!postings[i])  return [];
  	if (0 === i) {
  	  r = postings[0];
  	} else {
      if (ops[i]=='andnot') {
        r = plnotfollow(r, postings[i], i);  
      }else {
        r = pland(r, postings[i], i);  
      }
  	}
  }
  
  return r;
}
//return an array of group having any of pl item
var matchPosting=function(pl,gupl,start,end) {
  start=start||0;
  end=end||-1;
  if (end==-1) end=Math.pow(2, 53); // max integer value

  var count=0, i = j= 0,  result = [] ,v=0;
  var docs=[], freq=[];
  if (!pl) return {docs:[],freq:[]};
  while( i < pl.length && j < gupl.length ){
     if (pl[i] < gupl[j] ){ 
       count++;
       v=pl[i];
       i++; 
     } else {
       if (count) {
        if (v>=start && v<end) {
          docs.push(j);
          freq.push(count);          
        }
       }
       j++;
       count=0;
     }
  }
  if (count && j<gupl.length && v>=start && v<end) {
    docs.push(j);
    freq.push(count);
    count=0;
  }
  else {
    while (j==gupl.length && i<pl.length && pl[i] >= gupl[gupl.length-1]) {
      i++;
      count++;
    }
    if (v>=start && v<end) {
      docs.push(j);
      freq.push(count);      
    }
  } 
  return {docs:docs,freq:freq};
}

var trim=function(arr,start,end) {
  var s=indexOfSorted(arr,start);
  var e=indexOfSorted(arr,end);
  return arr.slice(s,e+1);
}
var plist={};
plist.unpack=unpack;
plist.plphrase=plphrase;
plist.plhead=plhead;
plist.plfollow2=plfollow2;
plist.plnotfollow2=plnotfollow2;
plist.plfollow=plfollow;
plist.plnotfollow=plnotfollow;
plist.unique=unique;
plist.indexOfSorted=indexOfSorted;
plist.matchPosting=matchPosting;
plist.trim=trim;

plist.groupbyslot=groupbyslot;
plist.groupbyblock2=groupbyblock2;
plist.countbyposting=countbyposting;
plist.groupbyposting=groupbyposting;
plist.groupbyposting2=groupbyposting2;
plist.groupsum=groupsum;
plist.combine=combine;
module.exports=plist;
},{}],"d:\\ksana2015\\node_modules\\ksana-search\\search.js":[function(require,module,exports){
/*
var dosearch2=function(engine,opts,cb,context) {
	opts
		nfile,npage  //return a highlighted page
		nfile,[pages] //return highlighted pages 
		nfile        //return entire highlighted file
		abs_npage
		[abs_pages]  //return set of highlighted pages (may cross file)

		filename, pagename
		filename,[pagenames]

		excerpt      //
	    sortBy       //default natural, sortby by vsm ranking

	//return err,array_of_string ,Q  (Q contains low level search result)
}

*/
/* TODO sorted tokens */
var plist=require("./plist");
var boolsearch=require("./boolsearch");
var excerpt=require("./excerpt");
var parseTerm = function(engine,raw,opts) {
	if (!raw) return;
	var res={raw:raw,variants:[],term:'',op:''};
	var term=raw, op=0;
	var firstchar=term[0];
	var termregex="";
	if (firstchar=='-') {
		term=term.substring(1);
		firstchar=term[0];
		res.exclude=true; //exclude
	}
	term=term.trim();
	var lastchar=term[term.length-1];
	term=engine.analyzer.normalize(term);
	
	if (term.indexOf("%")>-1) {
		var termregex="^"+term.replace(/%+/g,".+")+"$";
		if (firstchar=="%") 	termregex=".+"+termregex.substr(1);
		if (lastchar=="%") 	termregex=termregex.substr(0,termregex.length-1)+".+";
	}

	if (termregex) {
		res.variants=expandTerm(engine,termregex);
	}

	res.key=term;
	return res;
}
var expandTerm=function(engine,regex) {
	var r=new RegExp(regex);
	var tokens=engine.get("tokens");
	var postingsLength=engine.get("postingslength");
	if (!postingsLength) postingsLength=[];
	var out=[];
	for (var i=0;i<tokens.length;i++) {
		var m=tokens[i].match(r);
		if (m) {
			out.push([m[0],postingsLength[i]||1]);
		}
	}
	out.sort(function(a,b){return b[1]-a[1]});
	return out;
}
var isWildcard=function(raw) {
	return !!raw.match(/[\*\?]/);
}

var isOrTerm=function(term) {
	term=term.trim();
	return (term[term.length-1]===',');
}
var orterm=function(engine,term,key) {
		var t={text:key};
		if (engine.analyzer.simplifiedToken) {
			t.simplified=engine.analyzer.simplifiedToken(key);
		}
		term.variants.push(t);
}
var orTerms=function(engine,tokens,now) {
	var raw=tokens[now];
	var term=parseTerm(engine,raw);
	if (!term) return;
	orterm(engine,term,term.key);
	while (isOrTerm(raw))  {
		raw=tokens[++now];
		var term2=parseTerm(engine,raw);
		orterm(engine,term,term2.key);
		for (var i in term2.variants){
			term.variants[i]=term2.variants[i];
		}
		term.key+=','+term2.key;
	}
	return term;
}

var getOperator=function(raw) {
	var op='';
	if (raw[0]=='+') op='include';
	if (raw[0]=='-') op='exclude';
	return op;
}
var parsePhrase=function(q) {
	var match=q.match(/(".+?"|'.+?'|\S+)/g)
	match=match.map(function(str){
		var n=str.length, h=str.charAt(0), t=str.charAt(n-1)
		if (h===t&&(h==='"'|h==="'")) str=str.substr(1,n-2)
		return str;
	})
	return match;
}
var tibetanNumber={
	"\u0f20":"0","\u0f21":"1","\u0f22":"2",	"\u0f23":"3",	"\u0f24":"4",
	"\u0f25":"5","\u0f26":"6","\u0f27":"7","\u0f28":"8","\u0f29":"9"
}
var parseNumber=function(raw) {
	var n=parseInt(raw,10);
	if (isNaN(n)){
		var converted=[];
		for (var i=0;i<raw.length;i++) {
			var nn=tibetanNumber[raw[i]];
			if (typeof nn !="undefined") converted[i]=nn;
			else break;
		}
		return parseInt(converted,10);
	} else {
		return n;
	}
}
var parseWildcard=function(raw) {
	var n=parseNumber(raw) || 1;
	var qcount=raw.split('?').length-1;
	var scount=raw.split('*').length-1;
	var type='';
	if (qcount) type='?';
	else if (scount) type='*';
	return {wildcard:type, width: n , op:'wildcard'};
}

var newPhrase=function() {
	return {termid:[],posting:[],raw:'',termlength:[]};
} 
var parseQuery=function(q,sep) {
	if (sep && q.indexOf(sep)>-1) {
		var match=q.split(sep);
	} else {
		var match=q.match(/(".+?"|'.+?'|\S+)/g)
		match=match.map(function(str){
			var n=str.length, h=str.charAt(0), t=str.charAt(n-1)
			if (h===t&&(h==='"'|h==="'")) str=str.substr(1,n-2)
			return str
		})
		//console.log(input,'==>',match)		
	}
	return match;
}
var loadPhrase=function(phrase) {
	/* remove leading and ending wildcard */
	var Q=this;
	var cache=Q.engine.postingCache;
	if (cache[phrase.key]) {
		phrase.posting=cache[phrase.key];
		return Q;
	}
	if (phrase.termid.length==1) {
		if (!Q.terms.length){
			phrase.posting=[];
		} else {
			cache[phrase.key]=phrase.posting=Q.terms[phrase.termid[0]].posting;	
		}
		return Q;
	}

	var i=0, r=[],dis=0;
	while(i<phrase.termid.length) {
	  var T=Q.terms[phrase.termid[i]];
		if (0 === i) {
			r = T.posting;
		} else {
		    if (T.op=='wildcard') {
		    	T=Q.terms[phrase.termid[i++]];
		    	var width=T.width;
		    	var wildcard=T.wildcard;
		    	T=Q.terms[phrase.termid[i]];
		    	var mindis=dis;
		    	if (wildcard=='?') mindis=dis+width;
		    	if (T.exclude) r = plist.plnotfollow2(r, T.posting, mindis, dis+width);
		    	else r = plist.plfollow2(r, T.posting, mindis, dis+width);		    	
		    	dis+=(width-1);
		    }else {
		    	if (T.posting) {
		    		if (T.exclude) r = plist.plnotfollow(r, T.posting, dis);
		    		else r = plist.plfollow(r, T.posting, dis);
		    	}
		    }
		}
		dis += phrase.termlength[i];
		i++;
		if (!r) return Q;
  }
  phrase.posting=r;
  cache[phrase.key]=r;
  return Q;
}
var trimSpace=function(engine,query) {
	if (!query) return "";
	var i=0;
	var isSkip=engine.analyzer.isSkip;
	while (i<query.length && isSkip(query[i])) i++;
	return query.substring(i);
}
var getSegWithHit=function(fileid,offsets) {
	var Q=this,engine=Q.engine;
	var segWithHit=plist.groupbyposting2(Q.byFile[fileid ], offsets);
	if (segWithHit.length) segWithHit.shift(); //the first item is not used (0~Q.byFile[0] )
	var out=[];
	segWithHit.map(function(p,idx){if (p.length) out.push(idx)});
	return out;
}
var segWithHit=function(fileid) {
	var Q=this,engine=Q.engine;
	var offsets=engine.getFileSegOffsets(fileid);
	return getSegWithHit.apply(this,[fileid,offsets]);
}
var isSimplePhrase=function(phrase) {
	var m=phrase.match(/[\?%^]/);
	return !m;
}

// 發菩提心   ==> 發菩  提心       2 2   
// 菩提心     ==> 菩提  提心       1 2
// 劫劫       ==> 劫    劫         1 1   // invalid
// 因緣所生道  ==> 因緣  所生   道   2 2 1
var splitPhrase=function(engine,simplephrase,bigram) {
	var bigram=bigram||engine.get("meta").bigram||[];
	var tokens=engine.analyzer.tokenize(simplephrase).tokens;
	var loadtokens=[],lengths=[],j=0,lastbigrampos=-1;
	while (j+1<tokens.length) {
		var token=engine.analyzer.normalize(tokens[j]);
		var nexttoken=engine.analyzer.normalize(tokens[j+1]);
		var bi=token+nexttoken;
		var i=plist.indexOfSorted(bigram,bi);
		if (bigram[i]==bi) {
			loadtokens.push(bi);
			if (j+3<tokens.length) {
				lastbigrampos=j;
				j++;
			} else {
				if (j+2==tokens.length){ 
					if (lastbigrampos+1==j ) {
						lengths[lengths.length-1]--;
					}
					lastbigrampos=j;
					j++;
				}else {
					lastbigrampos=j;	
				}
			}
			lengths.push(2);
		} else {
			if (!bigram || lastbigrampos==-1 || lastbigrampos+1!=j) {
				loadtokens.push(token);
				lengths.push(1);				
			}
		}
		j++;
	}

	while (j<tokens.length) {
		var token=engine.analyzer.normalize(tokens[j]);
		loadtokens.push(token);
		lengths.push(1);
		j++;
	}

	return {tokens:loadtokens, lengths: lengths , tokenlength: tokens.length};
}
/* host has fast native function */
var fastPhrase=function(engine,phrase) {
	var phrase_term=newPhrase();
	//var tokens=engine.analyzer.tokenize(phrase).tokens;
	var splitted=splitPhrase(engine,phrase);

	var paths=postingPathFromTokens(engine,splitted.tokens);
//create wildcard

	phrase_term.width=splitted.tokenlength; //for excerpt.js to getPhraseWidth

	engine.get(paths,{address:true},function(postingAddress){ //this is sync
		phrase_term.key=phrase;
		var postingAddressWithWildcard=[];
		for (var i=0;i<postingAddress.length;i++) {
			postingAddressWithWildcard.push(postingAddress[i]);
			if (splitted.lengths[i]>1) {
				postingAddressWithWildcard.push([splitted.lengths[i],0]); //wildcard has blocksize==0 
			}
		}
		engine.postingCache[phrase]=engine.mergePostings(postingAddressWithWildcard);
	});
	return phrase_term;
	// put posting into cache[phrase.key]
}
var slowPhrase=function(engine,terms,phrase) {
	var j=0,tokens=engine.analyzer.tokenize(phrase).tokens;
	var phrase_term=newPhrase();
	var termid=0;
	while (j<tokens.length) {
		var raw=tokens[j], termlength=1;
		if (isWildcard(raw)) {
			if (phrase_term.termid.length==0)  { //skip leading wild card
				j++
				continue;
			}
			terms.push(parseWildcard(raw));
			termid=terms.length-1;
			phrase_term.termid.push(termid);
			phrase_term.termlength.push(termlength);
		} else if (isOrTerm(raw)){
			var term=orTerms.apply(this,[tokens,j]);
			if (term) {
				terms.push(term);
				termid=terms.length-1;
				j+=term.key.split(',').length-1;					
			}
			j++;
			phrase_term.termid.push(termid);
			phrase_term.termlength.push(termlength);
		} else {
			var phrase="";
			while (j<tokens.length) {
				if (!(isWildcard(tokens[j]) || isOrTerm(tokens[j]))) {
					phrase+=tokens[j];
					j++;
				} else break;
			}

			var splitted=splitPhrase(engine,phrase);
			for (var i=0;i<splitted.tokens.length;i++) {
				var term=parseTerm(engine,splitted.tokens[i]);
				if (!term) continue;
				var termidx=terms.map(function(a){return a.key}).indexOf(term.key);
				if (termidx==-1) {
					terms.push(term);
					termid=terms.length-1;
				} else {
					termid=termidx;
				}				
				phrase_term.termid.push(termid);
				phrase_term.termlength.push(splitted.lengths[i]);
			}
		}
		j++;
	}
	phrase_term.key=phrase;
	//remove ending wildcard
	var P=phrase_term , T=null;
	do {
		T=terms[P.termid[P.termid.length-1]];
		if (!T) break;
		if (T.wildcard) P.termid.pop(); else break;
	} while(T);		
	return phrase_term;
}
var newQuery =function(engine,query,opts) {
	//if (!query) return;
	opts=opts||{};
	query=trimSpace(engine,query);

	var phrases=query,phrases=[];
	if (typeof query=='string' && query) {
		phrases=parseQuery(query,opts.phrase_sep || "");
	}
	
	var phrase_terms=[], terms=[],variants=[],operators=[];
	var pc=0;//phrase count
	for  (var i=0;i<phrases.length;i++) {
		var op=getOperator(phrases[pc]);
		if (op) phrases[pc]=phrases[pc].substring(1);

		/* auto add + for natural order ?*/
		//if (!opts.rank && op!='exclude' &&i) op='include';
		operators.push(op);

		if (isSimplePhrase(phrases[pc]) && engine.mergePostings ) {
			var phrase_term=fastPhrase(engine,phrases[pc]);
		} else {
			var phrase_term=slowPhrase(engine,terms,phrases[pc]);
		}
		phrase_terms.push(phrase_term);

		if (!engine.mergePostings && phrase_terms[pc].termid.length==0) {
			phrase_terms.pop();
		} else pc++;
	}
	opts.op=operators;

	var Q={dbname:engine.dbname,engine:engine,opts:opts,query:query,
		phrases:phrase_terms,terms:terms
	};
	Q.tokenize=function() {return engine.analyzer.tokenize.apply(engine,arguments);}
	Q.isSkip=function() {return engine.analyzer.isSkip.apply(engine,arguments);}
	Q.normalize=function() {return engine.analyzer.normalize.apply(engine,arguments);}
	Q.segWithHit=segWithHit;

	//Q.getRange=function() {return that.getRange.apply(that,arguments)};
	//API.queryid='Q'+(Math.floor(Math.random()*10000000)).toString(16);
	return Q;
}
var postingPathFromTokens=function(engine,tokens) {
	var alltokens=engine.get("tokens");

	var tokenIds=tokens.map(function(t){ return 1+alltokens.indexOf(t)});
	var postingid=[];
	for (var i=0;i<tokenIds.length;i++) {
		postingid.push( tokenIds[i]); // tokenId==0 , empty token
	}
	return postingid.map(function(t){return ["postings",t]});
}
var loadPostings=function(engine,tokens,cb) {
	var toloadtokens=tokens.filter(function(t){
		return !engine.postingCache[t.key]; //already in cache
	});
	if (toloadtokens.length==0) {
		cb();
		return;
	}
	var postingPaths=postingPathFromTokens(engine,tokens.map(function(t){return t.key}));
	engine.get(postingPaths,function(postings){
		postings.map(function(p,i) { tokens[i].posting=p });
		if (cb) cb();
	});
}
var groupBy=function(Q,posting) {
	phrases.forEach(function(P){
		var key=P.key;
		var docfreq=docfreqcache[key];
		if (!docfreq) docfreq=docfreqcache[key]={};
		if (!docfreq[that.groupunit]) {
			docfreq[that.groupunit]={doclist:null,freq:null};
		}		
		if (P.posting) {
			var res=matchPosting(engine,P.posting);
			P.freq=res.freq;
			P.docs=res.docs;
		} else {
			P.docs=[];
			P.freq=[];
		}
		docfreq[that.groupunit]={doclist:P.docs,freq:P.freq};
	});
	return this;
}
var groupByFolder=function(engine,filehits) {
	var files=engine.get("filenames");
	var prevfolder="",hits=0,out=[];
	for (var i=0;i<filehits.length;i++) {
		var fn=files[i];
		var folder=fn.substring(0,fn.indexOf('/'));
		if (prevfolder && prevfolder!=folder) {
			out.push(hits);
			hits=0;
		}
		hits+=filehits[i].length;
		prevfolder=folder;
	}
	out.push(hits);
	return out;
}
var phrase_intersect=function(engine,Q) {
	var intersected=null;
	var fileoffsets=Q.engine.get("fileoffsets");
	var empty=[],emptycount=0,hashit=0;
	for (var i=0;i<Q.phrases.length;i++) {
		var byfile=plist.groupbyposting2(Q.phrases[i].posting,fileoffsets);
		if (byfile.length) byfile.shift();
		if (byfile.length) byfile.pop();
		byfile.pop();
		if (intersected==null) {
			intersected=byfile;
		} else {
			for (var j=0;j<byfile.length;j++) {
				if (!(byfile[j].length && intersected[j] && intersected[j].length)) {
					intersected[j]=empty; //reuse empty array
					emptycount++;
				} else hashit++;
			}
		}
	}

	Q.byFile=intersected;
	Q.byFolder=groupByFolder(engine,Q.byFile);
	var out=[];
	//calculate new rawposting
	for (var i=0;i<Q.byFile.length;i++) {
		if (Q.byFile[i].length) out=out.concat(Q.byFile[i]);
	}
	Q.rawresult=out;
	countFolderFile(Q);
}
var countFolderFile=function(Q) {
	Q.fileWithHitCount=0;
	Q.byFile.map(function(f){if (f.length) Q.fileWithHitCount++});
			
	Q.folderWithHitCount=0;
	Q.byFolder.map(function(f){if (f) Q.folderWithHitCount++});
}

var main=function(engine,q,opts,cb){

	var starttime=new Date();
	var meta=engine.get("meta");
	if (meta.normalize && engine.analyzer.setNormalizeTable) {
		meta.normalizeObj=engine.analyzer.setNormalizeTable(meta.normalize,meta.normalizeObj);
	}
	if (typeof opts=="function") cb=opts;
	opts=opts||{};
	var Q=engine.queryCache[q];
	if (!Q) Q=newQuery(engine,q,opts); 
	if (!Q) {
		engine.searchtime=new Date()-starttime;
		engine.totaltime=engine.searchtime;
		if (engine.context) cb.apply(engine.context,["empty result",{rawresult:[]}]);
		else cb("empty result",{rawresult:[]});
		return;
	};
	engine.queryCache[q]=Q;
	if (Q.phrases.length) {
		
		loadPostings(engine,Q.terms,function(){
			if (!Q.phrases[0].posting) {
				engine.searchtime=new Date()-starttime;
				engine.totaltime=engine.searchtime;
				cb.apply(engine.context,["no such posting",{rawresult:[]}]);
				return;			
			}
			
			if (!Q.phrases[0].posting.length) { //
				Q.phrases.forEach(loadPhrase.bind(Q));
			}
			if (Q.phrases.length==1) {
				Q.rawresult=Q.phrases[0].posting;
			} else {
				phrase_intersect(engine,Q);
			}
			var fileoffsets=Q.engine.get("fileoffsets");
			//console.log("search opts "+JSON.stringify(opts));

			if (!Q.byFile && Q.rawresult && !opts.nogroup) {
				Q.byFile=plist.groupbyposting2(Q.rawresult, fileoffsets);
				Q.byFile.shift();Q.byFile.pop();
				Q.byFolder=groupByFolder(engine,Q.byFile);

				countFolderFile(Q);
			}

			if (opts.range) {
				engine.searchtime=new Date()-starttime;
				excerpt.resultlist(engine,Q,opts,function(data) { 
					//console.log("excerpt ok");
					Q.excerpt=data;
					engine.totaltime=new Date()-starttime;
					cb.apply(engine.context,[0,Q]);
				});
			} else {
				engine.searchtime=new Date()-starttime;
				engine.totaltime=new Date()-starttime;
				cb.apply(engine.context,[0,Q]);
			}
		});
	} else { //empty search
		engine.searchtime=new Date()-starttime;
		engine.totaltime=new Date()-starttime;
		cb.apply(engine.context,[0,Q]);
	};
}

main.splitPhrase=splitPhrase; //just for debug
module.exports=main;
},{"./boolsearch":"d:\\ksana2015\\node_modules\\ksana-search\\boolsearch.js","./excerpt":"d:\\ksana2015\\node_modules\\ksana-search\\excerpt.js","./plist":"d:\\ksana2015\\node_modules\\ksana-search\\plist.js"}],"d:\\ksana2015\\node_modules\\ksana2015-webruntime\\checkbrowser.js":[function(require,module,exports){
/*
convert to pure js
save -g reactify
*/
var React=(window&&window.React)||require("react");
var E=React.createElement;

var hasksanagap=(typeof ksanagap!="undefined");
if (hasksanagap && (typeof console=="undefined" || typeof console.log=="undefined")) {
		window.console={log:ksanagap.log,error:ksanagap.error,debug:ksanagap.debug,warn:ksanagap.warn};
		console.log("install console output funciton");
}

var checkfs=function() {
	return (navigator && navigator.webkitPersistentStorage) || hasksanagap;
}
var featurechecks={
	"fs":checkfs
}
var checkbrowser = React.createClass({
	getInitialState:function() {

		var missingFeatures=this.getMissingFeatures();
		return {ready:false, missing:missingFeatures};
	},
	getMissingFeatures:function() {
		var feature=this.props.feature.split(",");
		var status=[];
		feature.map(function(f){
			var checker=featurechecks[f];
			if (checker) checker=checker();
			status.push([f,checker]);
		});
		return status.filter(function(f){return !f[1]});
	},
	downloadbrowser:function() {
		window.location="https://www.google.com/chrome/"
	},
	renderMissing:function() {
		var showMissing=function(m) {
			return E("div", null, m);
		}
		return (
		 E("div", {ref: "dialog1", className: "modal fade", "data-backdrop": "static"}, 
		    E("div", {className: "modal-dialog"}, 
		      E("div", {className: "modal-content"}, 
		        E("div", {className: "modal-header"}, 
		          E("button", {type: "button", className: "close", "data-dismiss": "modal", "aria-hidden": "true"}, "×"), 
		          E("h4", {className: "modal-title"}, "Browser Check")
		        ), 
		        E("div", {className: "modal-body"}, 
		          E("p", null, "Sorry but the following feature is missing"), 
		          this.state.missing.map(showMissing)
		        ), 
		        E("div", {className: "modal-footer"}, 
		          E("button", {onClick: this.downloadbrowser, type: "button", className: "btn btn-primary"}, "Download Google Chrome")
		        )
		      )
		    )
		  )
		 );
	},
	renderReady:function() {
		return E("span", null, "browser ok")
	},
	render:function(){
		return  (this.state.missing.length)?this.renderMissing():this.renderReady();
	},
	componentDidMount:function() {
		if (!this.state.missing.length) {
			this.props.onReady();
		} else {
			$(this.refs.dialog1.getDOMNode()).modal('show');
		}
	}
});

module.exports=checkbrowser;
},{"react":"react"}],"d:\\ksana2015\\node_modules\\ksana2015-webruntime\\downloader.js":[function(require,module,exports){

var userCancel=false;
var files=[];
var totalDownloadByte=0;
var targetPath="";
var tempPath="";
var nfile=0;
var baseurl="";
var result="";
var downloading=false;
var startDownload=function(dbid,_baseurl,_files) { //return download id
	var fs     = require("fs");
	var path   = require("path");

	
	files=_files.split("\uffff");
	if (downloading) return false; //only one session
	userCancel=false;
	totalDownloadByte=0;
	nextFile();
	downloading=true;
	baseurl=_baseurl;
	if (baseurl[baseurl.length-1]!='/')baseurl+='/';
	targetPath=ksanagap.rootPath+dbid+'/';
	tempPath=ksanagap.rootPath+".tmp/";
	result="";
	return true;
}

var nextFile=function() {
	setTimeout(function(){
		if (nfile==files.length) {
			nfile++;
			endDownload();
		} else {
			downloadFile(nfile++);	
		}
	},100);
}

var downloadFile=function(nfile) {
	var url=baseurl+files[nfile];
	var tmpfilename=tempPath+files[nfile];
	var mkdirp = require("./mkdirp");
	var fs     = require("fs");
	var http   = require("http");

	mkdirp.sync(path.dirname(tmpfilename));
	var writeStream = fs.createWriteStream(tmpfilename);
	var datalength=0;
	var request = http.get(url, function(response) {
		response.on('data',function(chunk){
			writeStream.write(chunk);
			totalDownloadByte+=chunk.length;
			if (userCancel) {
				writeStream.end();
				setTimeout(function(){nextFile();},100);
			}
		});
		response.on("end",function() {
			writeStream.end();
			setTimeout(function(){nextFile();},100);
		});
	});
}

var cancelDownload=function() {
	userCancel=true;
	endDownload();
}
var verify=function() {
	return true;
}
var endDownload=function() {
	nfile=files.length+1;//stop
	result="cancelled";
	downloading=false;
	if (userCancel) return;
	var fs     = require("fs");
	var mkdirp = require("./mkdirp");

	for (var i=0;i<files.length;i++) {
		var targetfilename=targetPath+files[i];
		var tmpfilename   =tempPath+files[i];
		mkdirp.sync(path.dirname(targetfilename));
		fs.renameSync(tmpfilename,targetfilename);
	}
	if (verify()) {
		result="success";
	} else {
		result="error";
	}
}

var downloadedByte=function() {
	return totalDownloadByte;
}
var doneDownload=function() {
	if (nfile>files.length) return result;
	else return "";
}
var downloadingFile=function() {
	return nfile-1;
}

var downloader={startDownload:startDownload, downloadedByte:downloadedByte,
	downloadingFile:downloadingFile, cancelDownload:cancelDownload,doneDownload:doneDownload};
module.exports=downloader;
},{"./mkdirp":"d:\\ksana2015\\node_modules\\ksana2015-webruntime\\mkdirp.js","fs":false,"http":false,"path":false}],"d:\\ksana2015\\node_modules\\ksana2015-webruntime\\fileinstaller.js":[function(require,module,exports){
/* todo , optional kdb */
var React=(window&&window.React)||require("react");
var HtmlFS=require("./htmlfs");
var html5fs=require("./html5fs");
var CheckBrowser=require("./checkbrowser");
var E=React.createElement;
  

var FileList = React.createClass({
	getInitialState:function() {
		return {downloading:false,progress:0};
	},
	updatable:function(f) {
        var classes="btn btn-warning";
        if (this.state.downloading) classes+=" disabled";
		if (f.hasUpdate) return   E("button", {className: classes, 
			"data-filename": f.filename, "data-url": f.url, 
	            onClick: this.download
	       }, "Update")
		else return null;
	},
	showLocal:function(f) {
        var classes="btn btn-danger";
        if (this.state.downloading) classes+=" disabled";
	  return E("tr", null, E("td", null, f.filename), 
	      E("td", null), 
	      E("td", {className: "pull-right"}, 
	      this.updatable(f), E("button", {className: classes, 
	               onClick: this.deleteFile, "data-filename": f.filename}, "Delete")
	        
	      )
	  )
	},  
	showRemote:function(f) { 
	  var classes="btn btn-warning";
	  if (this.state.downloading) classes+=" disabled";
	  return (E("tr", {"data-id": f.filename}, E("td", null, 
	      f.filename), 
	      E("td", null, f.desc), 
	      E("td", null, 
	      E("span", {"data-filename": f.filename, "data-url": f.url, 
	            className: classes, 
	            onClick: this.download}, "Download")
	      )
	  ));
	},
	showFile:function(f) {
	//	return <span data-id={f.filename}>{f.url}</span>
		return (f.ready)?this.showLocal(f):this.showRemote(f);
	},
	reloadDir:function() {
		this.props.action("reload");
	},
	download:function(e) {
		var url=e.target.dataset["url"];
		var filename=e.target.dataset["filename"];
		this.setState({downloading:true,progress:0,url:url});
		this.userbreak=false;
		html5fs.download(url,filename,function(){
			this.reloadDir();
			this.setState({downloading:false,progress:1});
			},function(progress,total){
				if (progress==0) {
					this.setState({message:"total "+total})
			 	}
			 	this.setState({progress:progress});
			 	//if user press abort return true
			 	return this.userbreak;
			}
		,this);
	},
	deleteFile:function( e) {
		var filename=e.target.attributes["data-filename"].value;
		this.props.action("delete",filename);
	},
	allFilesReady:function(e) {
		return this.props.files.every(function(f){ return f.ready});
	},
	dismiss:function() {
		$(this.refs.dialog1.getDOMNode()).modal('hide');
		this.props.action("dismiss");
	},
	abortdownload:function() {
		this.userbreak=true;
	},
	showProgress:function() {
	     if (this.state.downloading) {
	      var progress=Math.round(this.state.progress*100);
	      return (
	      	E("div", null, 
	      	"Downloading from ", this.state.url, 
	      E("div", {key: "progress", className: "progress col-md-8"}, 
	          E("div", {className: "progress-bar", role: "progressbar", 
	              "aria-valuenow": progress, "aria-valuemin": "0", 
	              "aria-valuemax": "100", style: {width: progress+"%"}}, 
	            progress, "%"
	          )
	        ), 
	        E("button", {onClick: this.abortdownload, 
	        	className: "btn btn-danger col-md-4"}, "Abort")
	        )
	        );
	      } else {
	      		if ( this.allFilesReady() ) {
	      			return E("button", {onClick: this.dismiss, className: "btn btn-success"}, "Ok")
	      		} else return null;
	      		
	      }
	},
	showUsage:function() {
		var percent=this.props.remainPercent;
           return (E("div", null, E("span", {className: "pull-left"}, "Usage:"), E("div", {className: "progress"}, 
		  E("div", {className: "progress-bar progress-bar-success progress-bar-striped", role: "progressbar", style: {width: percent+"%"}}, 
		    	percent+"%"
		  )
		)));
	},
	render:function() {
	  	return (
		E("div", {ref: "dialog1", className: "modal fade", "data-backdrop": "static"}, 
		    E("div", {className: "modal-dialog"}, 
		      E("div", {className: "modal-content"}, 
		        E("div", {className: "modal-header"}, 
		          E("h4", {className: "modal-title"}, "File Installer")
		        ), 
		        E("div", {className: "modal-body"}, 
		        	E("table", {className: "table"}, 
		        	E("tbody", null, 
		          	this.props.files.map(this.showFile)
		          	)
		          )
		        ), 
		        E("div", {className: "modal-footer"}, 
		        	this.showUsage(), 
		           this.showProgress()
		        )
		      )
		    )
		  )
		);
	},	
	componentDidMount:function() {
		$(this.refs.dialog1.getDOMNode()).modal('show');
	}
});
/*TODO kdb check version*/
var Filemanager = React.createClass({
	getInitialState:function() {
		var quota=this.getQuota();
		return {browserReady:false,noupdate:true,	requestQuota:quota,remain:0};
	},
	getQuota:function() {
		var q=this.props.quota||"128M";
		var unit=q[q.length-1];
		var times=1;
		if (unit=="M") times=1024*1024;
		else if (unit="K") times=1024;
		return parseInt(q) * times;
	},
	missingKdb:function() {
		if (ksanagap.platform!="chrome") return [];
		var missing=this.props.needed.filter(function(kdb){
			for (var i in html5fs.files) {
				if (html5fs.files[i][0]==kdb.filename) return false;
			}
			return true;
		},this);
		return missing;
	},
	getRemoteUrl:function(fn) {
		var f=this.props.needed.filter(function(f){return f.filename==fn});
		if (f.length ) return f[0].url;
	},
	genFileList:function(existing,missing){
		var out=[];
		for (var i in existing) {
			var url=this.getRemoteUrl(existing[i][0]);
			out.push({filename:existing[i][0], url :url, ready:true });
		}
		for (var i in missing) {
			out.push(missing[i]);
		}
		return out;
	},
	reload:function() {
		html5fs.readdir(function(files){
  			this.setState({files:this.genFileList(files,this.missingKdb())});
  		},this);
	 },
	deleteFile:function(fn) {
	  html5fs.rm(fn,function(){
	  	this.reload();
	  },this);
	},
	onQuoteOk:function(quota,usage) {
		if (ksanagap.platform!="chrome") {
			//console.log("onquoteok");
			this.setState({noupdate:true,missing:[],files:[],autoclose:true
				,quota:quota,remain:quota-usage,usage:usage});
			return;
		}
		//console.log("quote ok");
		var files=this.genFileList(html5fs.files,this.missingKdb());
		var that=this;
		that.checkIfUpdate(files,function(hasupdate) {
			var missing=this.missingKdb();
			var autoclose=this.props.autoclose;
			if (missing.length) autoclose=false;
			that.setState({autoclose:autoclose,
				quota:quota,usage:usage,files:files,
				missing:missing,
				noupdate:!hasupdate,
				remain:quota-usage});
		});
	},  
	onBrowserOk:function() {
	  this.totalDownloadSize();
	}, 
	dismiss:function() {
		this.props.onReady(this.state.usage,this.state.quota);
		setTimeout(function(){
			var modalin=$(".modal.in");
			if (modalin.modal) modalin.modal('hide');
		},500);
	}, 
	totalDownloadSize:function() {
		var files=this.missingKdb();
		var taskqueue=[],totalsize=0;
		for (var i=0;i<files.length;i++) {
			taskqueue.push(
				(function(idx){
					return (function(data){
						if (!(typeof data=='object' && data.__empty)) totalsize+=data;
						html5fs.getDownloadSize(files[idx].url,taskqueue.shift());
					});
				})(i)
			);
		}
		var that=this;
		taskqueue.push(function(data){	
			totalsize+=data;
			setTimeout(function(){that.setState({requireSpace:totalsize,browserReady:true})},0);
		});
		taskqueue.shift()({__empty:true});
	},
	checkIfUpdate:function(files,cb) {
		var taskqueue=[];
		for (var i=0;i<files.length;i++) {
			taskqueue.push(
				(function(idx){
					return (function(data){
						if (!(typeof data=='object' && data.__empty)) files[idx-1].hasUpdate=data;
						html5fs.checkUpdate(files[idx].url,files[idx].filename,taskqueue.shift());
					});
				})(i)
			);
		}
		var that=this;
		taskqueue.push(function(data){	
			if (files.length) files[files.length-1].hasUpdate=data;
			var hasupdate=files.some(function(f){return f.hasUpdate});
			if (cb) cb.apply(that,[hasupdate]);
		});
		taskqueue.shift()({__empty:true});
	},
	render:function(){
    		if (!this.state.browserReady) {   
      			return E(CheckBrowser, {feature: "fs", onReady: this.onBrowserOk})
    		} if (!this.state.quota || this.state.remain<this.state.requireSpace) {  
    			var quota=this.state.requestQuota;
    			if (this.state.usage+this.state.requireSpace>quota) {
    				quota=(this.state.usage+this.state.requireSpace)*1.5;
    			}
      			return E(HtmlFS, {quota: quota, autoclose: "true", onReady: this.onQuoteOk})
      		} else {
			if (!this.state.noupdate || this.missingKdb().length || !this.state.autoclose) {
				var remain=Math.round((this.state.usage/this.state.quota)*100);				
				return E(FileList, {action: this.action, files: this.state.files, remainPercent: remain})
			} else {
				setTimeout( this.dismiss ,0);
				return E("span", null, "Success");
			}
      		}
	},
	action:function() {
	  var args = Array.prototype.slice.call(arguments);
	  var type=args.shift();
	  var res=null, that=this;
	  if (type=="delete") {
	    this.deleteFile(args[0]);
	  }  else if (type=="reload") {
	  	this.reload();
	  } else if (type=="dismiss") {
	  	this.dismiss();
	  }
	}
});

module.exports=Filemanager;
},{"./checkbrowser":"d:\\ksana2015\\node_modules\\ksana2015-webruntime\\checkbrowser.js","./html5fs":"d:\\ksana2015\\node_modules\\ksana2015-webruntime\\html5fs.js","./htmlfs":"d:\\ksana2015\\node_modules\\ksana2015-webruntime\\htmlfs.js","react":"react"}],"d:\\ksana2015\\node_modules\\ksana2015-webruntime\\html5fs.js":[function(require,module,exports){
/* emulate filesystem on html5 browser */
var get_head=function(url,field,cb){
	var xhr = new XMLHttpRequest();
	xhr.open("HEAD", url, true);
	xhr.onreadystatechange = function() {
			if (this.readyState == this.DONE) {
				cb(xhr.getResponseHeader(field));
			} else {
				if (this.status!==200&&this.status!==206) {
					cb("");
				}
			}
	};
	xhr.send();
}
var get_date=function(url,cb) {
	get_head(url,"Last-Modified",function(value){
		cb(value);
	});
}
var get_size=function(url, cb) {
	get_head(url,"Content-Length",function(value){
		cb(parseInt(value));
	});
};
var checkUpdate=function(url,fn,cb) {
	if (!url) {
		cb(false);
		return;
	}
	get_date(url,function(d){
		API.fs.root.getFile(fn, {create: false, exclusive: false}, function(fileEntry) {
			fileEntry.getMetadata(function(metadata){
				var localDate=Date.parse(metadata.modificationTime);
				var urlDate=Date.parse(d);
				cb(urlDate>localDate);
			});
		},function(){
			cb(false);
		});
	});
}
var download=function(url,fn,cb,statuscb,context) {
	 var totalsize=0,batches=null,written=0;
	 var fileEntry=0, fileWriter=0;
	 var createBatches=function(size) {
		var bytes=1024*1024, out=[];
		var b=Math.floor(size / bytes);
		var last=size %bytes;
		for (var i=0;i<=b;i++) {
			out.push(i*bytes);
		}
		out.push(b*bytes+last);
		return out;
	 }
	 var finish=function() {
		 rm(fn,function(){
				fileEntry.moveTo(fileEntry.filesystem.root, fn,function(){
					setTimeout( cb.bind(context,false) , 0) ;
				},function(e){
					console.log("failed",e)
				});
		 },this);
	 };
		var tempfn="temp.kdb";
		var batch=function(b) {
		var abort=false;
		var xhr = new XMLHttpRequest();
		var requesturl=url+"?"+Math.random();
		xhr.open('get', requesturl, true);
		xhr.setRequestHeader('Range', 'bytes='+batches[b]+'-'+(batches[b+1]-1));
		xhr.responseType = 'blob';
		xhr.addEventListener('load', function() {
			var blob=this.response;
			fileEntry.createWriter(function(fileWriter) {
				fileWriter.seek(fileWriter.length);
				fileWriter.write(blob);
				written+=blob.size;
				fileWriter.onwriteend = function(e) {
					if (statuscb) {
						abort=statuscb.apply(context,[ fileWriter.length / totalsize,totalsize ]);
						if (abort) setTimeout( cb.bind(context,false) , 0) ;
				 	}
					b++;
					if (!abort) {
						if (b<batches.length-1) setTimeout(batch.bind(context,b),0);
						else                    finish();
				 	}
			 	};
			}, console.error);
		},false);
		xhr.send();
	}

	get_size(url,function(size){
		totalsize=size;
		if (!size) {
			if (cb) cb.apply(context,[false]);
		} else {//ready to download
			rm(tempfn,function(){
				 batches=createBatches(size);
				 if (statuscb) statuscb.apply(context,[ 0, totalsize ]);
				 API.fs.root.getFile(tempfn, {create: 1, exclusive: false}, function(_fileEntry) {
							fileEntry=_fileEntry;
						batch(0);
				 });
			},this);
		}
	});
}

var readFile=function(filename,cb,context) {
	API.fs.root.getFile(filename, {create: false, exclusive: false},function(fileEntry) {
		fileEntry.file(function(file){
			var reader = new FileReader();
			reader.onloadend = function(e) {
				if (cb) cb.call(cb,this.result);
			};
			reader.readAsText(file,"utf8");
		});
	}, console.error);
}

function createDir(rootDirEntry, folders,  cb) {
  // Throw out './' or '/' and move on to prevent something like '/foo/.//bar'.
  if (folders[0] == '.' || folders[0] == '') {
    folders = folders.slice(1);
  }
  rootDirEntry.getDirectory(folders[0], {create: true}, function(dirEntry) {
    // Recursively add the new subfolder (if we still have another to create).
    if (folders.length) {
      createDir(dirEntry, folders.slice(1),cb);
    } else {
			cb();
		}
  }, cb);
};


var writeFile=function(filename,buf,cb,context){
	var write=function(fileEntry){
		fileEntry.createWriter(function(fileWriter) {
			fileWriter.write(buf);
			fileWriter.onwriteend = function(e) {
				if (cb) cb.apply(cb,[buf.byteLength]);
			};
		}, console.error);
	}

	var getFile=function(filename){
		API.fs.root.getFile(filename, {exclusive:true}, function(fileEntry) {
			write(fileEntry);
		}, function(){
				API.fs.root.getFile(filename, {create:true,exclusive:true}, function(fileEntry) {
					write(fileEntry);
				});

		});
	}
	var slash=filename.lastIndexOf("/");
	if (slash>-1) {
		createDir(API.fs.root, filename.substr(0,slash).split("/"),function(){
			getFile(filename);
		});
	} else {
		getFile(filename);
	}
}

var readdir=function(cb,context) {
	var dirReader = API.fs.root.createReader();
	var out=[],that=this;
	dirReader.readEntries(function(entries) {
		if (entries.length) {
			for (var i = 0, entry; entry = entries[i]; ++i) {
				if (entry.isFile) {
					out.push([entry.name,entry.toURL ? entry.toURL() : entry.toURI()]);
				}
			}
		}
		API.files=out;
		if (cb) cb.apply(context,[out]);
	}, function(){
		if (cb) cb.apply(context,[null]);
	});
}
var getFileURL=function(filename) {
	if (!API.files ) return null;
	var file= API.files.filter(function(f){return f[0]==filename});
	if (file.length) return file[0][1];
}
var rm=function(filename,cb,context) {
	var url=getFileURL(filename);
	if (url) rmURL(url,cb,context);
	else if (cb) cb.apply(context,[false]);
}

var rmURL=function(filename,cb,context) {
	webkitResolveLocalFileSystemURL(filename, function(fileEntry) {
		fileEntry.remove(function() {
			if (cb) cb.apply(context,[true]);
		}, console.error);
	},  function(e){
		if (cb) cb.apply(context,[false]);//no such file
	});
}
function errorHandler(e) {
	console.error('Error: ' +e.name+ " "+e.message);
}
var initfs=function(grantedBytes,cb,context) {
	webkitRequestFileSystem(PERSISTENT, grantedBytes,  function(fs) {
		API.fs=fs;
		API.quota=grantedBytes;
		readdir(function(){
			API.initialized=true;
			cb.apply(context,[grantedBytes,fs]);
		},context);
	}, errorHandler);
}
var init=function(quota,cb,context) {
	navigator.webkitPersistentStorage.requestQuota(quota,
			function(grantedBytes) {
				initfs(grantedBytes,cb,context);
		}, errorHandler
	);
}
var queryQuota=function(cb,context) {
	var that=this;
	navigator.webkitPersistentStorage.queryUsageAndQuota(
	 function(usage,quota){
			initfs(quota,function(){
				cb.apply(context,[usage,quota]);
			},context);
	});
}
var API={
	init:init
	,readdir:readdir
	,checkUpdate:checkUpdate
	,rm:rm
	,rmURL:rmURL
	,getFileURL:getFileURL
	,writeFile:writeFile
	,readFile:readFile
	,download:download
	,get_head:get_head
	,get_date:get_date
	,get_size:get_size
	,getDownloadSize:get_size
	,queryQuota:queryQuota
}
module.exports=API;

},{}],"d:\\ksana2015\\node_modules\\ksana2015-webruntime\\htmlfs.js":[function(require,module,exports){
var html5fs=require("./html5fs");
var React=(window&&window.React)||require("react");
var E=React.createElement;

var htmlfs = React.createClass({
	getInitialState:function() { 
		return {ready:false, quota:0,usage:0,Initialized:false,autoclose:this.props.autoclose};
	},
	initFilesystem:function() {
		var quota=this.props.quota||1024*1024*128; // default 128MB
		quota=parseInt(quota);
		html5fs.init(quota,function(q){
			this.dialog=false;
			$(this.refs.dialog1.getDOMNode()).modal('hide');
			this.setState({quota:q,autoclose:true});
		},this);
	},
	welcome:function() {
		return (
		E("div", {ref: "dialog1", className: "modal fade", id: "myModal", "data-backdrop": "static"}, 
		    E("div", {className: "modal-dialog"}, 
		      E("div", {className: "modal-content"}, 
		        E("div", {className: "modal-header"}, 
		          E("h4", {className: "modal-title"}, "Welcome")
		        ), 
		        E("div", {className: "modal-body"}, 
		          "Browser will ask for your confirmation."
		        ), 
		        E("div", {className: "modal-footer"}, 
		          E("button", {onClick: this.initFilesystem, type: "button", 
		            className: "btn btn-primary"}, "Initialize File System")
		        )
		      )
		    )
		  )
		 );
	},
	renderDefault:function(){
		var used=Math.floor(this.state.usage/this.state.quota *100);
		var more=function() {
			if (used>50) return E("button", {type: "button", className: "btn btn-primary"}, "Allocate More");
			else null;
		}
		return (
		E("div", {ref: "dialog1", className: "modal fade", id: "myModal", "data-backdrop": "static"}, 
		    E("div", {className: "modal-dialog"}, 
		      E("div", {className: "modal-content"}, 
		        E("div", {className: "modal-header"}, 
		          E("h4", {className: "modal-title"}, "Sandbox File System")
		        ), 
		        E("div", {className: "modal-body"}, 
		          E("div", {className: "progress"}, 
		            E("div", {className: "progress-bar", role: "progressbar", style: {width: used+"%"}}, 
		               used, "%"
		            )
		          ), 
		          E("span", null, this.state.quota, " total , ", this.state.usage, " in used")
		        ), 
		        E("div", {className: "modal-footer"}, 
		          E("button", {onClick: this.dismiss, type: "button", className: "btn btn-default", "data-dismiss": "modal"}, "Close"), 
		          more()
		        )
		      )
		    )
		  )
		  );
	},
	dismiss:function() {
		var that=this;
		setTimeout(function(){
			that.props.onReady(that.state.quota,that.state.usage);	
		},0);
	},
	queryQuota:function() {
		if (ksanagap.platform=="chrome") {
			html5fs.queryQuota(function(usage,quota){
				this.setState({usage:usage,quota:quota,initialized:true});
			},this);			
		} else {
			this.setState({usage:333,quota:1000*1000*1024,initialized:true,autoclose:true});
		}
	},
	render:function() {
		var that=this;
		if (!this.state.quota || this.state.quota<this.props.quota) {
			if (this.state.initialized) {
				this.dialog=true;
				return this.welcome();	
			} else {
				return E("span", null, "checking quota");
			}			
		} else {
			if (!this.state.autoclose) {
				this.dialog=true;
				return this.renderDefault(); 
			}
			this.dismiss();
			this.dialog=false;
			return null;
		}
	},
	componentDidMount:function() {
		if (!this.state.quota) {
			this.queryQuota();

		};
	},
	componentDidUpdate:function() {
		if (this.dialog) $(this.refs.dialog1.getDOMNode()).modal('show');
	}
});

module.exports=htmlfs;
},{"./html5fs":"d:\\ksana2015\\node_modules\\ksana2015-webruntime\\html5fs.js","react":"react"}],"d:\\ksana2015\\node_modules\\ksana2015-webruntime\\index.js":[function(require,module,exports){
var ksana={"platform":"remote"};
if (typeof window!="undefined") {
	window.ksana=ksana;
	if (typeof ksanagap=="undefined") {
		window.ksanagap=require("./ksanagap"); //compatible layer with mobile
	}
}
if (typeof process !="undefined") {
	if (process.versions && process.versions["node-webkit"]) {
  		if (typeof nodeRequire!="undefined") ksana.require=nodeRequire;
  		ksana.platform="node-webkit";
  		window.ksanagap.platform="node-webkit";
		var ksanajs=require("fs").readFileSync("ksana.js","utf8").trim();
		ksana.js=JSON.parse(ksanajs.substring(14,ksanajs.length-1));
		window.kfs=require("./kfs");
  	}
} else if (typeof chrome!="undefined"){//} && chrome.fileSystem){
//	window.ksanagap=require("./ksanagap"); //compatible layer with mobile
	window.ksanagap.platform="chrome";
	window.kfs=require("./kfs_html5");
	if(window.location.origin.indexOf("//127.0.0.1")>-1) {
		require("./livereload")();
	}
	ksana.platform="chrome";
} else {
	if (typeof ksanagap!="undefined" && typeof fs!="undefined") {//mobile
		var ksanajs=fs.readFileSync("ksana.js","utf8").trim(); //android extra \n at the end
		ksana.js=JSON.parse(ksanajs.substring(14,ksanajs.length-1));
		ksana.platform=ksanagap.platform;
		if (typeof ksanagap.android !="undefined") {
			ksana.platform="android";
		}
	}
}
var timer=null;
var React=window.React||require("react");
var boot=function(appId,cb) {
	if (typeof React!="undefined") {
		React.initializeTouchEvents(true);
	}
	ksana.appId=appId;
	if (ksanagap.platform=="chrome") { //need to wait for jsonp ksana.js
		timer=setInterval(function(){
			if (ksana.ready){
				clearInterval(timer);
				if (ksana.js && ksana.js.files && ksana.js.files.length) {
					require("./installkdb")(ksana.js,cb);
				} else {
					cb();		
				}
			}
		},300);
	} else {
		cb();
	}
}

module.exports={boot:boot
	,htmlfs:require("./htmlfs")
	,html5fs:require("./html5fs")
	,liveupdate:require("./liveupdate")
	,fileinstaller:require("./fileinstaller")
	,downloader:require("./downloader")
	,installkdb:require("./installkdb")
};
},{"./downloader":"d:\\ksana2015\\node_modules\\ksana2015-webruntime\\downloader.js","./fileinstaller":"d:\\ksana2015\\node_modules\\ksana2015-webruntime\\fileinstaller.js","./html5fs":"d:\\ksana2015\\node_modules\\ksana2015-webruntime\\html5fs.js","./htmlfs":"d:\\ksana2015\\node_modules\\ksana2015-webruntime\\htmlfs.js","./installkdb":"d:\\ksana2015\\node_modules\\ksana2015-webruntime\\installkdb.js","./kfs":"d:\\ksana2015\\node_modules\\ksana2015-webruntime\\kfs.js","./kfs_html5":"d:\\ksana2015\\node_modules\\ksana2015-webruntime\\kfs_html5.js","./ksanagap":"d:\\ksana2015\\node_modules\\ksana2015-webruntime\\ksanagap.js","./livereload":"d:\\ksana2015\\node_modules\\ksana2015-webruntime\\livereload.js","./liveupdate":"d:\\ksana2015\\node_modules\\ksana2015-webruntime\\liveupdate.js","fs":false,"react":"react"}],"d:\\ksana2015\\node_modules\\ksana2015-webruntime\\installkdb.js":[function(require,module,exports){
var React=(window&&window.React)||require("react");
var Fileinstaller=require("./fileinstaller");

var getRequire_kdb=function() {
    var required=[];
    ksana.js.files.map(function(f){
      if (f.indexOf(".kdb")==f.length-4) {
        var slash=f.lastIndexOf("/");
        if (slash>-1) {
          var dbid=f.substring(slash+1,f.length-4);
          required.push({url:f,dbid:dbid,filename:dbid+".kdb"});
        } else {
          var dbid=f.substring(0,f.length-4);
          required.push({url:ksana.js.baseurl+f,dbid:dbid,filename:f});
        }        
      }
    });
    return required;
}
var callback=null;
var onReady=function() {
	callback();
}
var openFileinstaller=function(keep) {
	var require_kdb=getRequire_kdb().map(function(db){
	  return {
	    url:window.location.origin+window.location.pathname+db.dbid+".kdb",
	    dbdb:db.dbid,
	    filename:db.filename
	  }
	})
	return React.createElement(Fileinstaller, {quota: "512M", autoclose: !keep, needed: require_kdb, 
	                 onReady: onReady});
}
var installkdb=function(ksanajs,cb,context) {
	React.render(openFileinstaller(),document.getElementById("main"));
	callback=cb;
}
module.exports=installkdb;
},{"./fileinstaller":"d:\\ksana2015\\node_modules\\ksana2015-webruntime\\fileinstaller.js","react":"react"}],"d:\\ksana2015\\node_modules\\ksana2015-webruntime\\kfs.js":[function(require,module,exports){
//Simulate feature in ksanagap
/* 
  runs on node-webkit only
*/

var readDir=function(path) { //simulate Ksanagap function
	var fs=nodeRequire("fs");
	path=path||"..";
	var dirs=[];
	if (path[0]==".") {
		if (path==".") dirs=fs.readdirSync(".");
		else {
			dirs=fs.readdirSync("..");
		}
	} else {
		dirs=fs.readdirSync(path);
	}

	return dirs.join("\uffff");
}
var listApps=function() {

	var fs=nodeRequire("fs");
	var ksanajsfile=function(d) {return "../"+d+"/ksana.js"};
	var dirs=fs.readdirSync("..").filter(function(d){
				return fs.statSync("../"+d).isDirectory() && d[0]!="."
				   && fs.existsSync(ksanajsfile(d));
	});
	
	var out=dirs.map(function(d){

		var fn=ksanajsfile(d);
		if (!fs.existsSync(fn)) return;
		var content=fs.readFileSync(fn,"utf8");
  		content=content.replace("})","}");
  		content=content.replace("jsonp_handler(","");
  		try{
  			var obj= JSON.parse(content);
			obj.dbid=d;
			obj.path=d;
			return obj;
  		} catch(e) {
  			console.log(e);
  			return null;
  		}
	});

	out=out.filter(function(o){return !!o});
	return JSON.stringify(out);
}



var kfs={readDir:readDir,listApps:listApps};

module.exports=kfs;
},{}],"d:\\ksana2015\\node_modules\\ksana2015-webruntime\\kfs_html5.js":[function(require,module,exports){
var readDir=function(){
	return "[]";
}
var listApps=function(){
	return "[]";
}
module.exports={readDir:readDir,listApps:listApps};
},{}],"d:\\ksana2015\\node_modules\\ksana2015-webruntime\\ksanagap.js":[function(require,module,exports){
var appname="installer";
var switchApp=function(path) {
	var fs=require("fs");
	path="../"+path;
	appname=path;
	document.location.href= path+"/index.html"; 
	process.chdir(path);
}
var downloader={};
var rootPath="";

var deleteApp=function(app) {
	console.error("not allow on PC, do it in File Explorer/ Finder");
}
var username=function() {
	return "";
}
var useremail=function() {
	return ""
}
var runtime_version=function() {
	return "1.4";
}

//copy from liveupdate
var jsonp=function(url,dbid,callback,context) {
  var script=document.getElementById("jsonp2");
  if (script) {
    script.parentNode.removeChild(script);
  }
  window.jsonp_handler=function(data) {
    if (typeof data=="object") {
      data.dbid=dbid;
      callback.apply(context,[data]);    
    }  
  }
  window.jsonp_error_handler=function() {
    console.error("url unreachable",url);
    callback.apply(context,[null]);
  }
  script=document.createElement('script');
  script.setAttribute('id', "jsonp2");
  script.setAttribute('onerror', "jsonp_error_handler()");
  url=url+'?'+(new Date().getTime());
  script.setAttribute('src', url);
  document.getElementsByTagName('head')[0].appendChild(script); 
}

var ksanagap={
	platform:"node-webkit",
	startDownload:downloader.startDownload,
	downloadedByte:downloader.downloadedByte,
	downloadingFile:downloader.downloadingFile,
	cancelDownload:downloader.cancelDownload,
	doneDownload:downloader.doneDownload,
	switchApp:switchApp,
	rootPath:rootPath,
	deleteApp: deleteApp,
	username:username, //not support on PC
	useremail:username,
	runtime_version:runtime_version,
	
}

if (typeof process!="undefined" && !process.browser) {
	var ksanajs=require("fs").readFileSync("./ksana.js","utf8").trim();
	downloader=require("./downloader");
	//ksana.js=JSON.parse(ksanajs.substring(14,ksanajs.length-1));
	rootPath=process.cwd();
	rootPath=require("path").resolve(rootPath,"..").replace(/\\/g,"/")+'/';
	ksana.ready=true;
} else{
	var url=window.location.origin+window.location.pathname.replace("index.html","")+"ksana.js";
	jsonp(url,appname,function(data){
		ksana.js=data;
		ksana.ready=true;
	});
}
module.exports=ksanagap;
},{"./downloader":"d:\\ksana2015\\node_modules\\ksana2015-webruntime\\downloader.js","fs":false,"path":false}],"d:\\ksana2015\\node_modules\\ksana2015-webruntime\\livereload.js":[function(require,module,exports){
var started=false;
var timer=null;
var bundledate=null;
var get_date=require("./html5fs").get_date;
var checkIfBundleUpdated=function() {
	get_date("bundle.js",function(date){
		if (bundledate &&bundledate!=date){
			location.reload();
		}
		bundledate=date;
	});
}
var livereload=function() {
	if (started) return;

	timer1=setInterval(function(){
		checkIfBundleUpdated();
	},2000);
	started=true;
}

module.exports=livereload;
},{"./html5fs":"d:\\ksana2015\\node_modules\\ksana2015-webruntime\\html5fs.js"}],"d:\\ksana2015\\node_modules\\ksana2015-webruntime\\liveupdate.js":[function(require,module,exports){

var jsonp=function(url,dbid,callback,context) {
  var script=document.getElementById("jsonp");
  if (script) {
    script.parentNode.removeChild(script);
  }
  if (typeof dbid=="function") {
    context=callback;
    callback=dbid;
    dbid="";
  }
  window.jsonp_handler=function(data) {
    //console.log("receive from ksana.js",data);
    if (typeof data=="object" && dbid) {
      if (typeof data.dbid=="undefined") {
        data.dbid=dbid;
      }
    }
    callback.apply(context,[data]);
  }

  window.jsonp_error_handler=function() {
    console.error("url unreachable",url);
    callback.apply(context,[null]);
  }

  script=document.createElement('script');
  script.setAttribute('id', "jsonp");
  script.setAttribute('onerror', "jsonp_error_handler()");
  url=url+'?'+(new Date().getTime());
  script.setAttribute('src', url);
  document.getElementsByTagName('head')[0].appendChild(script); 
}
var runtime_version_ok=function(minruntime) {
  if (!minruntime) return true;//not mentioned.
  var min=parseFloat(minruntime);
  var runtime=parseFloat( ksanagap.runtime_version()||"1.0");
  if (min>runtime) return false;
  return true;
}

var needToUpdate=function(fromjson,tojson) {
  var needUpdates=[];
  for (var i=0;i<fromjson.length;i++) { 
    var to=tojson[i];
    var from=fromjson[i];
    var newfiles=[],newfilesizes=[],removed=[];
    
    if (!to || !to.files) continue; //cannot reach host
    if (!runtime_version_ok(to.minruntime)) {
      console.warn("runtime too old, need "+to.minruntime);
      continue; 
    }
    if (!from.filedates) {
      console.warn("missing filedates in ksana.js of "+from.dbid);
      continue;
    }
    from.filedates.map(function(f,idx){
      var newidx=to.files.indexOf( from.files[idx]);
      if (newidx==-1) {
        //file removed in new version
        removed.push(from.files[idx]);
      } else {
        var fromdate=Date.parse(f);
        var todate=Date.parse(to.filedates[newidx]);
        if (fromdate<todate) {
          newfiles.push( to.files[newidx] );
          newfilesizes.push(to.filesizes[newidx]);
        }        
      }
    });
    if (newfiles.length) {
      from.newfiles=newfiles;
      from.newfilesizes=newfilesizes;
      from.removed=removed;
      needUpdates.push(from);
    }
  }
  return needUpdates;
}
var getUpdatables=function(apps,cb,context) {
  getRemoteJson(apps,function(jsons){
    var hasUpdates=needToUpdate(apps,jsons);
    cb.apply(context,[hasUpdates]);
  },context);
}
var getRemoteJson=function(apps,cb,context) {
  var taskqueue=[],output=[];
  var makecb=function(app){
    return function(data){
        if (!(data && typeof data =='object' && data.__empty)) output.push(data);
        if (!app.baseurl) {
          taskqueue.shift({__empty:true});
        } else {
          var url=app.baseurl+"/ksana.js";
          try {
            jsonp( url ,app.dbid,taskqueue.shift(), context);             
          } catch(e) {
            console.log(e);
            taskqueue.shift({__empty:true});
          }
        }
    };
  };
  apps.forEach(function(app){taskqueue.push(makecb(app))});

  taskqueue.push(function(data){
    output.push(data);
    cb.apply(context,[output]);
  });

  taskqueue.shift()({__empty:true}); //run the task
}
var humanFileSize=function(bytes, si) {
    var thresh = si ? 1000 : 1024;
    if(bytes < thresh) return bytes + ' B';
    var units = si ? ['kB','MB','GB','TB','PB','EB','ZB','YB'] : ['KiB','MiB','GiB','TiB','PiB','EiB','ZiB','YiB'];
    var u = -1;
    do {
        bytes /= thresh;
        ++u;
    } while(bytes >= thresh);
    return bytes.toFixed(1)+' '+units[u];
};
var humanDate=function(datestring) {
    var d=Date.parse(datestring);
    if (isNaN(d)) {
      return "invalid date";
    } else {
      return new Date(d).toLocaleString();
    }
}
var start=function(ksanajs,cb,context){
  var files=ksanajs.newfiles||ksanajs.files;
  var baseurl=ksanajs.baseurl|| "http://127.0.0.1:8080/"+ksanajs.dbid+"/";
  var started=ksanagap.startDownload(ksanajs.dbid,baseurl,files.join("\uffff"));
  cb.apply(context,[started]);
}
var status=function(){
  var nfile=ksanagap.downloadingFile();
  var downloadedByte=ksanagap.downloadedByte();
  var done=ksanagap.doneDownload();
  return {nfile:nfile,downloadedByte:downloadedByte, done:done};
}

var cancel=function(){
  return ksanagap.cancelDownload();
}

var liveupdate={ humanFileSize: humanFileSize, humanDate:humanDate,
  needToUpdate: needToUpdate , jsonp:jsonp, 
  getUpdatables:getUpdatables,
  start:start,
  cancel:cancel,
  status:status
  };
module.exports=liveupdate;
},{}],"d:\\ksana2015\\node_modules\\ksana2015-webruntime\\mkdirp.js":[function(require,module,exports){
function mkdirP (p, mode, f, made) {
     var path = nodeRequire('path');
     var fs = nodeRequire('fs');
	
    if (typeof mode === 'function' || mode === undefined) {
        f = mode;
        mode = 0x1FF & (~process.umask());
    }
    if (!made) made = null;

    var cb = f || function () {};
    if (typeof mode === 'string') mode = parseInt(mode, 8);
    p = path.resolve(p);

    fs.mkdir(p, mode, function (er) {
        if (!er) {
            made = made || p;
            return cb(null, made);
        }
        switch (er.code) {
            case 'ENOENT':
                mkdirP(path.dirname(p), mode, function (er, made) {
                    if (er) cb(er, made);
                    else mkdirP(p, mode, cb, made);
                });
                break;

            // In the case of any other error, just see if there's a dir
            // there already.  If so, then hooray!  If not, then something
            // is borked.
            default:
                fs.stat(p, function (er2, stat) {
                    // if the stat fails, then that's super weird.
                    // let the original error be the failure reason.
                    if (er2 || !stat.isDirectory()) cb(er, made)
                    else cb(null, made);
                });
                break;
        }
    });
}

mkdirP.sync = function sync (p, mode, made) {
    var path = nodeRequire('path');
    var fs = nodeRequire('fs');
    if (mode === undefined) {
        mode = 0x1FF & (~process.umask());
    }
    if (!made) made = null;

    if (typeof mode === 'string') mode = parseInt(mode, 8);
    p = path.resolve(p);

    try {
        fs.mkdirSync(p, mode);
        made = made || p;
    }
    catch (err0) {
        switch (err0.code) {
            case 'ENOENT' :
                made = sync(path.dirname(p), mode, made);
                sync(p, mode, made);
                break;

            // In the case of any other error, just see if there's a dir
            // there already.  If so, then hooray!  If not, then something
            // is borked.
            default:
                var stat;
                try {
                    stat = fs.statSync(p);
                }
                catch (err1) {
                    throw err0;
                }
                if (!stat.isDirectory()) throw err0;
                break;
        }
    }

    return made;
};

module.exports = mkdirP.mkdirp = mkdirP.mkdirP = mkdirP;

},{}]},{},["d:\\ksana2015\\ketaka\\index.js"])


//# sourceMappingURL=bundle.js.map