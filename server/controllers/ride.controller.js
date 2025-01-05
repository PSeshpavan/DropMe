import { confirmRideService, createRideService, endRideService, getFareService, getOTPService, startRideService } from '../services/ride.service.js'
import { validationResult } from 'express-validator'
import Ride from '../models/ride.model.js'
import { getAddressCoordinateService, getCaptainInRadius } from '../services/maps.service.js'
import { sendMessageToSocketId } from '../socket.js'

export async function createRide(req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { pickup, destination, vehicleType } = req.body;

    try {
        const ride = await createRideService({
            user: req.user._id,
            pickup,
            destination,
            vehicleType
        })
        res.status(201).json({ message: 'Ride created successfully', ride });
        const pickupCoordinates = await getAddressCoordinateService(pickup);

        console.log(pickupCoordinates);

        const captainsInRadius = await getCaptainInRadius(pickupCoordinates.ltd, pickupCoordinates.lng, 10);

        ride.otp = ""

        const rideWithUser = await Ride.findOne({ _id: ride._id }).populate('user');

        captainsInRadius.map(async (captain) => {
            sendMessageToSocketId(captain.socketId, {
                event: 'new-ride',
                data: rideWithUser
            })
        })

        
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}

export async function getFare(req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    // console.log(req)

    const { pickup, destination } = req.query;

    try {
        const fare = await getFareService(pickup, destination)
        return res.status(200).json(fare);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}

export async function confirmRide(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { rideId } = req.body;
    try {
        const ride = await confirmRideService({ rideId, captain: req.captain });
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data: ride
        })
        return res.status(200).json(ride);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err.message });
    }
}

// module.exports.startRide = async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     const { rideId, otp } = req.query;

//     try {
//         const ride = await rideService.startRide({ rideId, otp, captain: req.captain });

//         console.log(ride);

//         sendMessageToSocketId(ride.user.socketId, {
//             event: 'ride-started',
//             data: ride
//         })

//         return res.status(200).json(ride);
//     } catch (err) {
//         return res.status(500).json({ message: err.message });
//     }
// }


// module.exports.endRide = async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     const { rideId } = req.body;

//     try {
//         const ride = await rideService.endRide({ rideId, captain: req.captain });

//         sendMessageToSocketId(ride.user.socketId, {
//             event: 'ride-ended',
//             data: ride
//         })



//         return res.status(200).json(ride);
//     } catch (err) {
//         return res.status(500).json({ message: err.message });
//     }
// }