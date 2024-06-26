"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const statusCodes_1 = __importDefault(require("../enums/statusCodes"));
// import StatusCodes from './enums/statusCodes';
const inputValidator = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const errorsArray = errors.array();
        return res.status(statusCodes_1.default.ClientErrorUnprocessableEntity).json({
            status: false,
            message: errorsArray[0].msg,
            data: null,
        });
    }
    // no error
    next();
};
exports.default = inputValidator;
//# sourceMappingURL=validate.js.map