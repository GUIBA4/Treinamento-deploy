"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = require("src/database/connection");
const Message_1 = __importDefault(require("./Message"));
const Terminal_1 = __importDefault(require("./Terminal"));
class Citi {
    static areValuesUndefined(...elements) {
        const isAnyUndefined = elements.some((element) => {
            return element === undefined;
        });
        return isAnyUndefined;
    }
    static async insertIntoDatabase(entity, object) {
        try {
            const entityRepository = connection_1.connection.getRepository(entity);
            await entityRepository.save(object);
            Terminal_1.default.show(Message_1.default.INSERTED_IN_DATABASE);
            return {
                httpStatus: 201,
                message: Message_1.default.INSERTED_IN_DATABASE
            };
        }
        catch (error) {
            Terminal_1.default.show(Message_1.default.ERROR_INSERTING_DATABASE);
            return {
                httpStatus: 400,
                message: Message_1.default.ERROR_INSERTING_DATABASE
            };
        }
    }
    static async getAll(entity) {
        try {
            const entityRepository = connection_1.connection.getRepository(entity);
            const repositoryValues = await entityRepository.find();
            Terminal_1.default.show(Message_1.default.GET_ALL_VALUES_FROM_DATABASE);
            return {
                values: repositoryValues,
                httpStatus: 200
            };
        }
        catch (error) {
            Terminal_1.default.show(Message_1.default.ERROR_GETTING_VALUES_FROM_DATABASE);
            return {
                values: [],
                httpStatus: 400
            };
        }
    }
    static async findByID(entity, id) {
        try {
            const entityID = Number(id);
            const entityRepository = connection_1.connection.getRepository(entity);
            const valueFound = await entityRepository.find({
                where: {
                    id: entityID
                }
            });
            if (valueFound.length === 0)
                throw new Error('Nao foi encontrado');
            Terminal_1.default.show(Message_1.default.VALUE_WAS_FOUND);
            return {
                value: valueFound[0],
                message: Message_1.default.VALUE_WAS_FOUND
            };
        }
        catch (error) {
            Terminal_1.default.show(Message_1.default.VALUE_WAS_NOT_FOUND);
            return {
                value: undefined,
                message: Message_1.default.VALUE_WAS_NOT_FOUND
            };
        }
    }
    static async deleteValue(entity, object) {
        try {
            const entityRepository = connection_1.connection.getRepository(entity);
            await entityRepository.remove(object);
            Terminal_1.default.show(Message_1.default.VALUE_DELETED_FROM_DATABASE);
            return {
                httpStatus: 200,
                messageFromDelete: Message_1.default.VALUE_DELETED_FROM_DATABASE
            };
        }
        catch (error) {
            Terminal_1.default.show(Message_1.default.ERROR_AT_DELETE_FROM_DATABASE);
            return {
                httpStatus: 400,
                messageFromDelete: Message_1.default.ERROR_AT_DELETE_FROM_DATABASE
            };
        }
    }
    static async updateValue(repositoryType, id, object) {
        try {
            const entityID = Number(id);
            const entityRepository = connection_1.connection.getRepository(repositoryType);
            const valueFound = await entityRepository.find({
                where: {
                    id: entityID
                }
            });
            if (valueFound.length === 0)
                throw new Error("Não foi encontrado");
            await entityRepository.update(id, object);
            Terminal_1.default.show(Message_1.default.VALUE_WAS_UPDATED);
            return {
                httpStatus: 200,
                messageFromUpdate: Message_1.default.VALUE_WAS_UPDATED
            };
        }
        catch (error) {
            Terminal_1.default.show(Message_1.default.ERROR_AT_UPDATE_FROM_DATABASE);
            return {
                httpStatus: 400,
                messageFromUpdate: Message_1.default.ERROR_AT_UPDATE_FROM_DATABASE
            };
        }
    }
}
exports.default = Citi;
