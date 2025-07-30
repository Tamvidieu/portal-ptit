import axiosInstance from "./axiosInstance";

// login
export const login = async (credentials) => {
  try {
    const response = await axiosInstance.post("/auth/login", credentials);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// logout
export const logout = async () => {
  try {
    await axiosInstance.post("/auth/logout");
    localStorage.removeItem("token");
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
