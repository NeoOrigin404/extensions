import axios from "axios";

const URL = import.meta.env.VITE_API_URL;

const loginMember = async (loginData: LoginData) => {
  try {
    const response = await axios.post(`${URL}/api/login`, loginData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export { loginMember };
