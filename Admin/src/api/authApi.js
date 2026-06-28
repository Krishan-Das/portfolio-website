import api from "./axios";

// -------- Login --------
export async function loginUser(userData) {
  const response = await api.post("/auth/login", userData);
  return response.data;
}

// -------- Get Me --------
export async function getMe() {
  const response = await api.get("/auth/me");
  return response.data;
}

// -------- Refresh Token --------
export async function refreshToken() {
  const response = await api.post('/auth/refresh');
  return response;
}

// -------- Logout --------
export async function logoutUser(token) {
  const response = await api.post(
    "http://localhost:3000/api/auth/logout",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`, // আপনার অ্যাক্সেস টোকেন
      },
    }
  );
  return response.data;
};

// -------- Logout All --------
export async function logoutAllUser() {
  const response = await api.post("/auth/logout-all");
  return response.data;
}