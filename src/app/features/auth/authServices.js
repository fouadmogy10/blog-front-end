import base_url from "../../../utils/baseURL";
const login = async (user) => {
  const response = await base_url.post(`/auth/login`, user);
  if (response?.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
    // store user's token in local storage
    localStorage.setItem("userToken", response?.data.token);
  }
  return response.data;
};
const register = async (userData) => {
  const response = await base_url.post(`/auth/register`, userData);
  return response.data;
};

const authService = {
  login,
  register,
};

export default authService;
