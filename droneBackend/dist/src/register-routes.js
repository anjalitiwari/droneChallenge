"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_session_1 = __importDefault(require("express-session"));
const cors_1 = __importDefault(require("cors"));
const couchbase_1 = __importDefault(require("couchbase"));
//Connect Couchbase
//const ip = 'localhost';
const username = 'Administrator';
const password = 'root123';
const bucketToConnect = 'default';
var cluster = new couchbase_1.default.Cluster('couchbase://localhost');
cluster.authenticate(username, password);
var bucket = cluster.openBucket(bucketToConnect);
bucket.operationTimeout = 120 * 1000;
// Routes
const addDrone_1 = __importDefault(require("../routes/addDrone"));
const deleteDrone_1 = __importDefault(require("../routes/deleteDrone"));
//Initial setup of drones
const getInitialDroneState_1 = require("./getInitialDroneState");
// initialize session middleware
const sessionMiddleware = express_session_1.default({
    secret: 'random secret',
    saveUninitialized: true,
    resave: true
});
function registerRoutes(app, io) {
    app.use(body_parser_1.default.urlencoded({ extended: false }));
    app.use(body_parser_1.default.json());
    app.use(cors_1.default());
    // hook up session for express routes
    app.use(sessionMiddleware);
    // a middleware function to add bucket and socket object in the req object accessed by all handlers. This code is executed for every request to the router 
    app.use(function (req, res, next) {
        req["io"] = io; // socket connection object
        req["bucket"] = bucket; //couchbase connection object
        next();
    });
    io.on("connection", (socket) => {
        console.log("New Client Conencted");
        // hook up the session for socket.io connections
        io.use((socket, next) => {
            sessionMiddleware(socket.request, socket.request.res, next);
        });
        getInitialDroneState_1.getInitialState(bucket, socket);
        socket.on("disconnect", () => console.log("Client disconnected"));
    });
    // Register all the routes and pass couchbase connection object
    addDrone_1.default(app);
    deleteDrone_1.default(app);
}
exports.default = registerRoutes;
//# sourceMappingURL=register-routes.js.map