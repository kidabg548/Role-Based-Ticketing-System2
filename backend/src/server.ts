import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth"
import ticketRoutes from "./routes/ticket"



dotenv.config(); 

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)
    .then(() => {
        console.log("Connected to MongoDB successfully");
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });

app.use("/api/auth", authRoutes);
app.use("/api/tickets", ticketRoutes);



const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
