import express from 'express';
import dotenv from 'dotenv';
import databaseConnection from './config/database.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoute.js';
import tweetRoutes from './routes/tweetRoute.js';
import cors from 'cors';
dotenv.config({
    path: './.env'   
});

databaseConnection();

const app = express();
// const PORT = 8080;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200
};
app.use(cors(corsOptions));
// app.get('/home', (req, res) => {
//     res.send('Hello World');
// }) 

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/tweet', tweetRoutes);
app.use


app.listen(process.env.PORT, () => {
    console.log(`Server started on ${process.env.PORT}`);
    });