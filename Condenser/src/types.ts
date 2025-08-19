export interface Attachment {
  name: string;
  url: string;
}

export interface Message {
  id: number;
  role: 'user' | 'assistant' | string;
  content: string;
  timestamp?: string;
  attachments?: Attachment[];
}

export interface Chat {
  id: number;
  platform: string;
  model?: string;
  created?: string;
  messages: Message[];
}
