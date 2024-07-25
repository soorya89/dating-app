import express from 'express'
import protect from '../auth/verifyToken.js'
import { updateUser,getSingleUser,getAllUser, getUserProfile, updatePhoto} from '../Controllers/userController.js';

const router = express.Router();

router.put('/:id',protect,updateUser)
router.get('/:id',protect,getSingleUser)
router.put('/:id',protect,updatePhoto)
router.get('/',protect,getAllUser)
router.get ('/profile/me',protect,getUserProfile)

export default router