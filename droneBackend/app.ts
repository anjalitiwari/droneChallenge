import express from 'express';
import registerRoutes from './src/register-routes';
import { ExpressApplication } from './interfaces/index';
import http from "http";

const port = process.env.PORT || 4001; // This can later be taken from config file


const app: ExpressApplication = express();

const server = http.createServer(app);
const io = require('socket.io')(server,{origins: '*:*'}); // < Socket connection between droneClient and droneBackend server

// Register all routes and pass socket
registerRoutes(app, io);

server.listen(port, () => console.log(`Listening on port ${port}`));

export default app;
