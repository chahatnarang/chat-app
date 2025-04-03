import React from 'react';
import { Typography, Paper, Box } from '@mui/material';
import { ChatWindowProps } from '../types';

const ChatWindow: React.FC<ChatWindowProps> = ({ chatMessages, typingIndicators }) => {
  return (
    <Paper sx={{
      p: 3, 
      flexGrow: 1, 
      maxHeight: '60vh', 
      overflowY: 'auto', 
      mb: 2, 
      bgcolor: 'background.default', 
      borderRadius: '16px', 
      width: '80%',
      maxWidth: '600px'
    }}>
      {chatMessages.map((msg, index) => (
        <Box key={index} sx={{ my: 1 }}>
          {msg.type === 'notification' ? (
            <Typography variant="body1" color="primary">
              {msg.message}
            </Typography>
          ) : (
            <Typography 
              variant="body2" 
              color={msg.type === 'message' ? '' : 'secondary'}
            >
              <strong>{msg.username}: </strong>{msg.message}
            </Typography>
          )}
        </Box>
      ))}
      
      {/* Display typing indicators */}
      {typingIndicators.length > 0 && (
        <Typography variant="body2" sx={{ mt: 1, color: 'secondary' }}>
          {typingIndicators.join(', ')} {typingIndicators.length > 1 ? "are" : "is"} typing...
        </Typography>
      )}
    </Paper>
  );
};

export default ChatWindow;