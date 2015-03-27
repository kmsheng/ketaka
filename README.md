# ketaka

# Setup

1.安裝開發環境

    $ git clone https://github.com/ksanaforge/ksana2015
    $ cd ksana2015
    $ npm install (已安裝後更新只需輸入npm update)


2.安裝global套件

    $ npm install -g ksana-cli  (need sudo on Linux and Mac system)


3.下載ketaka

    $ git clone https://github.com/karmapa17/ketaka
    $ cd ketaka
    $ 將KDB放置路徑中

4.安裝pouchdb
     
	pouchdb安裝步驟見下方安裝pouchdb流程
	
5.執行ketaka

    $ ks server


6.修改程式

    $ 原始碼都在src資料夾中

# Install server 環境

Mac 環境下安裝

1.安裝環境

安裝 homebrew  

    $ ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

檢查是否安裝完成

    $ brew --version

安裝 nginx 

    $ brew install nginx

將 minimum requirement file 資料夾內檔案放入nginx路徑內 /usr/local/Cellar/nginx/1.6.2/html並開啟權限

    $ cd /usr/local/Cellar/nginx/1.6.2/html
    $ sudo -R chmod 777 ketaka
    $ sudo -R chmod 777 fonts
    $ sudo -R chmod 777 kangyur_images

修改nginx參數

    $ sudo cp /usr/local/Cellar/nginx/1.6.2/html/nginx.conf  /usr/local/etc/nginx/nginx.conf

啟動niginx

    $ sudo nginx
		
前往測試

http://localhost/ketaka/index.html

安裝php-fpm

    $ brew tap homebrew/dupes
    $ brew tap josegonzalez/homebrew-php
    $ brew install php54 --with-fpm

修改php參數

    $ sudo cp /usr/local/Cellar/nginx/1.6.2/html/php-fpm.conf.default /usr/local/etc/nginx/php-fpm.conf  
    $ sudo cp /usr/local/Cellar/nginx/1.6.2/html/php-fpm.conf.default /private/etc/

創建error log folder

    $ mkdir /usr/var/log

執行PHP

    $ sudo php-fpm

檢查是否安裝完成

    $ php -v
    $ php-fpm - v

安裝 nodejs 

    $ brew install node

檢查是否安裝完成

    $ node -v
    $ npm - v
	
安裝 pouchdb-server   
 
    $ npm install -g pouchdb-server

啟動pouchdb

    $ cd /usr/local/Cellar/nginx/1.6.x/html/ketaka/database
    $ sudo pouchdb-server -p 5984 -l tiny

或是在 Screen下運行

    $ screen
    $ sudo pouchdb-server -p 5984 -l tiny
