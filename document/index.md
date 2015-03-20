# index.html

# adds

shortcut icon為chorm頁籤上網頁名稱旁的縮圖

	<link rel="shortcut icon" type="image/png" href="images/s_logo1.png"/>

關閉上一頁按鈕，每次點擊上一頁按鈕都會導回當前頁面

	<script>
	//disable back button
	history.pushState({ page: 1 }, "title 1", "#ketaka");
		window.onhashchange = function (event) {
			window.location.hash = "ketaka";

		};
	</script>

