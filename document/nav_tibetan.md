# nav_tibetan.jsx

# changes

修改UI的顯示方式

# adds

handsavemarkup() & handUpdate()

對應UI上save 與 refresh按鈕，點擊時再次儲存/讀取 pouchdb

scrolltoTop()

翻頁時將scrollbar的狀態移至頂端

imgerror()

當無經文對應圖片時顯示sorry.png圖片

zoom(e)

對應放大/縮小按鈕，當使用者點擊按鈕時針對內文文字進行放大/縮小

	style.fontSize +/- 0.2em
	當字型大小小於0.6em時則不再縮小

getDocview_style()

取得內文所在控件的CSS、傳給zoom作操作使用

expandFileName1()

將imageview.jsx併入，載入kangyur_images中對應的圖片

