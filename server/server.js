import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import conectDB from './configs/mongodb.js';
import { clerkWebhooks } from './controllers/webhooks.js';


//Initialize Express
const app = express()

//Connect to DB
await conectDB()

//Middleware

app.use(cors());

app.get('/',(req,res)=>{
    res.send("api working")
})
app.post('/clerk' ,express.json(),clerkWebhooks)

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})

