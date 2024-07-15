import express from 'express'
import {regSection1,regSection2,regSection3} from '../Controllers/registrationController.js'
import protect from '../auth/verifyToken.js'

const router = express.Router();
router.post('/register-section1',protect,regSection1)
router.post('/register-section2',protect,regSection2)
router.post('/register-section3',protect,regSection3)
export default router;