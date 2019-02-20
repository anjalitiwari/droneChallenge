"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uniqid_1 = __importDefault(require("uniqid"));
const handler = (request, response) => {
    const data = request.body;
    const id = uniqid_1.default();
    const droneInfo = {
        quadrant: data.quadrant || 0,
        x: data.x || 0.5,
        y: data.y || 0.5,
        id: id // unique id generated using uuid
    };
    request["bucket"].get('activeDrones', (err, result) => {
        if (err)
            throw err;
        else {
            let data = result.value;
            data.push(droneInfo);
            request["bucket"].upsert('activeDrones', data, (err, result) => {
                try {
                    request["io"].emit("mychannel", data);
                    return response.status(200).send({ message: 'Drone added successfully' });
                }
                catch (error) {
                    console.error(`Error: ${error.code}`);
                    return response.status(500).send({ message: 'Something went wrong' });
                }
            });
        }
    });
};
exports.handler = handler;
//# sourceMappingURL=add.js.map