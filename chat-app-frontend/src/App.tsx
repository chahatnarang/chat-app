import React, { useState, useEffect, useRef } from 'react';
import UsernamePrompt from './components/UsernamePrompt';
import MessageInput from './components/MessageInput';
import createWebSocket from './services/websocket';
import ChatWindow from './components/ChatWindow';
import { Box, Button } from '@mui/material';
import { ChatMessage } from './types';

const App: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [typingIndicators, setTypingIndicators] = useState<string[]>([]);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (username) {
      ws.current = createWebSocket(username, (data) => {
        if (data.type === 'message' || data.type === 'notification' || data.type === 'info') {
          setChatMessages(prev => [...prev, data]);
        } else if (data.type === 'history') {
          setChatMessages(data.messages); // Load previous messages upon joining
        } else if (data.type === 'typing') {
          setTypingIndicators(prev => {
            const updated = new Set([...prev, data.username as string]);
            return Array.from(updated);
          });
          setTimeout(() => {
            setTypingIndicators(prev => prev.filter(name => name !== data.username));
          }, 3000); // Remove after 3 sec
        }
      });
    }

    return () => ws.current?.close();
  }, [username]);

  const handleEndChat = () => {
    setUsername('');
    setChatMessages([]);
    ws.current?.close();
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', width: '80vw', mx: 'auto', p: 2 }}>
      {!username ? (
        <UsernamePrompt onSetUsername={setUsername} />
      ) : (
        <>
          <ChatWindow chatMessages={chatMessages} typingIndicators={typingIndicators} />
          <MessageInput ws={ws.current} />
          <Button
            onClick={handleEndChat}
            variant="contained"
            color="error"
            sx={{ mt: 2, borderRadius: '8px' }}
          >
            End Chat
          </Button>
        </>
      )}
    </Box>
  );
};

export default App;