import {Router} from 'express'
import authRouter from './auth.route';

const router = Router()

router.post('/auth/', authRouter);


export default router;