import React, { useState } from 'react';
import { UsernamePromptProps } from '../types';
import { TextField, Button, Paper, Typography } from '@mui/material';

const UsernamePrompt: React.FC<UsernamePromptProps> = ({ onSetUsername }) => {
  const [inputName, setInputName] = useState('');

  return (
    <Paper sx={{ p: 3, textAlign: 'center', borderRadius: '16px', width: '80%', maxWidth: '600px' }}>
      <Typography variant="h6">Enter your username</Typography>
      <TextField 
        label="Username" 
        value={inputName}
        onChange={(e) => setInputName(e.target.value)}
        fullWidth
        sx={{ mt: 2, borderRadius: '16px' }}
        onKeyDown={(e) => { if (e.key === 'Enter') inputName.trim() && onSetUsername(inputName.trim()); }}
      />
      <Button 
        onClick={() => inputName.trim() && onSetUsername(inputName.trim())} 
        variant="contained" 
        sx={{ mt: 2, borderRadius: '32px', width: '100%' }}
      >
        Join Chat
      </Button>
    </Paper>
  );
};

export default UsernamePrompt;