# contextmenu_tibetan.jsx

# changes:

clearMarkups()

增加對pouchDB的操作

    //取得server ip
    var ip = location.host.split(":")[0]; 
	//指定pouchdb 宣告
	var db =  new PouchDB('http://'+ip+':5984/'+filename);
	//將doc 的id 轉為指定字串型態
	var docid = filename+"_"+author+"_"+this.__markups__()[i].start;
	//見persistentmarkup_pouchdb說明文件
	pouch.removetopouch(db,docid);
	}
	
addMarkups()

修改為讀取pouchdb格式

    m=markups[i];  → m=markups[i].doc;
	
加入_rev屬性讓pouchdb可以修改doc

	m.payload._rev = markups[i].doc._rev; 

*pouchdb每個doc都需擁有_id,以及_rev才能對其修改與刪除