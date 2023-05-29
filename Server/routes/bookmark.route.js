import { bookmark_my_job, delete_bookmark_job, getBookmark_jobs  } from "../controllers/bookmark.controller.js";
import { Router } from "express";
import validateToken from "../middleware/tokenValidation.js";

const router = Router();

router.get('/',validateToken,getBookmark_jobs)
router.post('/',validateToken,bookmark_my_job)
router.delete('/',validateToken,delete_bookmark_job)

export default router