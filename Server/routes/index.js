import { Router } from "express";
import authRoutes from './auth.route.js'
import bookmarkRoutes from './bookmark.route.js'
import jobRoutes from './job.route.js'

const router = Router();

router.use('/auth',authRoutes)
router.use('/job/bookmark',bookmarkRoutes)
router.use('/job',jobRoutes)

export default router;