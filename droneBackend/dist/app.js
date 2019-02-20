"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const register_routes_1 = __importDefault(require("./src/register-routes"));
const http_1 = __importDefault(require("http"));
const port = process.env.PORT || 4001; // This can later be taken from config file
const app = express_1.default();
const server = http_1.default.createServer(app);
const io = require('socket.io')(server, { origins: '*:*' }); // < Socket connection between droneClient and droneBackend server
// Register all routes and pass socket
register_routes_1.default(app, io);
server.listen(port, () => console.log(`Listening on port ${port}`));
//# sourceMappingURL=app.js.map