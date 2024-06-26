import { type Request, type Response, type NextFunction } from 'express';
import Jwt from 'jsonwebtoken';

import configInv from '../../config/keys';
import StatusCodes from '../enums/statusCodes';
import { UserPayload, type userObject } from '../interface/auth.interface';


export const userAuthentication = async (
	req: Request, 
	res: Response,
	next: NextFunction
): Promise<any> => {
	try {
		const key: string = String(configInv.JWT_SECRET);
		const token: any = req.headers.authorization?.split(' ')[1];

		if (token == null) {
			return res.status(StatusCodes.ClientErrorUnauthorized).json({
				status: false,
				message: 'Invalid authentication data',
				data: null,
			});
		}

		const verifiedUser = Jwt.verify(String(token), key, {
			algorithms: ['HS256'],
		}) as UserPayload;

		req.user = {
			name: verifiedUser.name,
			email: verifiedUser.email
		}

		next();
	} catch (err) {
		return res.status(StatusCodes.ClientErrorUnauthorized).json({
			status: false,
			message: 'Invalid authentication token',
			data: null,
		});
	}
};

export default userAuthentication;
