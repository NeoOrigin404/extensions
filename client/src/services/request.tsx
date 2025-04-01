import axios from "axios";
import { useLoginToast } from "../hooks/Toastify/UseLoginToast";

const URL = import.meta.env.VITE_API_URL;

const { notifySuccessLogin, notifyErrorLogin } = useLoginToast();

const loginMember = (
  loginData: LoginData,
  setRole: (role: string) => void,
  setPremium: (premium: boolean) => void,
) => {
  return axios
    .post(`${URL}/api/login`, loginData, {
      withCredentials: true,
    })
    .then(({ data }) => {
      setRole(data.role);
      setPremium(data.premium);
      notifySuccessLogin(data.username);
    })
    .catch((error) => {
      notifyErrorLogin();
      console.error(error);
    });
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

const getExtensions = () => {
  return axios
    .get(`${URL}/api/extensions`)
    .then((response) => console.info(response))
    .catch((error) => console.error(error));
};

export { loginMember, signupMember, getExtensions };
