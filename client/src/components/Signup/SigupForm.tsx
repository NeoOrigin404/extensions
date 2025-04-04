import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupMember } from "../../services/request";
import { ToastContainer } from "react-toastify";
import { useSignupToast } from "../../hooks/Toastify/UseSignupToast";
import "../../styles/Signup/signupForm.scss";

export default function SignupForm() {
  const navigate = useNavigate();
  const { notifySuccessSignup, notifyErrorSignup } = useSignupToast();
  const [member, setMember] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  } as SignupData);

  const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMember({ ...member, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const success = await signupMember(member);

      if (success) {
        notifySuccessSignup();
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (error) {
      notifyErrorSignup();
      console.error(error);
    }
  };

  return (
    <section className="signup-form">
      <form onSubmit={handleSubmit}>
        <h3>All fields are mandatory</h3>
        <label htmlFor="first_name">First name*</label>
        <input
          type="text"
          id="first_name"
          name="first_name"
          value={member.first_name}
          onChange={handleChangeForm}
          placeholder="Your first name"
        />
        <label htmlFor="last_name">Last name*</label>
        <input
          type="text"
          id="last_name"
          name="last_name"
          value={member.last_name}
          onChange={handleChangeForm}
          placeholder="Your last name"
        />
        <label htmlFor="username">Username*</label>
        <input
          type="text"
          id="username"
          name="username"
          value={member.username}
          onChange={handleChangeForm}
          placeholder="Your username"
        />
        <label htmlFor="email">Email*</label>
        <input
          type="email"
          id="email"
          name="email"
          value={member.email}
          onChange={handleChangeForm}
          placeholder="Your email"
        />
        <label htmlFor="password">Password*</label>
        <input
          type="password"
          id="password"
          name="password"
          aria-invalid="false"
          aria-describedby="password-error-password"
          value={member.password}
          onChange={handleChangeForm}
          placeholder="Your password"
        />
        <p>
          8 characters minimum. Numbers, letters and special characters are
          accepted.
        </p>
        <label htmlFor="confirmPassword">Confirm your password*</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={member.confirmPassword}
          onChange={handleChangeForm}
          placeholder="Confirm your password"
        />
        <input type="submit" value="Create account" />
        <ToastContainer />
      </form>
    </section>
  );
}
