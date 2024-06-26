import { validationResult } from 'express-validator';
import { type Request, type Response, type NextFunction } from 'express';
import StatusCodes from '../enums/statusCodes';
// import StatusCodes from './enums/statusCodes';

const inputValidator = (req: Request, res: Response, next: NextFunction) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const errorsArray = errors.array();
		return res.status(StatusCodes.ClientErrorUnprocessableEntity).json({
			status: false,
			message: errorsArray[0].msg,
			data: null,
		});
	}

	// no error
	next();
};
export default inputValidator;
