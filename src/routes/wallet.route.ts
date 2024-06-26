import { Router } from "express";
import walletController from "../controllers/wallet.controller";
import userAuthentication from "../helpers/auth/auth";
import { check } from "express-validator";
import inputValidator from "../helpers/validator/validate";

const walletRouter = Router()

// [
//     check('temp_token')
//         .isLength({ min: 10, max: 40 })
//         .withMessage('Email token required')
//         .trim(),
walletRouter.post('/fund-wallet',
    [
        check('amount')
        .isNumeric()
        .withMessage('valid amount to fund wallet required')
        .trim()
    ],
    inputValidator,
    userAuthentication, 
    walletController.fundWallet)

walletRouter.post('/fund/transfer', 
    [
        check('amount')
        .isNumeric()
        .withMessage('valid amount to transfer required')
        .trim(),

        check('userId')
        .isNumeric()
        .withMessage('valid id of beneficiary required')
        .trim()  
    ],
    inputValidator,
    userAuthentication, 
    walletController.fundTransfer)

walletRouter.post('/withdraw-fund', 
    [
        check('amount')
        .isNumeric()
        .withMessage('valid amount to transfer required')
        .trim(),

    ],
    inputValidator,
    userAuthentication, 
    walletController.fundWithdrawal)
export default walletRouter;