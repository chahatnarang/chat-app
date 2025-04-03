const express = require('express');
const { getMessages } = require('./database');

const router = express.Router();

router.get('/messages', (req, res) => {
  getMessages((err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ messages: rows });
  });
});

module.exports = router;