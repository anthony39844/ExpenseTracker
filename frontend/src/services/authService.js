import axios from "axios";

const BASE_URL = "http://localhost:4000/api/v1/";

export const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const setLocalStorage = (
  response,
  setLoggedIn,
  setUsername,
  setError
) => {
  localStorage.setItem("token", response.data.token);
  localStorage.setItem("user", JSON.stringify(response.data.user));
  setLoggedIn(true);
  setUsername(response.data.user.username);
  setError(null);
};

export const clearLocalStorage = (setLoggedIn, setUsername, setError) => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  setLoggedIn(false);
  setUsername("");
  setError(null);
};

export const logIn = async (username, password, setError) => {
  try {
    const response = await axios.post(`${BASE_URL}login-user`, {
      username,
      password,
    });
    return response;
  } catch (err) {
    setError(err.response?.data?.message || "Login failed");
    throw err;
  }
};

export const createAccount = async (username, password, setError) => {
  try {
    const response = await axios.post(`${BASE_URL}create-user`, {
      username,
      password,
    });
    return response;
  } catch (err) {
    setError(err.response?.data?.message || "Account creation failed");
    throw err;
  }
};

export const deleteUser = async (userId, setError) => {
  try {
    await axios.delete(`${BASE_URL}delete-user/${userId}`, getAuthHeader());
  } catch (err) {
    setError(err.response?.data?.message || "Failed to delete user");
    throw err;
  }
};
