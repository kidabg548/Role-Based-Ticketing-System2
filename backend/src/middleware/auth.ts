import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/users";

declare global {
    namespace Express {
      interface Request {
        userId: string;
        userRole: string;
      }
    }
  }
  
  interface CustomJwtPayload extends JwtPayload {
    userId: string;
    role: string;
  }
  
  export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.cookies["auth_token"];
  
    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as CustomJwtPayload;
      req.userId = decoded.userId;
      req.userRole = decoded.role;
      next();
    } catch (error) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
};

export const authorizeRoles = (...roles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const user = await User.findById(req.userId);
        if (!user) {
          res.status(404).json({ message: "User not found" });
          return;
        }
  
        req.userRole = user.role;
  
        if (!roles.includes(user.role)) {
          res.status(403).json({ message: "Forbidden: Insufficient permissions" });
          return;
        }
  
        next(); // Ensures the function resolves with void
      } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
      }
    };
  };
  
