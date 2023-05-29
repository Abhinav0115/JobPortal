import { Router } from "express";
import validateToken from "../middleware/tokenValidation.js";
import {
  applyJob,
  change_application_status,
  getAllApplicationsOfSpecifiedJob,
  getAllJobs,
  getApplicationDetail,
  getAppliedJobs,
  getPostedJobs,
  getSpecifiedJob,
  postAJob,
} from "../controllers/job.controller.js";
import AuthRoles from "../utils/authRoles.js";
import { authorize } from "../middleware/role.validation.js";

const router = Router();

router.post("/postAJob", validateToken, authorize(AuthRoles.ADMIN,AuthRoles.EMPLOYER), postAJob);
router.get("/getAllJobs", validateToken,authorize(AuthRoles.ADMIN,AuthRoles.STUDENT), getAllJobs);
router.get("/getSpecifiedJob", validateToken,authorize(AuthRoles.ADMIN,AuthRoles.STUDENT), getSpecifiedJob);
router.post("/applyJob", validateToken,authorize(AuthRoles.ADMIN,AuthRoles.STUDENT), applyJob);
router.get("/getAppliedJobs", validateToken,authorize(AuthRoles.ADMIN,AuthRoles.STUDENT) , getAppliedJobs);
router.get("/getPostedJobs", validateToken,authorize(AuthRoles.ADMIN,AuthRoles.EMPLOYER), getPostedJobs);
router.get(
  "/getAllApplicationsOfSpecifiedJob",
  validateToken,
  authorize(AuthRoles.ADMIN,AuthRoles.EMPLOYER),
  getAllApplicationsOfSpecifiedJob
);
router.put("/responseOfApplication", validateToken, authorize(AuthRoles.ADMIN,AuthRoles.EMPLOYER) , change_application_status);
router.get("/getApplicationDetail", validateToken,authorize(AuthRoles.ADMIN,AuthRoles.EMPLOYER) , getApplicationDetail);

export default router;
