import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRouter from './routes/authRoutes.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
dotenv.config();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log('MongoDB connected');
}).catch((err)=>{
    console.error(err);
});
const __dirname = path.resolve();
const app = express();
app.use(cookieParser())
app.use(cors({
    origin:process.env.ClIENT,
    credentials:true
}))

app.use(express.json());
app.listen(3000, ()=>{
    console.log("your port is working on " + 3000)
})




app.use('/api/auth', authRouter);



app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})

// error handing for internal servar
app.use((err,req,res,next)=>{
 const statusCode = err.statusCode || 500;
 const message = err.message || "Internal server error";
 return res.status(statusCode).json({
    success: false,
    statusCode,
    message
 })
})