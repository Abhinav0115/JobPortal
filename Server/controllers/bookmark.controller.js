import bookMarkJob from '../models/Bookmark.js'
import Joi from "joi";
import asyncHandler from "../service/asyncHandler.js";

const schema = Joi.object({
  user: Joi.required(),
  job: Joi.required(),
});

export const bookmark_my_job = asyncHandler(async (req, res) => {
  const data = req.body;
  const { job, user } = data;

  const { error } = schema.validate({ job, user });

  if (error)
    return res.status(401).json({
      success: false,
      message: error.details[0].message.replace(/['"]+/g, ""),
    });

  const checkAlreadyBookMarked = await bookMarkJob.findOne({ job, user });
  if (checkAlreadyBookMarked)
    return res
      .status(401)
      .json({ success: false, message: "This Job is Already in Bookmark" });

  const bookmarkingJob = await bookMarkJob.create({ job, user });
  return res
    .status(200)
    .json({ success: true, message: "Job Bookmarked successfully !" });
});

export const getBookmark_jobs = asyncHandler(async (req, res) => {
  const userId = req.query.id;

  if (!userId)
    return res.status(400).json({ success: false, message: "Please Login" });

  const getBookMark = await bookMarkJob
    .find({ user: userId })
    .populate("job")
    .populate("user");
  return res.status(200).json({
    success: true,
    message: "Job Bookmarked successfully !",
    data: getBookMark,
  });
});

export const delete_bookmark_job = asyncHandler(async (req, res) => {
  const id = req.body;
  if (!id)
    return res.status(400).json({ success: false, message: "Please Login" });

  const deleteBookmark = await bookMarkJob.findByIdAndDelete(id);
  return res
    .status(200)
    .json({ success: true, message: "Job removed successfully !" });
});
