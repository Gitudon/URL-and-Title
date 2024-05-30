
//Edge の名前空間(browser) がなけれぱ chrome の名前空間を使用する
var browser = browser||chrome;

//コンテキストメニューに拡張のメニューを追加
browser.contextMenus.create({
    id: 'MarkDownLink',
    title: 'Copy MarkDown Link and Title',
        onclick: (info, tab)=>{ //クリックされた際のアクション
            var url = tab.url;
            var title = tab.title;
            var markdown = '[' + title + '](' + url + ')';
            toClipBoard(markdown);
            function toClipBoard(text){
                var ta = document.createElement("textarea");
                ta.value = text;
                ta.style.position = "fixed";
                ta.style.left = "0";
                ta.style.top = "0";
                document.body.appendChild(ta);
                ta.select();
                document.execCommand("copy");
                ta.parentElement.removeChild(ta);  
            }
    }
});
