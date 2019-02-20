import axios from "axios";

export function addDrone(callback) {
    console.log("in add button click action")
    axios({
        method: 'POST',
        url:'http://localhost:4001/add', 
        headers: {
            'Content-Type': "application/json"
           },
         data: {}  
   }).then(function (response) {
        return callback(null,"Added successfully");
    }).catch((e) => {
       alert("Error" + e)
    })
}