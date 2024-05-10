import express from 'express';
import { login , register } from './authController.js';

const router = express.Router();

// Login route
router.post('/login', login);

router.post('/register', register);

export default router;
