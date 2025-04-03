const sqlite3 = require('sqlite3').verbose();
const { DB_PATH } = require('./config');

const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error("Error connecting to SQLite DB:", err);
  } else {
    console.log("Connected to SQLite DB");
  }
});

db.run(`
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    message TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

const saveMessage = (username, message, callback) => {
  const stmt = db.prepare("INSERT INTO messages (username, message) VALUES (?, ?)");
  stmt.run(username, message, callback);
  stmt.finalize();
};

const getMessages = (callback) => {
  db.all('SELECT * FROM messages ORDER BY timestamp', [], callback);
};

module.exports = { db, saveMessage, getMessages };