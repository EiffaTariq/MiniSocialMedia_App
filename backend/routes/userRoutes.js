import express from 'express'
import { isAuth } from '../middleware/isAuth.js';
import { followandUnfollowUser, myProfile, userProfile, updateProfile, updatePassword, getAllUser, getUser } from '../controllers/userControllers.js';
import uploadFile from '../middleware/multer.js';
import { getUserPosts } from '../controllers/postControllers.js';

const router = express.Router();

router.get('/me', isAuth, myProfile);
router.get('/all', isAuth, getAllUser);
router.get('/:id', getUser);
router.get('/:id', isAuth, userProfile);
router.post("/:id", isAuth, updatePassword);
router.put('/:id', isAuth, uploadFile,  updateProfile);
router.post('/follow/:id', isAuth, followandUnfollowUser);


router.get("/:id/posts", getUserPosts);

export default router;
