const BASE_URL = import.meta.env.VITE_API_URL

/* ================= AUTH ================= */
export const AUTH_ENDPOINTS = {
  REGISTER: `${BASE_URL}/api/users/register`,
  LOGIN: `${BASE_URL}/api/users/login`,
};

/* ================= NOTES ================= */
export const NOTES_ENDPOINTS = {
  CREATE: `${BASE_URL}/api/notes`,
  GET_ALL: `${BASE_URL}/api/notes`,
  GET_ONE: (id) => `${BASE_URL}/api/notes/${id}`,
  UPDATE: (id) => `${BASE_URL}/api/notes/${id}`,
  DELETE: (id) => `${BASE_URL}/api/notes/${id}`,
};
