## Project Description

This is a simple illustration of building a system using nodejs,react,couchbase, Dockers,websocket and typescript where we have drones moving in the front end which will continuously change their positions in a quadrant such that whenever a new drone is added, server will publish the updated placements of active drones via web-sockets. There is a provision of adding and deleting drones on the fly 

### Prerequisites
Install nodejs, react , Dockers, typescript and couchbase

droneBackend serves as the backend server whereas droneclient serves as the frontend representing drones movement

## Please install couchbase latest version locally with following credentials
```
username - 'Administrator'
password - 'root123'

please create bucket "default" in the couchbase

Couchbase is used for storing all the drones and updating their movements using websockets
```

## INSTRUCTIONS FOR RUNNING BACKEND

within droneBackend there is a dockerfile please build docker image and run container

```
cd droneBackend
docker build -t anjali/dronebackend .
docker run -p 4001:4001 anjali/dronebackend 
```

Without Docker,backend can be also be run using following commands

```
npm install
npm run start-dev // For running typescript files locally
or
npm run build // This will convert tsc to javascript into dist/ folder 
```


## INSTRUCTIONS FOR RUNNING FRONTEND

within droneclient there is a dockerfile please build docker image and run container 
```
cd droneclient
docker build -t anjali/droneclient .
docker run -p 3000:3000 anjali/droneclient 
```


Without Docker,frontend be also be run using following commands
```
npm install
npm run start  
```


## Please refer attached screen shot taken locally to illustrate what has been done

## Area of Improvements
Due to time constraint , many things are kept static like port number, couchbase configuration which can be made modular and which can be fetched from configuration file

Not all test cases are covered

