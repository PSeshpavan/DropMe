import Router from 'express'
import { body, query } from 'express-validator'
import  { createRide, getFare, confirmRide, startRide, endRide } from '../controllers/ride.controller.js'
import {authUser, authCaptain} from '../middlewares/auth.middleware.js'


const router = Router();

router.post('/create', authUser,[
    body('pickup').isString().isLength({ min: 3 }).withMessage('Pickup is required'),
    body('destination').isString().isLength({ min: 3 }).withMessage('Destination is required'),
    body('vehicleType').notEmpty().isIn(['car', 'motorcycle', 'auto']).withMessage('Vehicle type is required'),
] ,createRide);

router.get('/get-fare', authUser,
    query('pickup').isString().isLength({ min: 3 }).withMessage('Pickup is required'),
    query('destination').isString().isLength({ min: 3 }).withMessage('Destination is required')
    , getFare);

router.post('/confirm',
    authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    confirmRide
)

router.get('/start-ride',
    authCaptain,
    query('rideId').isMongoId().withMessage('Invalid ride id'),
    query('otp').isString().isLength({ min: 6, max: 6 }).withMessage('Invalid OTP'),
    startRide
)

router.post('/end-ride',
    authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    endRide
)

export default router;