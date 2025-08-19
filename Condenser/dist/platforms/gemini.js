export async function extractGemini() {
    const messages = [];
    const nodes = document.querySelectorAll('chat-message, div.message');
    nodes.forEach((node, idx) => {
        const role = (node.getAttribute('data-role') || '').toLowerCase() ||
            (node.classList.contains('user') ? 'user' : 'assistant');
        const content = (node.textContent || '').trim();
        const attachments = Array.from(node.querySelectorAll('img')).map((img, i) => ({
            name: `image-${idx + 1}-${i + 1}.png`,
            url: img.src,
        }));
        messages.push({ id: idx + 1, role, content, attachments });
    });
    const chat = {
        id: 0,
        platform: 'gemini',
        messages,
    };
    return chat;
}
