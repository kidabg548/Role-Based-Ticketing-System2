import express from "express";
import { check } from "express-validator";
import { loginUser, logoutUser, registerUser, validateToken } from "../controllers/auth";
import { verifyToken } from "../middleware/auth";

const router = express.Router();

router.post(
  "/signup",
  [
    check("firstName", "First Name is required").isString(),
    check("lastName", "Last Name is required").isString(),
    check("username", "Username is required").isString(),
    check("email", "Valid Email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({
      min: 6,
    }),
  ],
  registerUser
);

router.post(
  "/login",
  [
    check("email", "Valid Email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({
      min: 6,
    }),
  ],
  loginUser
);

router.get("/validate-token", verifyToken, validateToken);

router.post("/logout", logoutUser);


export default router;
