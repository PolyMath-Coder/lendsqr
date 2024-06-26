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
const wallet_service_1 = __importDefault(require("../services/wallet.service"));
const statusCodes_1 = __importDefault(require("../helpers/enums/statusCodes"));
class WalletController {
    fundWallet(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield wallet_service_1.default.fundWallet(req.user.email, req.body.amount);
                res.status(200).json({
                    status: true,
                    message: 'wallet funded successfully...'
                });
            }
            catch (error) {
                return res.status(statusCodes_1.default.ServerErrorInternal).json({
                    status: false,
                    message: 'unable to fund wallet...',
                    data: null,
                });
            }
            ;
        });
    }
    ;
    fundTransfer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield wallet_service_1.default.fundTransfer(req.user.email, req.body.userId, req.body.amount);
                res.status(200).json({
                    status: true,
                    message: 'fund transfer successful...'
                });
            }
            catch (error) {
                return res.status(statusCodes_1.default.ServerErrorInternal).json({
                    status: false,
                    message: 'unable to transfer funds...',
                    data: null,
                });
            }
        });
    }
    fundWithdrawal(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield wallet_service_1.default.fundWithdrawal(req.user.email, req.body.amount);
                res.status(200).json({
                    status: true,
                    message: 'fund withdrawal successful...'
                });
            }
            catch (error) {
                return res.status(statusCodes_1.default.ServerErrorInternal).json({
                    status: false,
                    message: 'unable to withdraw funds...',
                    data: null,
                });
            }
            yield wallet_service_1.default.fundWallet(req.user.email, req.body.amount);
        });
    }
}
exports.default = new WalletController();
//# sourceMappingURL=wallet.controller.js.map