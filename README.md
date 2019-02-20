This project is created using nodejs,react,couchbase, Dockers,websocket and typescript

droneBackend serves as the backend server whereas droneClient serves as the frontend reprepresenting drones movement

Please install couchbase latest version locally with following credentials

username - 'Administrator'
password - 'root123'

please create bucket "default" in the couchbase

Couchbase is used for storing all the drones and updating their movements using websockets

##INSTRUCTIONS FOR RUNNING BACKEND##

within droneBackend there is a dockerfile please build docker image via following command

cd droneBackend
docker build -t anjali/dronebackend .
docker run -p 4001:4001 anjali/dronebackend 

Without Docker, backend be also be run using following commands

```
npm install
npm run start-dev // For running typescript files locally
or
npm run build // This will convert tsc to javascript into dist/ folder 
```


##INSTRUCTIONS FOR RUNNING FRONTEND##

within droneclient there is a dockerfile please build docker image via following command
```
cd droneclient
docker build -t anjali/droneclient .
docker run -p 3000:3000 anjali/droneclient 
```


Without Docker, backend be also be run using following commands
```
npm install
npm run start  
```


## Please refer attached screen shot taken locally to illustrate what has been done##

##Area of Improvements##
Due to time constraint , many things are kept static like port number couchbase configuration which can be made modular and whicc can come from config

Also Not all test cases are covered

