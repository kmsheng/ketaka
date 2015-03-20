# persistentmarkup_pouchdb.js

pouchDB api 參照 pouchDB官方網頁 (http://pouchdb.com/api.html)

# adds

savetopouch(db,data,cb)

儲存單個doc至指定db

savealltopouch(db,data,cb)

儲存多個doc至指定db，當db內存在該doc，則更新doc內資訊

readfrompouch(db,data,cb,state,data2)

從指定db讀取指定_id(data)的doc
<P>
當state = 0 回傳 doc內容 <br />
  state = 1 回傳 讀取狀態 (error message) <br />
  state	= 2 更新該doc內容為data2<br />
</P>
readallfrompouch(db,cb,state)

從指定db讀取所有的doc
<P>
當state = 0 回傳 讀取狀態 (error message)<br />
  state = 1 回傳所有doc內容<br />
  state	= 2 將callback function執行結果回傳<br />
</P>
removetopouch(db,data)

刪除指定db的doc

