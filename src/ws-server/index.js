const http = require("http");
const express = require( "express");
const WebSocket = require( "ws");
const port = 8099

const app = express();

const server = http.createServer(app);

const webSocketServer = new WebSocket.Server({ server });

webSocketServer.on('connection', ws => {
   ws.on('message', m => {
    webSocketServer.clients.forEach(client => client.send(m));
   });

   ws.on("error", e => ws.send(e));
   
   let id = 10000;
   setInterval(() => {
     let value = Math.floor(Math.random() * 1000) + 1000
     ws.send(JSON.stringify({id: id++, value: value}))
   }, 10)
   
});

server.listen(port, () => console.log("Server started on localhost:" + port))