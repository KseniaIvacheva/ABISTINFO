const WebSocket = require('ws');
const http = require('http');

const server = http.createServer();
const wss = new WebSocket.Server({ server });

const clients = new Map(); // userId -> ws

wss.on('connection', (ws) => {
    let userId = null;
    let userRole = null;
    let userName = null;
    
    ws.on('message', (data) => {
        try {
            const message = JSON.parse(data);
            
            switch(message.type) {
                case 'auth':
                    userId = message.userId;
                    userRole = message.userRole;
                    userName = message.userName;
                    clients.set(userId, { ws, userRole, userName });
                    console.log(`User ${userName} (${userId}) connected`);
                    break;
                    
                case 'schedule_update':
                case 'new_message':
                case 'reminder':
                case 'supervision_update':
                case 'session_reminder':
                    // Рассылаем всем подключенным клиентам
                    broadcast(message);
                    break;
            }
        } catch (err) {
            console.error('Error processing message:', err);
        }
    });
    
    ws.on('close', () => {
        if (userId) {
            clients.delete(userId);
            console.log(`User ${userName} (${userId}) disconnected`);
        }
    });
});

function broadcast(message) {
    clients.forEach((client, id) => {
        if (client.ws.readyState === WebSocket.OPEN) {
            client.ws.send(JSON.stringify(message));
        }
    });
}

const PORT = 3001;
server.listen(PORT, () => {
    console.log(`WebSocket server running on ws://localhost:${PORT}`);
});