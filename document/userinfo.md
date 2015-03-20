# usersinfo.jsx

# adds

changepassword()

點擊change password後顯示輸入欄位old password, new password, confirm password

savepassword()

判斷輸入的old password是否與使用者密碼相同與提示<br />
當輸入欄位正確時將pouchdb的密碼修改為新密碼

saveprofile(id,admin,pwd,type)

將目前取得的資訊儲存至pouchdb內

	id   :   userid
	admin:   透過select_chief() & select_proof() 傳入 admin狀態
	pwd  :   透過select_password傳入新密碼
	type :   透過delete_user 傳入

select_chief(e) & select_proof(e)

chief選取其他user身分觸發saveprofile()儲存

select_password(e)

chief選取其他user修改密碼觸發saveprofile()儲存

delete_user(e)

chief刪除其他user觸發saveprofile()刪除

role_list(f)

產生chief與proof reader選取按鈕，讀取每個user的身分並選取

user_list()

當登入的使用者為admin時顯示所有使用者列表，含所有控制項，包含

	使用者照片<br />
	使用者名稱<br />
	使用者密碼<br />
	修改密碼按鈕       select_password() <br />
	刪除使用者按鈕     delete_user() <br />
	使用者身分按鈕     role_list()<br />

refresh_photo(e)

當使用者上傳照片後立即更新
	
photo_error(e)

當使用者沒上傳照片則用預設圖片取代

checkoldpassword()

檢查輸入的old password是否正確並給予提示

confirmnewpwd()

檢查輸入的confirm password是否與new password相同並給予提示


