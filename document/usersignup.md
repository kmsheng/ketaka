# usersignup.jsx

# adds

signup() & signup_success()

檢查若無錯誤則寫入pouchdb
錯誤判斷
account || password || confirm password == null <br />
password != confirm password<br />
則會輸出對應的錯誤訊息

user[]  :使用者填入的資訊<br />
target[]:目標控件

checkname() & checkuname_response()

檢查pouchdb內是否有重複的account name，若有錯誤則顯示錯誤訊息

checkpwd()

游標離開password欄位如位填入則顯示錯誤訊息

Confirmpwd()

password != confirm password 時顯示警告訊息

cancelsignup()

返回登入頁面

