# document.jsx

# changes:

componentWillUpdate()

關閉nextState.newMarkupAt=null;
nextmistake翻頁時不會停留在 start:0的位置

關閉if (nextProps.page)判定
會造成nextmistake翻頁時inlinedialoag閃退

findMistake()

    M =M.sort(function(m1,m2){return m1.start-m2.start}); 
    將M的內容依start的大小排序

    if (this.props.user.admin ==true && M[i].start>=s && M[i].payload.author != this.props.user.name)
    當身分為chief時觸發(往前/往後)markup篩選尚未approve與reject的suggest markup

    else if (this.props.user.admin !=true && M[i].start>=s && M[i].payload.author == this.props.user.name && M[i].payload.type == "suggest")
    當身分為proofreader時觸發(往前/往後)markup篩選自己所做的markup

goPrevMistake()

添加return sel.start 的位置方便計算是否觸發翻頁

action=clearmarkup()

取得filename傳入給clearmarkups 使用

openmenu()

關閉inlinedialg位置計算

# adds:

goNextPage(next)Mistake(start,len)
針對翻頁後的markup跳出inlinedialog