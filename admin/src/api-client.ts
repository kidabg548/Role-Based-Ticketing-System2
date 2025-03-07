import { LoginFormData } from "./pages/Login";
import { TicketType } from "./types/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

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

export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Token invalid");
  }

  return response.json();
};

export const updateTicketStatus = async (
  ticketId: string,
  statusData: any
): Promise<TicketType> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/tickets/${ticketId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(statusData),
    });
    if (!response.ok) {
      const responseBody = await response.json();
      throw new Error(responseBody.message || "Failed to update ticket status");
    }
    return await response.json();
  } catch (error: any) {
    throw new Error(error.message || "Failed to update ticket status");
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
    console.log(response);
    if (!response.ok) {
      const responseBody = await response.json();
      throw new Error(responseBody.message || "Failed to get tickets");
    }
    return await response.json();
  } catch (error: any) {
    throw new Error(error.message || "Failed to get tickets");
  }
};
