import express from 'express'
import {regSection1,regSection2} from '../Controllers/registrationController.js'
import protect from '../auth/verifyToken.js'

const router = express.Router();
router.post('/register-section1',protect,regSection1)
router.post('/register-section2',protect,regSection2)
export default router;