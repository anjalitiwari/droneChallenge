"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const add_1 = require("../handlers/add");
function addDrone(app) {
    app.post('/add', add_1.handler);
}
exports.default = addDrone;
//# sourceMappingURL=addDrone.js.map