import express from 'express';
import { config } from 'dotenv';
import db from './config/db'
import router from './routes/routes';
import type { Request, RequestHandler, Response } from 'express'
import StatusCodes from './helpers/enums/statusCodes';


config();

const app = express();

app.use(express.json());
const PORT = process.env.PORT

app.use('/api/', router)

app.get('/', (req: Request, res: Response) => {
    res.status(StatusCodes.ClientErrorMethodNotAllowed).json({
		status: true,
		message: 'lendsqr server confirmed.',
	});
})

app.all('*', (req: Request, res: Response) => {
	res.status(StatusCodes.ClientErrorMethodNotAllowed).json({
		status: false,
		message: 'invalid route',
		data: null,
	});
});


app.listen(3000, () => {
    console.log(`Server now live at port ${PORT} `)
});