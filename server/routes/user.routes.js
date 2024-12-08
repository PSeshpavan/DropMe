import express from "express";
import { body } from "express-validator";
import { loginUser, registerUser } from "../controllers/user.controller.js";


const router = express.Router();

router.post('/register', [
    body('email').isEmail().withMessage('Invalid email address'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('Firstname must be at least 3 characters long'),
    body('fullname.lastname').isLength({ min: 3 }).withMessage('Lastname must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], registerUser);

router.post('/login', [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], loginUser);

export default router;