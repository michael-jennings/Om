import { downloadFilename } from './util';
async function getNextChatId() {
    const data = await chrome.storage.local.get('chatCounter');
    const next = (data.chatCounter || 0) + 1;
    await chrome.storage.local.set({ chatCounter: next });
    return next;
}
async function saveChat(chat) {
    const filename = downloadFilename(chat.id, chat.platform);
    const blob = new Blob([JSON.stringify(chat, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    await chrome.downloads.download({ url, filename, saveAs: false });
    URL.revokeObjectURL(url);
    for (const msg of chat.messages) {
        for (const att of msg.attachments || []) {
            try {
                await chrome.downloads.download({ url: att.url, filename: `${chat.id}_${att.name}`, saveAs: false });
            }
            catch (e) {
                const placeholder = new Blob([], { type: 'text/plain' });
                const purl = URL.createObjectURL(placeholder);
                await chrome.downloads.download({ url: purl, filename: `${chat.id}_${att.name}.missing`, saveAs: false });
                URL.revokeObjectURL(purl);
            }
        }
    }
}
chrome.action.onClicked.addListener(async (tab) => {
    if (!tab.id)
        return;
    chrome.tabs.sendMessage(tab.id, { type: 'export' });
});
chrome.runtime.onMessage.addListener(async (req) => {
    if (req.type === 'export-result') {
        const chat = req.chat;
        if (!chat.id) {
            chat.id = await getNextChatId();
        }
        await saveChat(chat);
    }
});
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ chatCounter: 0 });
});
