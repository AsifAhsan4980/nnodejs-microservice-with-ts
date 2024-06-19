import express from 'express'

import logout from "../controllers/logoutController"
import protect from "../middlewares/auth";

const router = express.Router();

router.route('/')
    .post(protect,logout)


export default router