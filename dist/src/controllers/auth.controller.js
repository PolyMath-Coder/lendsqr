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
const auth_service_1 = __importDefault(require("../services/auth.service"));
const statusCodes_1 = __importDefault(require("../helpers/enums/statusCodes"));
class AuthController {
    onboardUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password } = req.body;
                const checkEmail = yield auth_service_1.default.findUserByEmail(email.toLowerCase());
                if (checkEmail.length !== 0) {
                    return res.status(200).json({ status: false, message: 'Oops! email already exists...' });
                }
                const hashedPassword = yield auth_service_1.default.hashPasswordBcrypt(password);
                yield auth_service_1.default.karmaLookUp(email);
                yield auth_service_1.default.registerUser(name, email.toLowerCase(), hashedPassword);
                const jwt = yield auth_service_1.default.signJWTtoken(req.body);
                res.status(statusCodes_1.default.SuccessOK).json({
                    status: 'success',
                    message: 'user creation successful...',
                    token: jwt
                });
            }
            catch (error) {
                return res.status(statusCodes_1.default.ServerErrorInternal).json({
                    status: false,
                    message: 'unable to create user',
                    data: null,
                });
            }
        });
    }
}
exports.default = new AuthController();
//# sourceMappingURL=auth.controller.js.map