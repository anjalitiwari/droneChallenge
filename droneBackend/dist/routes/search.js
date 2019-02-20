"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const search_1 = require("../handlers/search");
function search(app) {
    app.get('/search/:name', search_1.handler);
}
exports.default = search;
//# sourceMappingURL=search.js.map