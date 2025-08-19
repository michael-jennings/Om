export function sanitizeFilename(name) {
    return name.replace(/[^a-z0-9-_]/gi, '_');
}
export function downloadFilename(chatId, platform) {
    const date = new Date().toISOString().replace(/[:.]/g, '-');
    return `${platform}_chat_${chatId}_${date}.json`;
}
