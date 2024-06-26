import type { Request, Response } from 'express'
import walletService from '../services/wallet.service'
import StatusCodes from '../helpers/enums/statusCodes';

class WalletController {
    async fundWallet (req: Request, res: Response) {
    try {
        await walletService.fundWallet(req.user.email, req.body.amount)

        res.status(200).json({
           status: true,
           message: 'wallet funded successfully...'
        })
    } catch (error) {
        return res.status(StatusCodes.ServerErrorInternal).json({
			status: false,
			message: 'unable to fund wallet...',
			data: null,
		});
    };  
    };

    async fundTransfer(req: Request, res: Response) {
        try {
        await walletService.fundTransfer(req.user.email, req.body.userId, req.body.amount);
        res.status(200).json({
            status: true,
            message: 'fund transfer successful...'
         })
        } catch(error) {
            return res.status(StatusCodes.ServerErrorInternal).json({
                status: false,
                message: 'unable to transfer funds...',
                data: null,
            });
        }
    }

    async fundWithdrawal (req: Request, res: Response) {
        try {
            await walletService.fundWithdrawal(req.user.email, req.body.amount)
            res.status(200).json({
                status: true,
                message: 'fund withdrawal successful...'
             })
        } catch(error) {
            return res.status(StatusCodes.ServerErrorInternal).json({
                status: false,
                message: 'unable to withdraw funds...',
                data: null,
            });
        }
        await walletService.fundWallet(req.user.email, req.body.amount)

        res.status(200).json({
           status: true,
           message: 'wallet funded successfully...'
        })
    }
}

export default new WalletController()