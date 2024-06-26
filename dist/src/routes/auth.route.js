"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const express_validator_1 = require("express-validator");
const validate_1 = __importDefault(require("../helpers/validator/validate"));
const authRouter = (0, express_1.Router)();
authRouter.post('/register', [
    (0, express_validator_1.check)('name')
        .isString(),
    (0, express_validator_1.check)('email')
        .isEmail()
        .withMessage('Enter a valid email address')
        .trim()
        .normalizeEmail({
        all_lowercase: true,
    }),
    (0, express_validator_1.check)('password')
        .isStrongPassword({
        minLength: 6,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    })
        .withMessage('Password must have at least 6 characters containing lowercase, uppercase, number and a special character'),
], validate_1.default, auth_controller_1.default.onboardUser);
exports.default = authRouter;
//# sourceMappingURL=auth.route.js.map