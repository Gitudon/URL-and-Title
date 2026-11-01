chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: 'MarkDownLink',
        title: 'Copy MarkDown Link and Title',
        contexts: ['all']
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === 'MarkDownLink') {
        const url = tab.url;
        const title = tab.title;

        // http または https 以外の特殊ページ（内部ページや新しいタブ等）では処理を中断
        if (!url || (!url.startsWith('http://') && !url.startsWith('https://'))) {
            console.warn('このページでは拡張機能によるコピーはできません。');
            return;
        }

        const markdown = `[${title}](${url})`;

        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: (text) => {
                navigator.clipboard.writeText(text).catch(() => {
                    const ta = document.createElement("textarea");
                    ta.value = text;
                    ta.style.position = "fixed";
                    ta.style.left = "0";
                    ta.style.top = "0";
                    document.body.appendChild(ta);
                    ta.select();
                    document.execCommand("copy");
                    ta.parentElement.removeChild(ta);
                });
            },
            args: [markdown]
        }).catch(err => console.error('実行エラー:', err));
    }
});