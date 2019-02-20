"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require('lodash');
const fs = require('fs');
const file = '../config/data.js';
const path = require('path');
const handler = (request, response) => {
    const userDataPath = path.resolve(__dirname, file);
    const searchKeyWord = request.params.name;
    const fileData = JSON.parse(fs.readFileSync(userDataPath, 'utf-8'));
    const searchData = _.find(fileData, function (obj) {
        return obj.name.includes(searchKeyWord);
    });
    if (searchData)
        return response.status(200).send({ message: 'USER FOUND SUCCESSFULLY', body: searchData });
    else
        return response.status(200).send({ message: 'user having ' + searchKeyWord + " does not exist", body: [] });
};
exports.handler = handler;
//# sourceMappingURL=search.js.map