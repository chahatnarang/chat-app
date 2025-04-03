# WebSocket Chat Application

This project is a straightforward chat application powered by WebSockets which includes:
- **Node.js backend** with Express and WebSocket (`ws` library).
- **SQLite** for persisting chat messages.
- **React frontend** with TypeScript and MUI for UI components.
- **Basic authentication** (via username query parameter) and a **typing indicator**.
- **Chat history retrieval**, ensuring messages persist when users reconnect.

## Architecture

### Backend
- **WebSocket Server:** Handles real-time chat, message persistence, and user connections.
- **Message Storage:** Uses SQLite to store messages with usernames and timestamps.
- **API Endpoint (`GET /messages`)** Allows retrieval of chat history upon joining.
- **Authentication:** Requires users to input a username before connecting.

### Frontend
- **React & TypeScript:** Provides an interactive chat interface.
- **MUI Components:** Ensures a clean and accessible UI.
- **Real-time WebSocket Messaging:** Supports live chats, typing indicators, and notifications.
- **User Experience:** Starts with a username prompt and maintains message history.

---

## Setup

### Prerequisites
- Node.js
- SQLite

### Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd chat-app/backend
    ```
2. Install dependencies:
    ```bash
    npm install express ws sqlite3
    ```
3. Run the server:
    ```bash
    node server.js
    ```
   The server will listen on port 8080 by default.

### Frontend Setup

1. Navigate to the frontend folder:
    ```bash
    cd chat-app/frontend
    ```
2. If you’re using Create React App with TypeScript, set up the project (skip if already done):
    ```bash
    npx create-react-app . --template typescript
    npm install @mui/material @emotion/react @emotion/styled
    ```
3. Start the frontend application:
    ```bash
    npm start
    ```
   The app will typically be available on `http://localhost:3000` (adjust port settings if necessary).

## Production Improvements

- **Enhanced Authentication:** Use JWT tokens or OAuth to manage user identity securely.
- **Scalable Storage:** Replace SQLite with PostgreSQL or MongoDB for better performance at scale.
- **Security Measures:** Implement HTTPS, rate limiting, and request validation.
- **Robust Error Handling:** Add detailed logging and graceful error recovery mechanisms.
- **Testing:** Introduce unit and integration tests for both frontend and backend.
- **Containerization & Deployment:** Use Docker for easy deployment and scaling.
- **UI Experience:** A Slack or Discord-like chat enhances usability and modern design.
