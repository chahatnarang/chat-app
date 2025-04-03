
const createWebSocket = (username: string, onMessageReceived: (data: any) => void) => {
    const ws = new WebSocket(`ws://localhost:8080?username=${username}`);  
    ws.onopen = () => console.log("Connected to WebSocket server");
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      onMessageReceived(data);
    };
  
    ws.onclose = () => console.log("WebSocket connection closed");
    return ws;
  };
  
  export default createWebSocket;