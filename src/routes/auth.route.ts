import {Router} from 'express';
import AuthController from '../controllers/auth.controller';
import { check } from 'express-validator';
import inputValidator from '../helpers/validator/validate';

const authRouter = Router()


authRouter.post(
    '/register',
    [
        check('name')
            .isString(),
        check('email')
            .isEmail()
            .withMessage('Enter a valid email address')
            .trim()
            .normalizeEmail({
                all_lowercase: true,
            }),
        check('password')
            .isStrongPassword({
                minLength: 6,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1,
            })
            .withMessage(
                'Password must have at least 6 characters containing lowercase, uppercase, number and a special character'
        ),
        
    ], 
    inputValidator,
    AuthController.onboardUser)

export default authRouter;