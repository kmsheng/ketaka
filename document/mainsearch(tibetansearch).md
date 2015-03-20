# mainsearch.jsx

#changes

將原本searchmain.jsx 修改為 mainsearch.jsx
參造tibetansearch(https://github.com/ksanaforge/tibetansearch)的

UI介面修改
將onReady的kdb載入狀態判斷移至action中

findone(e)

縮小search範圍，將filter移至search功能內完成

# resultlist.jsx

# changes

show()

增加對搜尋結果的處理，將原本搜尋結果在處理，只顯示存在目前開啟bambos的結果
若無開啟bambo，則顯示所有結果

# adds

getbambos()

取得當前開啟的所有bambo

# searchbox.jsx

# changes

將filter移至search功能內完成