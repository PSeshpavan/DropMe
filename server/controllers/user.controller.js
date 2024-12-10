import User from "../models/user.model.js";
import createUser from "../services/user.service.js";
import { validationResult } from "express-validator";
import blacklistToken from "../models/blacklistToken.model.js";


export async function registerUser(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password } = req.body;

    const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

    const hashedPassword = await User.hashPassword(password);
    try {
        const user = await createUser({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashedPassword,
        });
        const token = await user.generateAuthToken();

        res.status(201).json({
            user,
            token,
        });
    } catch (err) {
        next(err);
    }
}

export async function loginUser(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = await user.generateAuthToken();

        res.cookie('token', token);

        res.status(200).json({
            user,
            token,
        });

    } catch (err) {
        next(err);
    }
}

export async function getUserProfile(req, res, next) {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({
            user,
        });
    } catch (err) {
        next(err);
    }
}

export async function logoutUser(req, res, next) {
    try {
        const token = req.cookies.token || req.headers.authorization.split(' ')[1];
        
        await blacklistToken.create({ token });

        res.clearCookie('token');
        res.status(200).json({ message: 'Logout successful' });
    } catch (err) {
        next(err);
    }
}