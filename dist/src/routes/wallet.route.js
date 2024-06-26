"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const wallet_controller_1 = __importDefault(require("../controllers/wallet.controller"));
const auth_1 = __importDefault(require("../helpers/auth/auth"));
const walletRouter = (0, express_1.Router)();
walletRouter.post('/fund-wallet', auth_1.default, wallet_controller_1.default.fundWallet);
walletRouter.post('/fund/transfer', auth_1.default, wallet_controller_1.default.fundTransfer);
walletRouter.post('/withdraw-fund', auth_1.default, wallet_controller_1.default.fundWithdrawal);
exports.default = walletRouter;
//# sourceMappingURL=wallet.route.js.map