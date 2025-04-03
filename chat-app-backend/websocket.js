const WebSocket = require('ws');
const url = require('url');
const { saveMessage, getMessages } = require('./database');

const setupWebSocket = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws, req) => {
    const parameters = url.parse(req.url, true);
    const username = parameters.query.username || 'anonymous';
    ws.username = username;

    console.log(`New connection from ${username}`);
    ws.send(JSON.stringify({ type: 'info', message: `Welcome, ${username}!` }));

    broadcast(wss, { type: 'notification', message: `${username} joined the chat.` }, ws);

    getMessages((err, messages) => {
      if (!err) {
        ws.send(JSON.stringify({ type: 'history', messages }));
      } else {
        console.error("Error fetching messages:", err);
      }
    });

    ws.on('message', (msg) => handleMessage(ws, msg, wss));
    ws.on('close', () => handleDisconnection(ws, wss));
  });

  return wss;
};

const broadcast = (wss, data, sender = null) => {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN && client !== sender) {
      client.send(JSON.stringify(data));
    }
  });
};

const handleMessage = (ws, msg, wss) => {
  try {
    const data = JSON.parse(msg.toString());
    if (data.type === 'message') {
      saveMessage(ws.username, data.message, (err) => {
        if (!err) {
          broadcast(wss, { type: 'message', username: ws.username, message: data.message, timestamp: new Date().toISOString() });
        }
      });
    } else if (data.type === 'typing') {
      broadcast(wss, { type: 'typing', username: ws.username }, ws);
    }
  } catch (err) {
    console.error("Invalid JSON:", msg);
  }
};

const handleDisconnection = (ws, wss) => {
  console.log(`${ws.username} disconnected`);
  broadcast(wss, { type: 'notification', message: `${ws.username} left the chat.` });
};

module.exports = { setupWebSocket };