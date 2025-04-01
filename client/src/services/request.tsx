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

const signupMember = async (signupData: SignupData): Promise<boolean> => {
  try {
    const response = await axios.post(`${URL}/api/members`, signupData);
    return response.status === 201;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export { loginMember, signupMember };
