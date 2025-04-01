import { Bounce, toast } from "react-toastify";

export function useSignupToast() {
  const notifySuccessSignup = () =>
    toast.success("Your profile has been created 🚀", {
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

  const notifyErrorSignup = (
    errorMessage = "An error occured during registration",
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

  return { notifySuccessSignup, notifyErrorSignup };
}
