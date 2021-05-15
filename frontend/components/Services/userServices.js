import axios from "axios";
const BASE_URL = "http://192.168.56.1:5000";
const register = async (formData) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const res = await axios.post(`${BASE_URL}/api/register`, formData, config);
  return res;
};
const login = async (formData) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const res = await axios.post(`${BASE_URL}/api/login`, formData, config);
  return res;
};
const loadUser = async () => {
  const res = await axios.get(`${BASE_URL}/api/login`);
  return res;
};
export default { login, register, loadUser };
