# about.jsx

user profile popover 頁面

# adds:

1.popoverphoto_error()

當user profile popover 在/photo裡沒有對應圖片時則代入預設圖片 photo.png

2.getadmin()

取得當前登入USER身分

    Administrator       admin = true  and su (superuser) = true
    Chief editor        admin = true  and su (superuser) = false
    Proof reader        admin = false and su (superuser) = false

