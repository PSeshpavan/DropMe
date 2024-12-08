import User from "../models/user.model.js";
import createUser from "../services/user.service.js";
import { validationResult } from "express-validator";


export async function registerUser(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password } = req.body;

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

        res.status(200).json({
            user,
            token,
        });

    } catch (err) {
        next(err);
    }
}