import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../services/Context/AuthContext";
import { logoutMember } from "../services/request";
import Logo from "../assets/images/logo_dark.svg";
import "../styles/Navbar/navbar.scss";

export default function Navbar() {
  const location = useLocation();
  if (location.pathname === "/") {
    return null;
  }

  const navigate = useNavigate();
  const { role, setRole } = useAuth();

  const disconnect = () => {
    logoutMember(setRole, navigate);
  };

  return (
    <nav>
      <Link to={"/"}>
        <img src={Logo} alt="Logo Extensions" />
      </Link>
      {role === "anonymous" ? null : (
        <button type="button" onClick={disconnect}>
          Log out
        </button>
      )}
    </nav>
  );
}
