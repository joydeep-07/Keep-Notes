import { createSlice } from "@reduxjs/toolkit";

// Load saved theme from localStorage (fallback = light)
const savedTheme = localStorage.getItem("theme") || "light";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    mode: "theme" in localStorage ? savedTheme : "light",
  },
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";

      // Save to localStorage
      localStorage.setItem("theme", state.mode);
    },

    setTheme: (state, action) => {
      state.mode = action.payload;

      // Save to localStorage
      localStorage.setItem("theme", action.payload);
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
