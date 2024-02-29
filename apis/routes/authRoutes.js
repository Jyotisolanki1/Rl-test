import express from 'express';
import { signUp ,signIn,signOut} from '../controllers/authController.js';

const router = express.Router();
router.post('/sign-up',signUp);
router.post('/sign-in',signIn);
router.get('/signout',signOut);

export default router