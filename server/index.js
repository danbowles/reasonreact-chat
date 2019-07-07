const webSocketServerPort = 3000;
const webSocketServer = require('websocket').server;
const http = require('http');

// Util
const log = (message) => {
  const now = new Date();
  console.log(`${now}:  ${message}`);
}

// Generates unique ID for every new connection
const getUniqueID = () => {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  return s4() + s4() + '-' + s4();
};

// List of all clients
const clients = {};
const users = {};

// User activity history
let userActivity = [];

let chatContent = null;

// Start up server
const httpServer = http.createServer();
httpServer.listen(
  webSocketServerPort,
  () => console.info(`Listening on port ${webSocketServerPort}`)
);
const wsServer = new webSocketServer({ httpServer });

const sendMessage = (json) => {
  console.log(`Sending: ${json}`);
  // We are sending the current data to all connected clients
  Object.keys(clients).forEach((client) => {
    clients[client].sendUTF(json);
  });
}

wsServer.on('request', (request) => {
  const userId = getUniqueID();
  // Store Connection and get it
  const connection = request.accept(null, request.orgin);
  clients[userId] = connection;
  log(`Received a new connection from ${request.origin}`);
  console.log('connected: ' + userId + ' in ' + Object.getOwnPropertyNames(clients));

  // TODO: add protocol?

  connection.on('message', (message) => {
    if (message.type === 'utf8') {
      let dataFromClient = {};
      try {
        dataFromClient = JSON.parse(message.utf8Data);
      } catch (e) {
        console.log('NOPE', message.utf8Data);
      }
      const json = { type: dataFromClient.type };
      switch (dataFromClient.type) {
        case 'USER_EVENT':
          users[userId] = dataFromClient;
          userActivity.push(`${dataFromClient.username || 'Anon'} joined to edit the document`);
          console.log(userActivity);
          json.data = { users, userActivity };
        case 'CONTENT_CHANGE':
          chatContent = dataFromClient.content;
          json.data = { chatContent, userActivity };
      }
      sendMessage(JSON.stringify(json));
    }
  });
});