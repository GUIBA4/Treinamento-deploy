"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./database/connection.ts");
const routes_1 = __importDefault(require("./routes"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const application = (0, express_1.default)();
application.use((0, cors_1.default)());
application.use(express_1.default.json());
application.use(routes_1.default);
application.listen(process.env.PORT || 3001, () => {
    console.log('📦 Server running');
});
