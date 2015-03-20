# projectlist.jsx

# changes

UI修改，移除buildindex()

openproject()

增加對當前狀態的判斷，如果狀態為新增/修改project則不執行


# adds

增加add(edit) project UI

addproject()

開啟add project UI介面

editproject() & getAllusers(res)

將pouchDB account中的user讀出來依照chief與proof reader分類

canceledit()

新增/編輯時點擊取消按鈕回到原本的狀態

confirm()

點擊確認後將選取的chief與proof reader選項轉換為字串

	project_info[0].ce = $('.btn-group2 > .btn.active').text();
    //將所有所選取的chief轉換為字串存放在ce裡

tomyArray(str,del)

將字串轉換為陣列

tomyString(data)

將陣列轉換為字串
	
check_photo()

當user沒有上傳照片時顯示預設圖示

saveproject(ce,pr,pj)

將dbname,desc,chief,proofreader等資訊存放在pouchdb的project裡

saveprojectstate(data)

將資訊暫存到目前的state中

check_project()

從punchdb的projcet中載入對應kdb的dbname,desc,chief,proofreader等資訊

change_projname(res)

將原本顯示的kdb name 置換為 pouchdb的projcet中載入的dbname

check_user() & splituserlist(res)

檢查當前登入者的權限，若不在該project的chief&proofreader列表中則顯示You havent been asign in this project.訊息

addnewproject(ce,pr,pj) & writetodb(dbname,todo)

將新增的project內容dbname,desc,chief,proofreader等資訊存放在pouchdb的project與kdbs裡

member_list(data,status)

將暫存的chief與proof reader資料轉換為按鈕圖示

showadd() & editbutton()

當登入使用者身分為admin則顯示新增/修改project按鈕
