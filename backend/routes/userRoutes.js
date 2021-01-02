import express from 'express'
const router = express.Router();
import {authUser,getUserProfile, regUser, updateUserProfile} from '../controllers/userController.js';
import {protect} from '../middleware/authMiddleware.js';

router.post('/',regUser)
router.post('/login',authUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

export default router;