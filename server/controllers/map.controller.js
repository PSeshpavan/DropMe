import { validationResult } from 'express-validator';
import {getAddressCoordinateService, getDistanceTimeService, getSuggestionsService} from '../services/maps.service.js';
import Captain from '../models/captain.model.js';

// NOTE - ALL ERRORS MUST BE HANDLED SO THAT THE FLOW DOES NOT STOP

export async function getCoordinates (req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { address } = req.query;
    try{
        const coordinates = await getAddressCoordinateService(address);
        res.status(200).json(coordinates);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getDistanceTime (req, res, next) {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { origin, destination } = req.query;

        const distanceTime = await getDistanceTimeService(origin, destination);

        res.status(200).json(distanceTime);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export async function getSuggestions (req, res, next) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { input } = req.query;

        const suggestions = await getSuggestionsService(input);

        res.status(200).json(suggestions);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export async function getCaptainInRadius (ltd, lng, radius){
     // radius in km


    const captains = await Captain.find({
        location: {
            $geoWithin: {
                $centerSphere: [ [ ltd, lng ], radius / 6371 ]
            }
        }
    });

    return captains;
}