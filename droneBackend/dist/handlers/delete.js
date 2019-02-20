"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const handler = (request, response) => {
    const payload = request.body;
    request["bucket"].get('activeDrones', (err, result) => {
        if (err)
            throw err;
        else {
            const data = result.value;
            const filteredData = lodash_1.default.remove(data, function (drones) {
                return drones.id !== payload.id;
            });
            request["bucket"].upsert('activeDrones', filteredData, (err, result) => {
                try {
                    request["io"].emit("mychannel", filteredData);
                    return response.status(200).send({ message: 'Drone removed successfully' });
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
//# sourceMappingURL=delete.js.map