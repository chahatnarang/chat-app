const express = require('express');
const http = require('http');
const { setupWebSocket } = require('./websocket');
const { db } = require('./database');

const app = express();
const server = http.createServer(app);

app.use(express.json());

app.get('/messages', (req, res) => {
  db.all('SELECT * FROM messages ORDER BY timestamp', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ messages: rows });
  });
});

setupWebSocket(server);

server.listen(8080, () => {
  console.log('Server running on http://localhost:8080');
});