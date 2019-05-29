const webSocketServerPort = 3000;
const webSocketServer = require('websocket').server;
const http = require('http');

// Start up server
const httpServer = http.createServer();
httpServer.listen(
  webSocketServerPort,
  () => console.info(`Listening on port ${webSocketServerPort}`)
);
const wsServer = new webSocketServer({ httpServer });

wsServer.on('request', (request) => {
  const now = new Date();
  console.log(`${now}: Received a new connection from ${request.origin}`);
});