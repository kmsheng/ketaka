# docview_tibetan.jsx

# adds:

saveMarkuptoPouchdb(filename,markups)

將markups轉型儲存至pouchdb內

	//取得server ip
	var ip = location.host.split(":")[0];
	//取得dbname
    dbname=this.props.project.name+dbname.substring(4,dbname.length);
	//指定pouchdb 宣告
    var db = new PouchDB('http://'+ip+':5984/'+dbname);
	//這邊計算如果markups數量為0且pouchdb內也為0則刪除db
    if (markups.length == 0)
    {
       pouch.readallfrompouch(db,this.showmessage,1);
    }
	//當markups不為0則將資料轉型並儲存在pouchdb中
    else if(markups.length != 0){
    for(var i=0;i<markups.length;i++)
    {
      markups[i]._id=dbname+"_"+markups[i].payload.author+"_"+markups[i].start;
      markups[i].pageid=this.state.pageid;
      markups[i]._rev = markups[i].payload._rev;
    }
    pouch.savealltopouch(db,markups,this.showmessage);
	
markups 結構

    _id        : bambo名稱_作者_markup位置
    _rev       : pouchdb給予
    start      : markup位置
    len        : markup長度
    pageid     : markup所在頁碼
   
    //以下包在payload內
    type       : markup類別
    author     : 作者
    text       : suggestion 內容
    reason     : reason 內容
    state      : markup狀態
    contributor: 原作者
	
showmessage(err) & getAlert()

判斷pouchdb回傳的error message顯示對應資訊

	handsavestate = true 表示使用者點選Save button 則會依 err 的內容來判斷是否儲存成功
	綠色 saved successfully 表示儲存至pouchDB 成功
	紅色 saved failed       表示儲存失敗
	
change_suggests(markups,type)

改變suggest的型態，當markup被cheif approve或reject後改變該markup的state
使proof reader能得到對應的回饋

action=handsavemarkup

當使用者選擇save按鈕儲存時觸發

cancel_markup()

刪除pouchdb中指定的markup

getMarkupsformpouch(res)

從pouchdb中讀取markup

watch_suggest()

找尋並計錄指定的markup
當身分為chief，則尋找未被自己suggest與reject過的markup
當身分為proof reader，則尋找自己做過的suggestion

find_otherpage(direction,pid,arr,data) 

找尋並整理前後頁面的markup
	
	direction : 前(previous)/後(next)頁
	pid       : 當前page的頁碼
	arr       : 整理過擁有指定markup陣列
	data      : 當前doc內容
	
getPadding()

取得當前解析度時圖片所佔的高度


# changes:

action=removemarkup 

增加對pouchdb的操作

action=nextMistake

當markup不為第一個與最後一個時增加對翻頁尋找markups的操作

componentDidMount()

功能移置getMarkups()且增加對pouchdb的操作

