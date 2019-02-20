import bodyParser from "body-parser";
import expsession from 'express-session';
import cors from 'cors';

import couchbase from 'couchbase';

//Connect Couchbase
//const ip = 'localhost';
const username = 'Administrator';
const password = 'root123';
const bucketToConnect = 'default';

var cluster = new couchbase.Cluster('couchbase://localhost');
cluster.authenticate(username, password);
var bucket = cluster.openBucket(bucketToConnect);
bucket.operationTimeout = 120 * 1000;
bucket.upsert('activeDrones', [], (err: Error, result: any) => {
});

// Routes
import addDrone from '../routes/addDrone';
import deleteDrone from '../routes/deleteDrone';

// Interface
import { ExpressApplication } from '../interfaces/index';
import { quadrantBoundary } from '../interfaces/drone';

//Initial setup of drones
import { getInitialState } from './getInitialDroneState';


// initialize session middleware
const sessionMiddleware = expsession({
  secret: 'random secret',
  saveUninitialized: true,
  resave: true
});

function registerRoutes(app: ExpressApplication, io: any): void {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cors())

  // hook up session for express routes
  app.use(sessionMiddleware);

  // a middleware function to add bucket and socket object in the req object accessed by all handlers. This code is executed for every request to the router 
  app.use(function (req, res, next) {
    req["io"] = io; // socket connection object
    req["bucket"] = bucket; //couchbase connection object
    next();
  })

  io.on("connection", (socket: any) => {
    console.log("New Client Conencted")
    // hook up the session for socket.io connections
    io.use((socket: any, next: any) => {
      sessionMiddleware(socket.request, socket.request.res, next);
    });
    socket.on("quadrantBoundary", (data: quadrantBoundary) => getInitialState(bucket, socket, data));
    socket.on("disconnect", () => console.log("Client disconnected"));
  });

  // Register all the routes and pass couchbase connection object

  app.get('/', (req, res) => {
    res.send('Hello World!');
  }); /* A simple route to test setup */

  addDrone(app)
  deleteDrone(app);
}

export default registerRoutes;
