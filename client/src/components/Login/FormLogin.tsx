import { Link, useNavigate } from "react-router-dom";
import { loginMember } from "../../services/request";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { useAuth } from "../../services/Context/AuthContext";
import "../../styles/Login/loginForm.scss";

export default function FormLogin() {
  const navigate = useNavigate();
  const { setRole, setPremium } = useAuth();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChangeCredentials = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };
  const sendCredentials = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginMember(credentials, setRole, setPremium, navigate);
  };

  return (
    <section className="login-form">
      <form onSubmit={sendCredentials}>
        <h2>Login</h2>
        <p>
          You can log in if you have an account, otherwise you can create one{" "}
          <Link to="/signup">here</Link>.
        </p>
        <div className="container-form">
          <label htmlFor="email">Email*</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Your email"
            onChange={handleChangeCredentials}
            value={credentials.email}
          />
          <label htmlFor="password">Password*</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Your password"
            onChange={handleChangeCredentials}
            value={credentials.password}
          />
          <input type="submit" value="Continue" />
        </div>
        <ToastContainer />
      </form>
    </section>
  );
}
