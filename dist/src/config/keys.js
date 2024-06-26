"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const configInv = {
    JWT_SECRET: process.env.JWT_SECRET,
    LENDSQR_SECRET_KEY: process.env.LENDSQR_SECRET_KEY,
    ADJUTOR_BASE_URL: process.env.ADJUTOR_BASE_URL
};
exports.default = configInv;
//# sourceMappingURL=keys.js.map