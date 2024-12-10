import Captain from "../models/captain.model.js";
import { validationResult } from "express-validator";
import blacklistToken from "../models/blacklistToken.model.js";
import createCaptain from "../services/captain.service.js";

export const registerCaptain = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        fullname,
        email,
        password,
        vehicle
    } = req.body;

    // if captain exists
    const captainExists = await Captain.findOne({ email });
    if (captainExists) {
        return res.status(400).json({ message: "Captain already exists" });
    }

    try {
        const hashedPassword = await Captain.hashPassword(password);

        const captain = await createCaptain({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashedPassword,
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType,
        });

        const token = await captain.generateAuthToken();
        return res.status(201).json({
            captain,
            token,
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }


}

export const loginCaptain = async (req, res) => {
    const { email, password } = req.body;

    const captain = await Captain.findOne({ email }).select('+password');

    if (!captain) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await captain.comparePassword(password);

    if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    
    const token = await captain.generateAuthToken();
    
    res.cookie('token', token);
    return res.status(200).json({
        captain,
        token,
    });
}

export const getCaptainProfile = async (req, res) => {
    res.status(200).json({
        captain: req.captain,
    });
}

export const logoutCaptain = async (req, res) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

        await blacklistToken.create({ token });

        res.clearCookie('token');
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}