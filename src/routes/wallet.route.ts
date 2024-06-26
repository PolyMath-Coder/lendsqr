import { Router } from "express";
import walletController from "../controllers/wallet.controller";
import userAuthentication from "../helpers/auth/auth";

const walletRouter = Router()

walletRouter.post('/fund-wallet', userAuthentication, walletController.fundWallet)

walletRouter.post('/fund/transfer', userAuthentication, walletController.fundTransfer)

walletRouter.post('/withdraw-fund', userAuthentication, walletController.fundWithdrawal)
export default walletRouter;