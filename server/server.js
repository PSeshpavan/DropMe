// PACKAGES IMPORTS
import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';
import http from 'http';

// CONFIG IMPORTS
import {connectDB} from './config/mongooseConnection.js';

// ROUTE IMPORTS
import userRoutes from './routes/user.routes.js';
import captainRoutes from './routes/captain.routes.js';
import mapsRoutes from './routes/maps.routes.js';
import rideRoutes from './routes/ride.routes.js';
import { initializeSocket } from './socket.js';

// SERVER CONFIGURATION
config();
const app = express();

// DATABASE CONNECTION
connectDB();

// MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ROUTES
app.use('/users', userRoutes);
app.use('/captain', captainRoutes);
app.use('/maps', mapsRoutes);
app.use('/rides', rideRoutes);

const server = http.createServer(app);
initializeSocket(server);

server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});