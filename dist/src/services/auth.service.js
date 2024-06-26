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
const axios_1 = __importDefault(require("axios"));
const db_1 = __importDefault(require("../config/db"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = require("jsonwebtoken");
const keys_1 = __importDefault(require("../config/keys"));
const jwtSigningKey = String(keys_1.default.JWT_SECRET);
// import { config } from 'dotenv';
// config()
class AuthService {
    findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, db_1.default)('users').where('email', email);
        });
    }
    registerUser(name, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, db_1.default)('users').insert({ name, email, password });
        });
    }
    ;
    hashPasswordBcrypt(password) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashed_password = yield bcryptjs_1.default.hash(password, 10);
            return hashed_password;
        });
    }
    ;
    signJWTtoken(userPayload) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, jsonwebtoken_1.sign)(userPayload, jwtSigningKey, { expiresIn: '4h' });
        });
    }
    ;
    karmaLookUp(email) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const lendsqrHeaders = {
                    Authorization: `Bearer ${keys_1.default.LENDSQR_SECRET_KEY}`
                };
                const response = yield axios_1.default.get(`${keys_1.default.ADJUTOR_BASE_URL}/:${email}`, { headers: lendsqrHeaders });
                return {
                    status: false,
                    message: 'user not eligible to sign-up'
                };
            }
            catch (error) {
                if (axios_1.default.isAxiosError(error) && ((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) === 404) {
                    return;
                }
                throw new Error('resource not found');
            }
        });
    }
}
exports.default = new AuthService();
//# sourceMappingURL=auth.service.js.map