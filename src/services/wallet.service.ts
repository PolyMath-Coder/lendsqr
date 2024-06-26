import db from "../config/db"


class WalletService {
    async fundWallet (email: string, amount: number) {
    try {       
        const user = await db('users').where('email', email)
        await db('users')
        .where({ email})
        .update({
            wallet_balance: +user[0].wallet_balance + amount,
        }) 
        return
    } catch(err) {
        throw new Error(`system error... `);
    }
}

async fundTransfer (email: string, userId: number, amount: number) {
    try {
        const beneficiary = await db('users').where('id', userId);
        if(beneficiary[0].length == 0) {
            throw new Error('user not found')
        }
        const user = await db('users').where('email', email);
        if(+user[0].wallet_balance < amount) {
            throw  new Error('Oops! insufficient funds for transaction')
        }
            
        await db('users')
        .where({ email })
        .update({
            wallet_balance: +user[0].wallet_balance - amount,
        }) 
        await db('users')
        .where({ id: userId })
        .update({
            wallet_balance: +user[0].wallet_balance + amount,
        }) 
        return
    } catch(error) {
        throw new Error('system error')
    }
   
    }

    async fundWithdrawal (email: string, amount: number) {
        try {
            const user = await db('users').where('email', email)
            if(+user[0].wallet_balance < amount) {
                throw new Error('insufficient funds for withdrawal')
            }
            await db('users')
            .where({ email })
            .update({
                wallet_balance: +user[0].wallet_balance - amount,
            }) 
            return
        } catch(error) {
            throw new Error('system error')
        }
        }
}



export default new WalletService ()