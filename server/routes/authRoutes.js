import express from 'express';
import {
  registerAdmin,
  loginAdmin,
  checkAuth,
  logoutAdmin
} from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.get('/check-auth', checkAuth);
router.post('/logout', logoutAdmin);

export default router;
