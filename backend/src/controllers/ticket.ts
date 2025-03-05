import { Request, Response } from "express";
import { validationResult } from "express-validator";
import Ticket from "../models/tickets";

export const createTicket = async (
  req: Request,
  res: Response
): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ message: errors.array() });
    return;
  }

  try {
    const { title, description, category, priority } = req.body;

    const ticket = new Ticket({
      title,
      description,
      category,
      priority,
      userId: req.userId,
    });

    await ticket.save();

    res.status(201).json({ message: "Ticket created successfully", ticket });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Something went wrong while creating the ticket" });
  }
};

export const getTickets = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    let tickets;

    if (req.userRole === "admin") {
      tickets = await Ticket.find();
    } else if (req.userId) {
      tickets = await Ticket.find({ userId: req.userId });
    } else {
      res
        .status(400)
        .json({ message: "User ID is required for non-admin users." });
      return;
    }

    if (!tickets) {
      res.status(404).json({ message: "No tickets found." });
      return;
    }

    res.status(200).json(tickets);
  } catch (error) {
    console.error("Error retrieving tickets:", error);
    res
      .status(500)
      .json({ message: "Failed to retrieve tickets. Please try again later." });
  }
};

export const getTicketById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const ticketId = req.params.id;

    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      res.status(404).json({ message: "Ticket not found." });
      return;
    }

    if (req.userRole !== "admin" && ticket.userId.toString() !== req.userId) {
      res
        .status(403)
        .json({
          message: "Forbidden: You are not authorized to access this ticket.",
        });
      return;
    }

    res.status(200).json(ticket);
  } catch (error) {
    console.error("Error retrieving ticket by ID:", error);
    res
      .status(500)
      .json({ message: "Failed to retrieve ticket. Please try again later." });
  }
};

export const updateTicketStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { status } = req.body;

  if (!["Open", "In Progress", "Closed"].includes(status)) {
    res
      .status(400)
      .json({
        message:
          "Invalid status. It must be 'Open', 'In Progress', or 'Closed'",
      });
    return;
  }

  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      res.status(404).json({ message: "Ticket not found" });
      return;
    }

    if (req.userRole !== "admin") {
      res
        .status(403)
        .json({ message: "Forbidden: Only admins can update the status" });
      return;
    }

    ticket.status = status;
    await ticket.save();

    res
      .status(200)
      .json({ message: "Ticket status updated successfully", ticket });
  } catch (error: unknown) {
    console.error(error);
    if (error instanceof Error) {
      if (error.name === "CastError") {
        res.status(400).json({ message: "Invalid ticket ID format" });
        return;
      }
      res
        .status(500)
        .json({ message: `Something went wrong: ${error.message}` });
    } else {
      res
        .status(500)
        .json({ message: "Something went wrong while updating the ticket" });
    }
  }
};
