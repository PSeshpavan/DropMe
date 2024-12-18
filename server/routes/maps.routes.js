import Router from 'express';
import { query } from 'express-validator';
import {getCoordinates, getDistanceTime, getSuggestions} from '../controllers/map.controller.js';
import { authUser } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/get-coordinates',
    query('address').isString().isLength({ min: 3 }).withMessage('Address is required'),
    authUser, getCoordinates);


router.get('/get-distance-time',
    query('origin').isString().isLength({ min: 3 }),
    query('destination').isString().isLength({ min: 3 }),
    authUser,
    getDistanceTime
);

router.get('/get-suggestions',
    query('input').isString().isLength({ min: 3 }),
    authUser,
    getSuggestions
)

export default router;