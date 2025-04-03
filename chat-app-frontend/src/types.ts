export interface ChatMessage {
  type: string;
  username?: string;
  message?: string;
  timestamp?: string;
}

export interface ChatWindowProps {
  chatMessages: ChatMessage[];
  typingIndicators: string[];
}

export interface MessageInputProps {
  ws: WebSocket | null;
}

export interface UsernamePromptProps {
  onSetUsername: (username: string) => void;
}