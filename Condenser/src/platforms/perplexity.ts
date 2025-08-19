import { Chat, Message } from '../types';

export async function extractPerplexity(): Promise<Chat> {
  const messages: Message[] = [];
  const nodes = document.querySelectorAll('[data-testid="message"]');
  nodes.forEach((node, idx) => {
    const role = node.classList.contains('user') ? 'user' : 'assistant';
    const content = (node.textContent || '').trim();
    const attachments = Array.from(node.querySelectorAll('img')).map((img, i) => ({
      name: `image-${idx + 1}-${i + 1}.png`,
      url: (img as HTMLImageElement).src,
    }));
    messages.push({ id: idx + 1, role, content, attachments });
  });
  const chat: Chat = {
    id: 0,
    platform: 'perplexity',
    messages,
  };
  return chat;
}
