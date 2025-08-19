import { extractChatGPT } from './platforms/chatgpt';
import { extractGemini } from './platforms/gemini';
import { extractPerplexity } from './platforms/perplexity';
import { extractClaude } from './platforms/claude';
chrome.runtime.onMessage.addListener(async (msg) => {
    if (msg.type === 'export') {
        let chat;
        const host = location.hostname;
        try {
            if (host.includes('openai.com')) {
                chat = await extractChatGPT();
            }
            else if (host.includes('gemini.google')) {
                chat = await extractGemini();
            }
            else if (host.includes('perplexity.ai')) {
                chat = await extractPerplexity();
            }
            else if (host.includes('claude.ai') || host.includes('anthropic.com')) {
                chat = await extractClaude();
            }
            if (chat) {
                chrome.runtime.sendMessage({ type: 'export-result', chat });
            }
        }
        catch (e) {
            console.error('Condenser extraction failed', e);
        }
    }
});
