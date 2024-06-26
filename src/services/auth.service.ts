import axios, { isAxiosError } from "axios";
import db from "../config/db";
import { UserPayload, userObject } from "../helpers/interface/auth.interface";
import { response } from "express";
import bcrypt from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import configInv from "../config/keys";
const jwtSigningKey = String(configInv.JWT_SECRET);
// import { config } from 'dotenv';
// config()

class AuthService {
    async findUserByEmail (email: string) {
      return await db('users').where('email', email);
    }
    
    async registerUser (name: string, email: string, password: string) {
      return await db('users').insert({name, email, password});
    };

    async hashPasswordBcrypt (password: string): Promise<string> {
      const hashed_password = await bcrypt.hash(password, 10);
      return hashed_password;
    };

   
  async signJWTtoken (userPayload: userObject) {
	  return sign(userPayload, jwtSigningKey, { expiresIn: '4h' });
  };
   
    async karmaLookUp (email: string ) {
      try {
      const lendsqrHeaders = {
        Authorization: `Bearer ${configInv.LENDSQR_SECRET_KEY}`
      }
      const response = await axios.get(`${configInv.ADJUTOR_BASE_URL}/:${email}`,  
        { headers: lendsqrHeaders }
      )
      return {
        status: false, 
        message: 'user not eligible to sign-up'
      };
    } catch(error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          return
        }
      throw new Error('resource not found');
    }
    }
}

export default new AuthService ()