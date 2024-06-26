import { config } from 'dotenv';
config()

const configInv = {
    JWT_SECRET: process.env.JWT_SECRET,
    LENDSQR_SECRET_KEY: process.env.LENDSQR_SECRET_KEY,
    ADJUTOR_BASE_URL: process.env.ADJUTOR_BASE_URL,
    HOST: process.env.HOST,
    USER: process.env.USER,
    PASSWORD: process.env.PASSWORD,
    DATABASE: process.env.DATABASE

}

export default configInv;