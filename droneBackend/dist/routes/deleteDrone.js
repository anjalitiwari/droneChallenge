"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const delete_1 = require("../handlers/delete");
function deleteDrone(app) {
    app.post('/delete', delete_1.handler);
}
exports.default = deleteDrone;
//# sourceMappingURL=deleteDrone.js.map