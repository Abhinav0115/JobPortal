import Joi from "joi";
import AppliedJob from "../models/ApplyJob.js";
import Job from "../models/Job.js";
import mailHelper from "../service/mailHelper.js";
import User from "../models/User.js";

import formidable from "formidable";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import asyncHandler from "../service/asyncHandler.js";

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  about: Joi.string().required(),
  job: Joi.string().required(),
  user: Joi.string().required(),
  cv:Joi.string().required()
});

const postSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  user: Joi.required(),
  email: Joi.string().email().required(),
  company: Joi.string().required(),
  job_category: Joi.string().required(),
  job_type: Joi.string().required(),
  job_experience: Joi.string().required(),
  job_vacancy: Joi.number().required(),
  job_deadline: Joi.date().required(),
  salary: Joi.number().required(),
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export const applyJob = asyncHandler(async (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Error", err);
      throw err;
    }
    
    const jobApplication = {
      name: fields.name,
      email: fields.email,
      about: fields.about,
      job: fields.job,
      user: fields.user,
      cv: fields.cv,
    };

    const { name, email, about, job, user , cv } = jobApplication;

    const { error } = schema.validate({ name, email, about, job, user , cv });
    if (error)
      return res.status(401).json({
        success: false,
        message: error.details[0].message.replace(/['"]+/g, ""),
      });

    const newJobApplication = await AppliedJob.create(jobApplication);
    return res.status(200).json({
      success: true,
      message: "Job application submitted successfully !",
    });
  });
});

export const getAllApplicationsOfSpecifiedJob = asyncHandler(
  async (req, res) => {
    const data = req.query;
    const id = data?.id;

    if (!id)
      return res.status(400).json({ success: false, message: "Please Login" });

    const gettingjobs = await AppliedJob.find({ job: id }).populate("user");
    return res.status(200).json({ success: true, data: gettingjobs });
  }
);

export const getAllJobs = asyncHandler(async (req, res) => {
  const gettingjobs = await Job.find({}).populate("user");
  return res.status(200).json({ success: true, data: gettingjobs });
});

export const getApplicationDetail = asyncHandler(async (req, res) => {
  const data = req.query;
  const id = data?.id;

  if (!id)
    return res.status(400).json({ success: false, message: "Please Login" });

  const getApplicationDetails = await AppliedJob.findById(id)
    .populate("job")
    .populate("user");
  return res.status(200).json({ success: true, data: getApplicationDetails });
});

export const getAppliedJobs = asyncHandler(async (req, res) => {
  const userId = req.query.id;

  if (!userId)
    return res.status(400).json({ success: false, message: "Please Login" });

  const gettingAppliedJobs = await AppliedJob.find({ user: userId })
    .populate("user")
    .populate("job");
  return res.status(200).json({ success: true, data: gettingAppliedJobs });
});

export const getPostedJobs = asyncHandler(async (req, res) => {
  const data = req.query;
  const id = data?.id;

  if (!id)
    return res.status(400).json({ success: false, message: "Please Login" });

  const gettingjobs = await Job.find({ user: id }).populate(
    "user"
  );
  return res.status(200).json({ success: true, data: gettingjobs });
});

export const getSpecifiedJob = asyncHandler(async (req, res) => {
  const data = req.query;
  const id = data?.id;

  if (!id)
    return res.status(400).json({ success: false, message: "Please Login" });

  const gettingjobs = await Job.findById(id).populate("user");
  return res.status(200).json({ success: true, data: gettingjobs });
});

export const postAJob = asyncHandler(async (req, res) => {
  const data = req.body;
  const {
    user,
    title,
    description,
    salary,
    company,
    email,
    job_category,
    job_type,
    job_experience,
    job_vacancy,
    job_deadline,
  } = data;
  const { error } = postSchema.validate({
    user,
    title,
    description,
    salary,
    company,
    email,
    job_category,
    job_type,
    job_experience,
    job_vacancy,
    job_deadline,
  });

  if (error)
    return res.status(401).json({
      success: false,
      message: error.details[0].message.replace(/['"]+/g, ""),
    });

  const creatingUser = await Job.create({
    user,
    title,
    description,
    salary,
    company,
    email,
    job_category,
    job_type,
    job_experience,
    job_vacancy,
    job_deadline,
  });
  return res
    .status(200)
    .json({ success: true, message: "Job Posted Successfully !" });
});

export const change_application_status = asyncHandler(async (req, res) => {
  const data = req.body;
  const { status, id, email } = data;

  if (!id)
    return res.status(400).json({ success: false, message: "Please Login" });

  const gettingjobs = await AppliedJob.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );
  const user = await User.find({email})
  const job = await Job.findById(gettingjobs.job)
  const htmlMessage = `
  <!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Your Application Status Update</title>
</head>
<body>
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h2 style="color: #333;">Application Status Update</h2>
    <p>Hello ${user[0].name || "User"},</p>
    <p>We wanted to inform you that the status of your application for the <b> ${job?.title} </b> role at <b>${job?.company}</b> has changed to <b style="text-transform:uppercase" >${status}</b>.</p>
    
    <p>Please log in to your account on our website for more information.</p>
    <p>If you have any questions or need further assistance, please feel free to contact us.</p>
    <p>Best regards,<br> OP Jindal University</p>
  </div>
</body>
</html>
`

  try {
    await mailHelper({
        email: email,
        subject: `Application Status Change`,
        htmlMessage
    })
} catch (error) {
    console.log("email could not be sent")
}
  return res.status(200).json({
    success: true,
    message: "Status Updated Successfully ",
    data: gettingjobs,
  });
});
