import { LoginFormData } from "./pages/Login";
import { SignupFormData } from "./pages/signUp";
import { CreateTicketData } from "./pages/createTicket";
import { TicketType } from "./types/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const signup = async (formData: SignupFormData) => { 
  const response = await fetch(`${API_BASE_URL}/api/auth/signup`, { 
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const login = async (formData: LoginFormData) => { 
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, { 
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }

  return responseBody;
};

export const getCurrentUser = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
  
      if (!response.ok) {
        const responseBody = await response.json();
        throw new Error(responseBody.message || "Failed to fetch current user");
      }
  
      return await response.json();
    } catch (error: any) {
      throw new Error(error.message || "Failed to fetch current user");
    }
  };

export const validateToken = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
        credentials: "include",
    });
  
    if (!response.ok) {
      throw new Error("Token invalid");
    }
  
    return response.json();
  };

  export const logOut = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
      credentials: "include",
      method: "POST",
    });
  
    if (!response.ok) {
      throw new Error("Error during sign out");
    }
  };

  
  export const createTicket = async (
    ticketData: CreateTicketData
  ): Promise<TicketType> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/tickets/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(ticketData),
      });
  
      if (!response.ok) {
        const responseBody = await response.json();
        throw new Error(responseBody.message || "Failed to create ticket");
      }
  
      return await response.json();
    } catch (error: any) {
      throw new Error(error.message || "Failed to create ticket");
    }
  };
  
  export const getTickets = async (): Promise<TicketType[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/tickets`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        const responseBody = await response.json();
        throw new Error(responseBody.message || "Failed to get tickets");
      }
      return await response.json();
    } catch (error: any) {
      throw new Error(error.message || "Failed to get tickets");
    }
  };
  
  export const getTicketById = async (
    ticketId: string
  ): Promise<TicketType> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/tickets/${ticketId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",

      });
  
      if (!response.ok) {
        const responseBody = await response.json();
        throw new Error(responseBody.message || "Failed to get ticket by ID");
      }
      return await response.json();
    } catch (error: any) {
      throw new Error(error.message || "Failed to get ticket by ID");
    }
  };
  
//   export const updateTicketStatus = async (
//     ticketId: string,
//     statusData: UpdateTicketStatusData 
//   ): Promise<ticketType> => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/tickets/${ticketId}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//         body: JSON.stringify(statusData),
//       });
//       if (!response.ok) {
//         const responseBody = await response.json();
//         throw new Error(responseBody.message || "Failed to update ticket status");
//       }
//       return await response.json();
//     } catch (error: any) {
//       throw new Error(error.message || "Failed to update ticket status");
//     }
//   };