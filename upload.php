<?php
header('HTTP/1.1 204 No Content');
if($_FILES["upload"]["size"]>0){  
echo "file name: ".$_FILES["upload"]["name"]; 

echo "<br>";
echo "new name: ".$_POST['number']; 
echo "path: ".$_POST['folder'];
echo "<br>";

echo "file size: ".$_FILES["upload"]["size"];  
echo "<br>";

echo "file type: ".$_FILES["upload"]["type"];  

echo "<br>";

echo "temp path: ".$_FILES["upload"]["tmp_name"]; 

echo "<br>";
echo "status:OK<hr>";
if($_POST['number'] != null) {
move_uploaded_file($_FILES["upload"]["tmp_name"],"/usr/local/Cellar/nginx/1.6.2/html/ketaka/".$_POST['folder']."/".$_POST['number'].".jpg");
echo "Stored in: ". "/usr/local/Cellar/nginx/1.6.2/nginx/html/ketaka/".$_POST['folder']."/".$_POST['number'].".jpg";}
else {move_uploaded_file($_FILES["upload"]["tmp_name"],"/usr/local/Cellar/nginx/1.6.2/nginx/html/ketaka/".$_POST['folder']."/".$_FILES["upload"]["name"]);
echo "Stored in: ". "/usr/local/Cellar/nginx/1.6.2/nginx/html/ketaka/".$_POST['folder']."/".$_FILES["upload"]["name"].".jpg";}
}
?>