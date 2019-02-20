import axios from "axios";

export function deleteDrone(id,callback) {
    console.log("in delete drone with div", )
    axios({
        method: 'POST',
        url: 'http://localhost:4001/delete',
        headers: {
            'Content-Type': "application/json"
        },
        data: {
            id: id
        }
    }).then(function (response) {
        console.log(response, "response----------------")
        return callback(null,"DEleted successfully");
    }).catch((e) => {
        return callback(e,null);
    })
}