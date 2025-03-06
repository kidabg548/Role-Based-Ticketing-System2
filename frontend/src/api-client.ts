import { SignupFormData } from "./pages/signUp";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const signup = async (formData: SignupFormData) => { 
  const response = await fetch(`${API_BASE_URL}/api/auth/signup`, { 
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

// export const login = async (formData: loginFormData) => { 
//   const response = await fetch(`${API_BASE_URL}/api/auth/login`, { 
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(formData),
//   });

//   const responseBody = await response.json();

//   if (!response.ok) {
//     throw new Error(responseBody.message);
//   }

//   return responseBody;
// };

export const validateToken = async (token: string) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }

  return responseBody;
};
