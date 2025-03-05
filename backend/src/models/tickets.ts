import mongoose, { Schema } from "mongoose";
import { ticketType } from "../../shared/types";

const ticketSchema: Schema<ticketType> = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["Open", "In Progress", "Closed"],
      default: "Open",
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High", "Critical"],
      default: "Medium",
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

const Ticket = mongoose.model<ticketType>("Ticket", ticketSchema);
export default Ticket;
