# Condenser

Condenser is a Chrome extension that automatically collects and exports chat histories from AI chat platforms including Google Gemini, OpenAI ChatGPT, Perplexity, and Anthropic Claude.

## Purpose
- Traverse the complete chat history for each supported platform using platform-specific modules.
- Export each conversation with full fidelity, preserving text formatting, images, and metadata such as model identifiers and timestamps.
- Download any files exchanged in a conversation and save them using the naming scheme `<chat_id>_<original_filename>`.
- If a file cannot be downloaded, create a placeholder file to indicate its presence in the chat.
- Assign a sequential numeric ID to every conversation to maintain deterministic ordering.

## Technology Stack
The project is implemented as a Manifest V3 Chrome extension written in TypeScript. It interacts with each chat service's web interface to gather data and trigger downloads.

## Development
1. Install dependencies:
   ```bash
   npm install
   ```
2. Build the extension:
   ```bash
   npm run build
   ```
3. Load the `Condenser` directory as an unpacked extension in Chrome.
4. Navigate to a supported chat platform and click the extension icon to export the current chat.

## Testing
The project currently has no automated tests.
