export async function extractChatGPT() {
    const messages = [];
    const nodes = document.querySelectorAll('[data-message-id]');
    nodes.forEach((node, idx) => {
        const role = (node.getAttribute('data-message-author-role') || '').toLowerCase() ||
            (node.classList.contains('assistant') ? 'assistant' : 'user');
        const content = (node.textContent || '').trim();
        const attachments = Array.from(node.querySelectorAll('img')).map((img, i) => ({
            name: `image-${idx + 1}-${i + 1}.png`,
            url: img.src,
        }));
        messages.push({ id: idx + 1, role, content, attachments });
    });
    const chat = {
        id: 0,
        platform: 'chatgpt',
        messages,
    };
    return chat;
}
