# main.jsx

#changes

移除全部有關auxs的tab

getError() 拆分為getError() 與getpasswordError()

對應login時帳號及密碼錯誤時的提示


openfile()


	"caption":"　"+proj.shortname+"/"+filename.replace(".xml","　　") 
	//修改tabs顯示的字串

action=login

修改為從pouchdb取得資料後暫存user與users的資訊
	
action=searchkeyword

修改search界面由auxs tab轉為popover	
	
#adds

addtab()

增加一個addtab當點擊後轉到bambolist tab

action=myalert

當操作觸發alert 轉為bootstrap alert，傳入值0代表success，1代表failed
	
	$(".alert_ok").removeClass("in").show(); 
 	$(".alert_ok").delay(200).addClass("in").fadeOut(3000);} 
	//顯示3秒後關閉alert
	 
action=myinput

操作時輸入欄位給予的回饋，如登入畫面
    
	0 : success  欄位加強綠框，後端添加打勾符號
	1 : failed   欄位加強紅框，後端添加打叉符號
	2 : warning  欄位加強黃框，後端添加警告符號
	
gostart()
	
登入後前取得projcet在pouchdb的資訊並前往project頁面

pop_search()

點擊search後將關鍵字傳入search()進行處理

user_profile()

點擊config按鈕前往userinfo頁面

search(keyword)

當觸發search事件時開啟search的popover視窗，對應mainsearch.jsx

pop_profile()

當點擊右上角user按鈕時觸發事件開啟user的popover視窗，對應about.jsx

setting_button()

當登入者身分為chief才顯示左上角config按鍵

barphoto_error()

當登入的user無上傳圖片時右上角user按鈕則用預設圖片代替

rendersignin()

登入後才顯示上方綠色toolbar，登出後移除

