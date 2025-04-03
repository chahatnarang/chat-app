import React, { useState } from 'react';
import { MessageInputProps } from '../types';
import { TextField, Button, Box } from '@mui/material';

const MessageInput: React.FC<MessageInputProps> = ({ ws }) => {
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    if (ws && message.trim()) {
      ws.send(JSON.stringify({ type: 'message', message: message.trim() }));
      setMessage('');
    }
  };

  return (
    <Box sx={{ display: 'flex', width: '80%', maxWidth: '600px', mx: 'auto' }}>
      <TextField 
        label="Type a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        fullWidth
        onKeyDown={(e) => { if (e.key === 'Enter') sendMessage(); }}
        sx={{ borderRadius: '16px', bgcolor: 'background.default' }}
      />
      <Button onClick={sendMessage} variant="contained" sx={{ borderRadius: '8px', ml: 1 }}>
        Send
      </Button>
    </Box>
  );
};

export default MessageInput;