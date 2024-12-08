// PACKAGES IMPORTS
import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import {connectDB} from './config/mongooseConnection.js';

// ROUTE IMPORTS
import userRoutes from './routes/user.routes.js';



// SERVER CONFIGURATION
config();
const app = express();

// DATABASE CONNECTION
connectDB();

// MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/users', userRoutes);



app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});