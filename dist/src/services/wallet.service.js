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
const db_1 = __importDefault(require("../config/db"));
class WalletService {
    fundWallet(email, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield (0, db_1.default)('users').where('email', email);
                yield (0, db_1.default)('users')
                    .where({ email })
                    .update({
                    wallet_balance: +user[0].wallet_balance + amount,
                });
                return;
            }
            catch (err) {
                throw new Error(`system error... `);
            }
        });
    }
    fundTransfer(email, userId, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const beneficiary = yield (0, db_1.default)('users').where('id', userId);
                if (beneficiary[0].length == 0) {
                    throw new Error('user not found');
                }
                const user = yield (0, db_1.default)('users').where('email', email);
                if (+user[0].wallet_balance < amount) {
                    throw new Error('Oops! insufficient funds for transaction');
                }
                yield (0, db_1.default)('users')
                    .where({ email })
                    .update({
                    wallet_balance: +user[0].wallet_balance - amount,
                });
                yield (0, db_1.default)('users')
                    .where({ id: userId })
                    .update({
                    wallet_balance: +user[0].wallet_balance + amount,
                });
                return;
            }
            catch (error) {
                throw new Error('system error');
            }
        });
    }
    fundWithdrawal(email, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield (0, db_1.default)('users').where('email', email);
                if (+user[0].wallet_balance < amount) {
                    throw new Error('insufficient funds for withdrawal');
                }
                yield (0, db_1.default)('users')
                    .where({ email })
                    .update({
                    wallet_balance: +user[0].wallet_balance - amount,
                });
                return;
            }
            catch (error) {
                throw new Error('system error');
            }
        });
    }
}
exports.default = new WalletService();
//# sourceMappingURL=wallet.service.js.map