"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("@models/User");
const global_1 = require("../global");
class UserController {
    async create(request, response) {
        const { firstName, lastName, age } = request.body;
        const isAnyUndefined = global_1.Citi.areValuesUndefined(firstName, lastName, age);
        if (isAnyUndefined)
            return response.status(400).send();
        const newUser = { firstName, lastName, age };
        const { httpStatus, message } = await global_1.Citi.insertIntoDatabase(User_1.User, newUser);
        return response.status(httpStatus).send({ message });
    }
    async get(request, response) {
        const { httpStatus, values } = await global_1.Citi.getAll(User_1.User);
        return response.status(httpStatus).send(values);
    }
    async delete(request, response) {
        const { id } = request.params;
        const { value: userFound, message } = await global_1.Citi.findByID(User_1.User, id);
        if (!userFound)
            return response.status(400).send({ message });
        const { httpStatus, messageFromDelete } = await global_1.Citi.deleteValue(User_1.User, userFound);
        return response.status(httpStatus).send({ messageFromDelete });
    }
    async update(request, response) {
        const { id } = request.params;
        const { firstName, lastName, age } = request.body;
        const isAnyUndefined = global_1.Citi.areValuesUndefined(firstName, lastName, age, id);
        if (isAnyUndefined)
            return response.status(400).send();
        const userWithUpdatedValues = { firstName, lastName, age };
        const { httpStatus, messageFromUpdate } = await global_1.Citi.updateValue(User_1.User, id, userWithUpdatedValues);
        return response.status(httpStatus).send({ messageFromUpdate });
    }
}
exports.default = UserController;
