import express from 'express';
import { config } from 'dotenv';
import db from './db/db'
import router from './routes/routes';

config();

const app = express();

app.use(express.json());
const PORT = process.env.PORT

app.use('/api/', router)

app.post('/love', async (req, res) => {
    const payload = {name: 'ayo', email: 'o;mmy@gmail.com', password: 'password'}

   const check = await db('users').where('email', 'o;mmy@gmail.com')
   console.log(check)
   // const data = await db('users').insert(payload)

  //  console.log(data)
  
    //res.json(data)
})


app.listen(3000, () => {
    console.log(`Server now live at port ${PORT} `)
});