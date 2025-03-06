import { Request, Response } from "express";
import User from "../models/users";

export const getCurrentUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.userId).select("-password");
    
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
