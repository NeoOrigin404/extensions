import { Bounce, toast } from "react-toastify";

export function useLoginToast() {
  const notifySuccessLogin = (username: string) =>
    toast.success(`Welcome ${username} 🚀`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });

  const notifyErrorLogin = (
    errorMessage = "Login error : incorrect email or password",
  ) =>
    toast.error(errorMessage, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });

  return { notifySuccessLogin, notifyErrorLogin };
}
