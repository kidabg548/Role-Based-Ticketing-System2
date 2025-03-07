import mongoose from "mongoose";

export interface userType {
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    phone?: string; 
    password: string;
    role: "user" | "admin";
    createdAt?: Date;
    updatedAt?: Date;
}


export interface ticketType {
    _id: string;
    title: string;
    description: string;
    status: "Open" | "In Progress" | "Closed";
    priority: "Low" | "Medium" | "High" | "Critical";
    category: string;
    userId: string | mongoose.Types.ObjectId; 
    createdAt?: Date; 
    updatedAt?: Date; 
  }