"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAuthentication = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const keys_1 = __importDefault(require("../../config/keys"));
const statusCodes_1 = __importDefault(require("../enums/statusCodes"));
const userAuthentication = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const key = String(keys_1.default.JWT_SECRET);
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (token == null) {
            return res.status(statusCodes_1.default.ClientErrorUnauthorized).json({
                status: false,
                message: 'Invalid authentication data',
                data: null,
            });
        }
        const verifiedUser = jsonwebtoken_1.default.verify(String(token), key, {
            algorithms: ['HS256'],
        });
        req.user = {
            name: verifiedUser.name,
            email: verifiedUser.email
        };
        next();
    }
    catch (err) {
        return res.status(statusCodes_1.default.ClientErrorUnauthorized).json({
            status: false,
            message: 'Invalid authentication token',
            data: null,
        });
    }
});
exports.userAuthentication = userAuthentication;
exports.default = exports.userAuthentication;
//# sourceMappingURL=auth.js.map