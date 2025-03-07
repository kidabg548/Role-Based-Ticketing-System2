import express, { Request, Response } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/users";

const router = express.Router();

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ message: errors.array() });
    return;
  }

  try {
    let existingUser = await User.findOne({
      $or: [{ email: req.body.email }, { username: req.body.username }],
    });
    if (existingUser) {
      res.status(400).json({ message: "Email or Username already exists" });
      return;
    }

    const user = new User({ ...req.body });
    await user.save();

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: "2d" }
    );

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 172800000,
      sameSite: 'none'
    });

    res
      .status(201)
      .json({ message: "User registered successfully", role: user.role });
    return;
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Something went wrong during registration" });
    return;
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ message: errors.array() });
    return;
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid Credentials" });
      return;
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: "2d" }
    );

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 172800000,
      sameSite: 'none'
    });

    res
      .status(200)
      .json({ userId: user._id, role: user.role, message: "Login successful" });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong during login" });
    return;
  }
};

export const validateToken = (req: Request, res: Response) => {
  res.status(200).json({ userId: req.userId });
};

export const logoutUser = (req: Request, res: Response) => {
  res.cookie("auth_token", "", {
    expires: new Date(0),
    secure: process.env.NODE_ENV === "production", 
    sameSite: 'none', 
  });
  res.status(200).send({ message: "Logout successful" });
};

export default router;
