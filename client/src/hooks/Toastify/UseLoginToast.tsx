import { Bounce, toast } from "react-toastify";

export function useLoginToast() {
  const notifySuccess = (username: string) =>
    toast.success(`Bienvenue ${username} 🚀`, {
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

  const notifyError = (
    errorMessage = "Erreur lors de la connexion, mot de passe ou email incorrect",
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

  return { notifySuccess, notifyError };
}
