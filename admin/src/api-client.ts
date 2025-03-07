// import { ticketType } from "../../backend/shared/types";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

// export const updateTicketStatus = async (
//   ticketId: string,
//   statusData: UpdateTicketStatusData
// ): Promise<ticketType> => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/api/tickets/${ticketId}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       credentials: "include",
//       body: JSON.stringify(statusData),
//     });
//     if (!response.ok) {
//       const responseBody = await response.json();
//       throw new Error(responseBody.message || "Failed to update ticket status");
//     }
//     return await response.json();
//   } catch (error: any) {
//     throw new Error(error.message || "Failed to update ticket status");
//   }
// };

// export const getTickets = async (): Promise<ticketType[]> => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/tickets`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//       });
//       if (!response.ok) {
//         const responseBody = await response.json();
//         throw new Error(responseBody.message || "Failed to get tickets");
//       }
//       return await response.json();
//     } catch (error: any) {
//       throw new Error(error.message || "Failed to get tickets");
//     }
//   };