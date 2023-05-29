import User from "../models/User.js";
import Joi from "joi";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";
import config from "../config/index.js";
import asyncHandler from "../service/asyncHandler.js";
import AppliedJob from "../models/ApplyJob.js";

const {compare,hash} = bcrypt;

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  name: Joi.string().required(),
  profilePic: Joi.string().required(),
  role:Joi.string().required()
});

export const register = asyncHandler(async (req, res) => {
  const { email, password, name, profilePic, role } = req.body;
  const { error } = registerSchema.validate({ email, password, name, profilePic, role });

  if (error)
    return res.status(401).json({
      success: false,
      message: error.details[0].message.replace(/['"]+/g, ""),
    });

  const ifExist = await User.findOne({ email });

  if (ifExist) {
    return res
      .status(406)
      .json({ success: false, message: "User Already Exist" });
  } else {
    const hashedPassword = await hash(password, 12);
    const createUser = await User.create({
      email,
      name,
      password: hashedPassword,
      profilePic,
      role
    });
    console.log("createUser",createUser)
    return res
      .status(201)
      .json({ success: true, message: "Account created successfully" });
  }
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { error } = schema.validate({ email, password });

  if (error)
    return res.status(401).json({
      success: false,
      message: error.details[0].message.replace(/['"]+/g, ""),
    });

  const checkUser = await User.findOne({ email }).select('+password');
  if (!checkUser)
    return res
      .status(401)
      .json({ success: false, message: "Account not Found" });

  const isMatch = await compare(password, checkUser.password);
  if (!isMatch)
    return res
      .status(401)
      .json({ success: false, message: "Incorrect Password" });

  const token = jwt.sign(
    { id: checkUser._id, email: checkUser.email,role:checkUser.role },
    config.JWT_SECRET,
    { expiresIn: "1d" }
  );
  const finalData = { token, user: checkUser };
  return res
    .status(200)
    .json({ success: true, message: "Login Successfull", finalData });
});

export const forgetPassword = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { error } = schema.validate({ email, password });

  if (error)
    return res.status(401).json({
      success: false,
      message: error.details[0].message.replace(/['"]+/g, ""),
    });

  const ifExist = await User.findOne({ email });
  if (!ifExist)
    return res.status(404).json({ success: false, message: "Email Not Found" });
  const hashedPassword = await hash(password, 12);
  const updatePassword = await User.findOneAndUpdate({
    email,
    password: hashedPassword,
  });
  return res
    .status(201)
    .json({ success: true, message: "Password Updated Successfully" });
});
