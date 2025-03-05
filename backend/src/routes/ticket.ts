import express, { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";
import { authorizeRoles, verifyToken } from "../middleware/auth";
import { createTicket, getTicketById, getTickets, updateTicketStatus } from "../controllers/ticket";

const router = express.Router();

router.post(
  "/create",
  verifyToken,
  [
    check("title", "Title is required").notEmpty(),
    check("description", "Description is required").notEmpty(),
    check("category", "Category is required").notEmpty(),
    check("priority")
      .optional()
      .isIn(["Low", "Medium", "High", "Critical"])
      .withMessage("Priority must be one of: Low, Medium, High, Critical"),
  ],
  (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    next();
  },
  createTicket
);

router.get("/", verifyToken, getTickets);

router.get("/:id", verifyToken, getTicketById);

 router.put("/:id", verifyToken, authorizeRoles("admin"), updateTicketStatus);

// router.delete("/:id", verifyToken, authorizeRoles("admin"), deleteTicket);


export default router;