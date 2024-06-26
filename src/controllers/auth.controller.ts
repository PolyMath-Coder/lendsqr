import type {Request,  Response} from 'express'
import authService from '../services/auth.service'
import StatusCodes from '../helpers/enums/statusCodes';
import configInv from '../config/keys';


class AuthController {
async onboardUser(req: Request, res: Response) {
    try {
    const { name, email, password } = req.body
  
    const checkEmail = await authService.findUserByEmail(email.toLowerCase())
    if(checkEmail.length !== 0 ) {
        return res.status(200).json({status: false, message: 'Oops! email already exists...'});
    }
    const hashedPassword = await authService.hashPasswordBcrypt(password)

    await authService.karmaLookUp(email)
   
    await authService.registerUser(name, email.toLowerCase(), hashedPassword)
  
    const jwt = await authService.signJWTtoken(req.body);
    res.status(StatusCodes.SuccessOK).json({
        status: 'success', 
        message: 'user creation successful...',
        token: jwt
    })
    } catch(error) {
        return res.status(StatusCodes.ServerErrorInternal).json({
			status: false,
			message: 'unable to create user',
			data: null,
		});
    }
    
}
}

export default new AuthController ()