// frontend/src/types/types.ts

export interface UserType { 
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    phone?: string;
    password?: string; 
    role: "user" | "admin";
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export interface TicketType {
    _id: string;
    title: string;
    description: string;
    status: "Open" | "In Progress" | "Closed";
    priority: "Low" | "Medium" | "High" | "Critical";
    category: string;
    userId: string | {  
      _id: string;
      firstName: string;
      lastName: string;
      email: string;
    };
    createdAt?: Date;
    updatedAt?: Date;
  }

  export type TicketStatus = 'Open' | 'In Progress' | 'Closed';


