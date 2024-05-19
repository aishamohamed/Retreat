import express from 'express';
import { login } from './authLogin.js';

const router = express.Router();

// Login route
router.post('/login', login);

export default router;




